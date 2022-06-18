-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS ninja_turtles;

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