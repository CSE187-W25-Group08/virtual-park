\connect account

DELETE FROM member;
INSERT INTO member(id, data) 
VALUES (
  '03845709-4d40-45fe-9e51-11789f6f209a',
  jsonb_build_object(
    'email','amza@books.com',
    'name','Amza Admin',
    'pwhash',crypt('amzaadmin',gen_salt('bf')),
    'roles','["admin"]'
  )
);

INSERT INTO member(id, data) 
VALUES (
  'bea45ed8-aa83-4c49-a201-4625baa0e91a',
  jsonb_build_object(
    'email','matt@books.com',
    'name','Mathew Member',
    'pwhash',crypt('matthewmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2025-04-16T04:59:03+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','alex@example.com',
    'name','Alex Driver',
    'pwhash',crypt('alexmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-08-12T14:30:45+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','jamie@road.com',
    'name','Jamie Rider',
    'pwhash',crypt('jamiemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-02-28T09:15:22+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','taylor@mail.com',
    'name','Taylor Cruise',
    'pwhash',crypt('taylormember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-11-05T18:45:10+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','casey@wheels.org',
    'name','Casey Shift',
    'pwhash',crypt('caseymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-01-15T12:00:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','riley@transit.co',
    'name','Riley Route',
    'pwhash',crypt('rileymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-05-20T07:45:30+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','morgan@lane.com',
    'name','Morgan Lane',
    'pwhash',crypt('morganmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-07-22T08:12:17+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','jordan@pace.net',
    'name','Jordan Pace',
    'pwhash',crypt('jordanmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-11-03T16:45:09+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','avery@cruise.io',
    'name','Avery Cruise',
    'pwhash',crypt('averymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-03-14T12:30:55+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','reese@mover.org',
    'name','Reese Mover',
    'pwhash',crypt('reesemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-09-18T19:20:31+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','blake@haul.co',
    'name','Blake Haul',
    'pwhash',crypt('blakemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-05-01T07:55:44+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','casey@cargo.me',
    'name','Casey Cargo',
    'pwhash',crypt('caseymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-01-09T23:10:12+00:00',
    'suspended', false  
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','taylor@freight.app',
    'name','Taylor Freight',
    'pwhash',crypt('taylormember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-04-30T14:22:38+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','jamie@transporter.tech',
    'name','Jamie Transporter',
    'pwhash',crypt('jamiemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-10-11T05:45:29+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','alex@wheels.cloud',
    'name','Alex Wheels',
    'pwhash',crypt('alexmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-04-02T20:15:03+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','riley@logistics.ai',
    'name','Riley Logistics',
    'pwhash',crypt('rileymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-01-07T11:33:47+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','eslug22@ucsc.edu',
    'name','Emily Slug',
    'pwhash',crypt('emilymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-09-25T08:15:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','lredwood23@ucsc.edu',
    'name','Liam Redwood',
    'pwhash',crypt('liammember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-02-14T14:30:45+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','sbay24@ucsc.edu',
    'name','Sofia Bay',
    'pwhash',crypt('sofiamember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-01-07T09:45:22+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','ebanana@ucsc.edu',
    'name','Ethan Banana',
    'pwhash',crypt('ethanmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-11-30T16:20:15+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','omonterey@ucsc.edu',
    'name','Olivia Monterey',
    'pwhash',crypt('oliviamember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-07-19T12:10:30+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','ncowell45@ucsc.edu',
    'name','Noah Cowell',
    'pwhash',crypt('noahmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-03-03T18:55:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','aporter@ucsc.edu',
    'name','Ava Porter',
    'pwhash',crypt('avamember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-04-18T07:30:45+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','lucsc92@ucsc.edu',
    'name','Lucas UCSC',
    'pwhash',crypt('lucasmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-10-31T23:15:10+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','mstevenson@ucsc.edu',
    'name','Mia Stevenson',
    'pwhash',crypt('miamember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-05-22T13:40:25+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','jcrown@ucsc.edu',
    'name','Jackson Crown',
    'pwhash',crypt('jacksonmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-12-01T10:05:50+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','cmchenry@ucsc.edu',
    'name','Chloe McHenry',
    'pwhash',crypt('chloemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-09-15T17:25:35+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','aarboretum@ucsc.edu',
    'name','Aiden Arboretum',
    'pwhash',crypt('aidenmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-02-14T11:10:15+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','hoc187@ucsc.edu',
    'name','Harper OC',
    'pwhash',crypt('harpermember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-06-09T14:50:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','lucsantacruz@ucsc.edu',
    'name','Logan UCSantaCruz',
    'pwhash',crypt('loganmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-04-01T08:00:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','esciencehill@ucsc.edu',
    'name','Ellie ScienceHill',
    'pwhash',crypt('elliemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-07-19T16:45:30+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','ceastremote@ucsc.edu',
    'name','Carter EastRemote',
    'pwhash',crypt('cartermember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-03-22T09:15:20+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','zmchenry@ucsc.edu',
    'name','Zoey McHenry',
    'pwhash',crypt('zoeymember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-12-25T00:00:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','sucscbus@ucsc.edu',
    'name','Samuel UCSCBus',
    'pwhash',crypt('samuelmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2024-08-12T19:30:45+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','grcarson@ucsc.edu',
    'name','Grace RachelCarson',
    'pwhash',crypt('gracemember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2022-10-31T20:15:30+00:00',
    'suspended', false
  )
);

INSERT INTO member(data) 
VALUES (
  jsonb_build_object(
    'email','oucsc115@ucsc.edu',
    'name','Owen UCSC115',
    'pwhash',crypt('owenmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-06-15T12:00:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(id, data) 
VALUES (
  '03845709-4d40-45fe-9e51-11789f6f119b',
  jsonb_build_object(
    'email','nick@books.com',
    'name','nick enforcement',
    'pwhash',crypt('nickenforcement',gen_salt('bf')),
    'roles','["enforcement"]',
    'suspended', false,
    'officer_details', jsonb_build_object(
      'enforcementId', '12345-SCPEO',
      'hired', '2020-06-15T12:00:00+00:00'
    )
  )
);

INSERT INTO member(id, data) 
VALUES (
  'ced418e8-af5c-4a95-9896-374082a80117',
  jsonb_build_object(
    'email','jtest1@yopmail.com',
    'name','Jen Test1',
    'pwhash',crypt('jtest1',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-06-15T12:00:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(id, data) 
VALUES (
  'd8ae74ff-f0c8-4837-8690-d3e9471fe283',
  jsonb_build_object(
    'email','jtest2@yopmail.com',
    'name','Jen Test2',
    'pwhash',crypt('jtest2',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-06-15T12:00:00+00:00',
    'suspended', false
  )
);

INSERT INTO member(id, data) 
VALUES (
  'e38d15bc-5f7d-4f66-9e17-b4827bd8371c',
  jsonb_build_object(
    'email','jenchenshb@gmail.com',
    'name','Jennifer Chen',
    'pwhash',crypt('jtest3',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-06-15T12:00:00+00:00',
    'suspended', false
  )
);


INSERT INTO member(id, data) 
VALUES (
  'c852b1b6-dc7c-48b2-84f1-fe8aa828a928',
  jsonb_build_object(
    'email','jin@books.com',
    'name','Whimsical Driving fairy that is entranced by a Toyotta SUV',
    'pwhash',crypt('jinmember',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-06-15T12:00:00+00:00',
    'suspended', false
  )
);


INSERT INTO member(id, data) 
VALUES (
  'c852b1b6-dc7c-48b2-84f1-fe8aa828a929',
  jsonb_build_object(
    'email','jiqle@ucsc.edu',
    'name','Whimsical Driving fairy that is entranced by a Toyotta SUV',
    'pwhash',crypt('jiqle',gen_salt('bf')),
    'roles','["driver"]',
    'joindate', '2023-06-15T12:00:00+00:00',
    'suspended', false
  )
);
