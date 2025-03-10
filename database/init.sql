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
    creator_id INT,
    due_date DATE,
    status VARCHAR,
    priority VARCHAR(20)
);

INSERT INTO USERS (id, name, username, password, profile_picture) VALUES (0, 'test', 'test', '3916d59473ce3643a7fe59778235e03aee58ce57eab4080b75d57ac83dd6020aad4619e431a648b77e9d01431d6816004c5d2c81427e7e1860786bc55ef11bf2d5c9b592cea926c07970a12d6d00aeab', 'https://images.pexels.com/photos/25724405/pexels-photo-25724405/free-photo-of-illuminated-soccer-pitch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
INSERT INTO TASKS (id, name, contents, creator_id, due_date, status, priority) VALUES (1,'Testing', 'testing task', 0, '2025-05-03', 'Pending', 'Low');
INSERT INTO TASKS (id, name, contents, creator_id, due_date, status, priority) VALUES (2,'Testing_high', 'testing task', 0, '2025-05-03', 'Completed', 'High');
INSERT INTO TASKS (id, name, contents, creator_id, due_date, status, priority) VALUES (3,'Testing_medium', 'testing task', 0, '2025-05-03', '', 'Medium');