DELETE FROM registrar;
INSERT INTO registrar(id, data) 
VALUES (
  '173eaabe-705e-4888-bd0e-4af283f95ff7',
  jsonb_build_object(
    'email','anna@books.com',
    'name','Anna Admin',
    'pwhash',crypt('annaadmin',gen_salt('bf')),
    'roles','["admin"]'
  )
);

INSERT INTO registrar(id, data) 
VALUES (
  '3c690ee0-2e00-4653-a2c7-945a11c75c77',
  jsonb_build_object(
    'email','rina@registrar.com',
    'name','Rina Registrar',
    'pwhash',crypt('rinaregistrar',gen_salt('bf')),
    'roles','["registrar"]'
  )
);