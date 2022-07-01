-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS ninja_turtles;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS tas;

CREATE TABLE ninja_turtles (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  mask_color VARCHAR,
  weapon VARCHAR
);

INSERT INTO ninja_turtles (name, mask_color, weapon) VALUES
('Leonardo', 'Blue', 'Katana'),
('Donatello', 'Purple', 'Bō'),
('Raphael', 'Red', 'Sai'),
('Michelangelo', 'Orange','Nunchaku');

CREATE TABLE pets (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  alive BOOLEAN NOT NULL
);

INSERT INTO pets (name, type, alive) VALUES
('Rufus', 'dog', false),
('Roscoe', 'dog', false),
('Jessica', 'dog', false),
('Pythagoras', 'cat', true);

CREATE TABLE tas (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  pronoun VARCHAR NOT NULL,
  super_power VARCHAR,
  description VARCHAR
);

INSERT INTO tas (name, pronoun, super_power, description) VALUES
('Triana', 'She/her', 'Voice of Compelling', 'Triana has the power to compel students to action, usually for the student''s own benefit -- for example compelling them to complete their resumes so they can succeed on the job market.'),
('Tanner', 'He/him', 'Voice of Soothing', 'Tanner can calm a distraught student with his soothing voice.'),
('Madden', 'They/he', 'Bugray Vision', 'Madden can spot a bug instantly in a vast block of a student''s code using their enhanced Bugray Vision.');
