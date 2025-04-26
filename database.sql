CREATE TABLE users (
   name_login VARCHAR(255) PRIMARY KEY,
   campus     VARCHAR(255),
   email      VARCHAR(255),
   fullName   VARCHAR(255),
   in_status  VARCHAR(255),
   phone      VARCHAR(255)
);

create TABLE skills(
	id SERIAL PRIMARY KEY,
	skills []VARCHAR(255),
	name_login  VARCHAR(255) PRIMARY KEY,
	FOREIGN KEY (login) REFERENCES users (name_login)
	)

--  \c db_school21   : подключение к db 
-- SELECT current_database(); :узнать где мы
--psql \! chcp 1251 русский язык
--select  * from skills

-- COPY users
-- FROM 'E:\xlam\users.csv'
-- WITH (
--     FORMAT csv,
--     HEADER true, 
--     DELIMITER ';'
-- );
