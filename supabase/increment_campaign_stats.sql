-- Atomic function to increment campaign collected_amount and donor_count
-- Called from webhook when payment.received event fires
CREATE OR REPLACE FUNCTION increment_campaign_stats(
  p_campaign_id UUID,
  p_amount BIGINT
)
RETURNS VOID AS $$
BEGIN
  UPDATE campaigns
  SET
    collected_amount = COALESCE(collected_amount, 0) + p_amount,
    donor_count = COALESCE(donor_count, 0) + 1,
    updated_at = NOW()
  WHERE id = p_campaign_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
