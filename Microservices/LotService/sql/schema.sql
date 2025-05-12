\connect lot

DROP TABLE IF EXISTS lot CASCADE;

CREATE TABLE lot(
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb
);