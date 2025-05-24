------------------------------------
----- Do not modify this file ------
------------------------------------
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

INSERT INTO member(id, data) 
VALUES (
  '03845709-4d40-45fe-9e51-11789f6f119b',
  jsonb_build_object(
    'email','nick@books.com',
    'name','nick enforcement',
    'pwhash',crypt('nickenforcement',gen_salt('bf')),
    'roles','["enforcement"]'
  )
);
------------------------------------
----- Do not modify this file ------
------------------------------------
