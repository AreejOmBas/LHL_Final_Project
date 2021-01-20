DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS surveys CASCADE;
DROP TABLE IF EXISTS responses CASCADE;
DROP TABLE IF EXISTS sent_surveys CASCADE;
DROP TABLE IF EXISTS questions CASCADE;


CREATE TABLE clients(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_num VARCHAR (15) NOT NULL,
  password VARCHAR(255) NOT NULL,
  treatment_start_date  DATE  NOT NULL,
  treatment_end_date  DATE  NOT NULL,
  signup_date DATE NOT NULL,
  next_survey_date DATE 
);


CREATE TABLE surveys(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE responses(
  id SERIAL PRIMARY KEY NOT NULL,
  sent_survey_id INTEGER REFERENCES sent_surveys(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  client_response VARCHAR(255),
  date DATE
);

CREATE TABLE sent_surveys(
  id SERIAL PRIMARY KEY NOT NULL,
  survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  date DATE,
  interval INTEGER
);


CREATE TABLE questions(
  id SERIAL PRIMARY KEY NOT NULL,
  survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
  question_text VARCHAR(255) NOT NULL,
  type  VARCHAR(25) NOT NULL
    
);
