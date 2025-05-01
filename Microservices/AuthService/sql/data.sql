DELETE FROM member;
INSERT INTO member(id, data) 
VALUES (
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'email','anna@books.com',
    'name','Anna Admin',
    'pwhash',crypt('annaadmin',gen_salt('bf')),
    'roles','["admin"]'
  )
);