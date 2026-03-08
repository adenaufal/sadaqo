-- Fix donors table: tambah kolom yang kurang + unique constraint untuk upsert

ALTER TABLE public.donors
  ADD COLUMN IF NOT EXISTS mayar_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Deduplicate: hapus baris duplikat, simpan yang total_donated paling besar
DELETE FROM public.donors
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id, email) id
  FROM public.donors
  ORDER BY user_id, email, total_donated DESC, created_at DESC
);

ALTER TABLE public.donors
  ADD CONSTRAINT donors_user_id_email_key UNIQUE (user_id, email);

-- Fix trigger: pakai ON CONFLICT (user_id, email) bukan (id)
CREATE OR REPLACE FUNCTION public.update_campaign_on_donation()
RETURNS TRIGGER AS $$
DECLARE
  campaign_owner_id UUID;
BEGIN
  IF NEW.payment_status = 'paid' AND (OLD IS NULL OR OLD.payment_status != 'paid') THEN
    UPDATE public.campaigns
    SET
      collected_amount = collected_amount + NEW.amount,
      donor_count = donor_count + 1,
      updated_at = NOW()
    WHERE id = NEW.campaign_id;

    SELECT user_id INTO campaign_owner_id
    FROM public.campaigns WHERE id = NEW.campaign_id;

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
      ON CONFLICT (user_id, email) DO UPDATE SET
        name = EXCLUDED.name,
        phone = COALESCE(EXCLUDED.phone, donors.phone),
        total_donated = donors.total_donated + EXCLUDED.total_donated,
        donation_count = donors.donation_count + 1,
        last_donation_at = NOW(),
        updated_at = NOW();
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
