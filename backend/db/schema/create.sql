DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS surveys CASCADE;
DROP TABLE IF EXISTS responses CASCADE;
DROP TABLE IF EXISTS survey_questions CASCADE;
DROP TABLE IF EXISTS questions CASCADE;


CREATE TABLE clients(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_num VARCHAR (10) NOT NULL,
  password VARCHAR(255) NOT NULL,
  treatment_start_date  DATE  NOT NULL,
  treatment_end_date  DATE  NOT NULL,
  signup_date DATE NOT NULL,
  next_survey_date DATE NOT NULL
);


CREATE TABLE surveys(
  id SERIAL PRIMARY KEY NOT NULL,
  survey_interval INTEGER NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE responses(
   id SERIAL PRIMARY KEY NOT NULL,
   survey_id INTEGER REFERENCES survey (id) ON DELETE CASCADE,
   question_id INTEGER REFERENCES question (id) ON DELETE CASCADE,
   client_id INTEGER REFERENCES client (id) ON DELETE CASCADE,
   client_response VARCHAR(255),
   Date VARCHAR (10) 
);

CREATE TABLE survey_questions(
  id SERIAL PRIMARY KEY NOT NULL,
  survey_id INTEGER REFRENCES survey(id) ON DELETE CASCADE,
  question_id INTEGER REFRENCES questions(id) ON DELETE CASCADE,
);


CREATE TABLE questions(
   id SERIAL PRIMARY KEY NOT NULL,
    question_text VARCHAR(255) NOT NULL,
     type  VARCHAR(25) NOT NULL,
     answer_id INTEGER REFRENCES possible_answers(id) ON DELETE CASCADE
);
