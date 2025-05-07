\connect permit

DROP TABLE IF EXISTS permitType CASCADE;
CREATE TABLE permitType (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data jsonb
    );

DROP TABLE IF EXISTS driverPermit CASCADE;
CREATE TABLE driverPermit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driverID UUID,
    permitType UUID,
    data jsonb,
    Foreign Key (permitType) REFERENCES permitType (id)
);

