-- Do not delete this table;
DROP TABLE IF EXISTS member CASCADE;
CREATE TABLE member(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);