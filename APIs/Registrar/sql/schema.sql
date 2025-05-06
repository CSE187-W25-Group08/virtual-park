DROP TABLE IF EXISTS registrar CASCADE;
CREATE TABLE registrar(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);