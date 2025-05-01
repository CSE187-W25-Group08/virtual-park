DROP TABLE IF EXISTS permit CASCADE;
CREATE TABLE permit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);