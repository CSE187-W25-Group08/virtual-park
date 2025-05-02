DROP TABLE IF EXISTS vehicle CASCADE;

CREATE TABLE vehicle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver UUID,
  data jsonb
);
