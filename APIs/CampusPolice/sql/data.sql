DELETE FROM police;
INSERT INTO police(id, data) 
VALUES (
  '27f541bf-2a00-457c-be0d-9cfc18fd66fa',
  jsonb_build_object(
    'email','anna@books.com',
    'name','Anna Admin',
    'pwhash',crypt('annaadmin',gen_salt('bf')),
    'roles','["admin"]'
  )
);

INSERT INTO police(id, data) 
VALUES (
  'd06e4ace-0f6d-4489-9c41-4d4e9dd9a025',
  jsonb_build_object(
    'email','poppy@police.com',
    'name','Poppy Police',
    'pwhash',crypt('poppypolice',gen_salt('bf')),
    'roles','["admin"]'
  )
);