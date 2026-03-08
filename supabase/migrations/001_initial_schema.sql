-- ============================================
-- ZakatFlow Database Schema
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  organization_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. CAMPAIGNS TABLE
-- ============================================
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  campaign_type TEXT NOT NULL CHECK (campaign_type IN (
    'zakat_fitrah', 'zakat_mal', 'infaq', 'sedekah', 'wakaf', 'qurban', 'umum'
  )),
  target_amount BIGINT NOT NULL,
  collected_amount BIGINT DEFAULT 0,
  donor_count INTEGER DEFAULT 0,
  cover_image_url TEXT,
  beneficiary_story TEXT,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  mayar_product_id TEXT,
  mayar_payment_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active campaigns"
  ON public.campaigns FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage own campaigns"
  ON public.campaigns FOR ALL
  USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.campaigns;

-- ============================================
-- 3. DONATIONS TABLE
-- ============================================
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  amount BIGINT NOT NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN (
    'zakat_fitrah', 'zakat_mal', 'zakat_profesi', 'infaq', 'sedekah', 'wakaf', 'umum'
  )),
  is_anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'paid', 'failed', 'expired'
  )),
  mayar_transaction_id TEXT,
  mayar_payment_url TEXT,
  mayar_invoice_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create donations"
  ON public.donations FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Anyone can view paid donations"
  ON public.donations FOR SELECT
  USING (payment_status = 'paid');

CREATE POLICY "Admins can view all campaign donations"
  ON public.donations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = donations.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can update donations"
  ON public.donations FOR UPDATE
  USING (TRUE);

ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;

-- ============================================
-- 4. DONORS TABLE (muzakki database)
-- ============================================
CREATE TABLE public.donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  total_donated BIGINT DEFAULT 0,
  donation_count INTEGER DEFAULT 0,
  last_donation_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage own donors"
  ON public.donors FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- 5. TRIGGERS: Auto-update campaign totals
-- ============================================
CREATE OR REPLACE FUNCTION public.update_campaign_on_donation()
RETURNS TRIGGER AS $$
DECLARE
  campaign_owner_id UUID;
BEGIN
  -- Only process when donation becomes paid
  IF NEW.payment_status = 'paid' AND (OLD IS NULL OR OLD.payment_status != 'paid') THEN
    -- Update campaign totals
    UPDATE public.campaigns
    SET
      collected_amount = collected_amount + NEW.amount,
      donor_count = donor_count + 1,
      updated_at = NOW()
    WHERE id = NEW.campaign_id;

    -- Get campaign owner
    SELECT user_id INTO campaign_owner_id
    FROM public.campaigns WHERE id = NEW.campaign_id;

    -- Upsert donor record
    IF campaign_owner_id IS NOT NULL AND NOT NEW.is_anonymous THEN
      INSERT INTO public.donors (user_id, name, email, phone, total_donated, donation_count, last_donation_at)
      VALUES (
        campaign_owner_id,
        NEW.donor_name,
        NEW.donor_email,
        NEW.donor_phone,
        NEW.amount,
        1,
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        total_donated = donors.total_donated + NEW.amount,
        donation_count = donors.donation_count + 1,
        last_donation_at = NOW();
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_donation_paid
  AFTER INSERT OR UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.update_campaign_on_donation();

-- ============================================
-- 6. INDEXES
-- ============================================
CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_slug ON public.campaigns(slug);
CREATE INDEX idx_campaigns_active ON public.campaigns(is_active);
CREATE INDEX idx_donations_campaign_id ON public.donations(campaign_id);
CREATE INDEX idx_donations_status ON public.donations(payment_status);
CREATE INDEX idx_donors_user_id ON public.donors(user_id);
