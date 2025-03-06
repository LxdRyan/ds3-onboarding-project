-- create table
CREATE TABLE IF NOT EXISTS TASKS (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    contents TEXT,
    due_date DATE,
    status VARCHAR,
    priority VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS USERS (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    profile_picture TEXT
);

INSERT INTO TASKS (id, name, contents, due_date, status, priority) VALUES (0,'Testing', 'testing task', '2025-05-03', 'unfinished', 'Low');
INSERT INTO USERS (id, name, username, password, profile_picture) VALUES (0, 'test', 'test', 'test', 'https://images.pexels.com/photos/25724405/pexels-photo-25724405/free-photo-of-illuminated-soccer-pitch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');