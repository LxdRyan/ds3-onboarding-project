CREATE TABLE IF NOT EXISTS USERS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(160),
    profile_picture TEXT
);

CREATE TABLE IF NOT EXISTS TASKS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    contents TEXT,
    creator INT REFERENCES USERS(id),
    due_date DATE,
    status VARCHAR,
    priority VARCHAR(20)
);

INSERT INTO TASKS (id, name, contents, due_date, status, priority) VALUES (0,'Testing', 'testing task', '2025-05-03', 'unfinished', 'Low');
INSERT INTO USERS (id, name, username, password, profile_picture) VALUES (0, 'test', 'test', 'test', 'https://images.pexels.com/photos/25724405/pexels-photo-25724405/free-photo-of-illuminated-soccer-pitch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');