DROP TABLE IF EXISTS ticket CASCADE;
CREATE TABLE ticket(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);
