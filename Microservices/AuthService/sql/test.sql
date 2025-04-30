------------------------------------
----- Do not modify this file ------
------------------------------------
DELETE FROM member;
INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','anna@books.com',
    'name','Anna Admin',
    'pwhash',crypt('annaadmin',gen_salt('bf')),
    'roles','["admin"]'
  )
);
------------------------------------
----- Do not modify this file ------
------------------------------------
