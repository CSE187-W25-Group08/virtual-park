\connect ticket

DROP TABLE IF EXISTS ticket CASCADE;

CREATE TABLE ticket(
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  driver UUID NOT NULL,
  data jsonb
);