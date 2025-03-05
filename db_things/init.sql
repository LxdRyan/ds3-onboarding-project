-- create table
CREATE TABLE IF NOT EXISTS TASKS (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    contents TEXT,
    date DATE,
    status VARCHAR,
    priority VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS USERS (
    user_id INT PRIMARY KEY,
    username VARCHAR(10),
    password VARCHAR(10)
);

INSERT INTO TASKS (id, name, contents, date, status, priority) VALUES (0,'Testing', 'testing task', '2025-05-03', 'unfinished', 'Low');
INSERT INTO USERS (user_id, username, password) VALUES (0, 'test', 'test');