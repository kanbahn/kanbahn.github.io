-- Truncate tables
TRUNCATE project CASCADE;
TRUNCATE "user" CASCADE;

--Projects
INSERT INTO project ("id", "name")
VALUES 
(1, 'Project 1');

INSERT INTO project ("id", "name")
VALUES 
(2, 'Secret Project 1');

--Users
INSERT INTO "user"
VALUES ('116973995376159661774');

INSERT INTO "user"
VALUES ('123');

INSERT INTO "user"
VALUES ('321');

--Project owners
INSERT INTO project_owners_user
VALUES (1, '116973995376159661774');

INSERT INTO project_owners_user
VALUES (2, '123');

INSERT INTO project_owners_user
VALUES (2, '321');

--Boards
INSERT INTO board ("id", "name", "projectId")
VALUES
(1, 'Board 1', 1);

INSERT INTO board ("id", "name", "projectId")
VALUES
(2, 'Secret Board 1', 2);

--Lanes
INSERT INTO lane ("id", "name", "boardId")
VALUES
(1, 'Feature 1', 1);

--Lists
INSERT INTO list ("id", "name", "laneId", "lane")
VALUES
(1, 'Todo', 1, 'Feature 1'),
(2, 'In progress', 1, 'Feature 1'),
(3, 'Done', 1, 'Feature 1')

--Tasks

INSERT INTO task ("id", "title", "index", "listId")
VALUES
(1, 'Tests', 1, 1),
(1, 'APIs', 2, 1),
(2, 'UI code', 1, 2),
(3, 'SQL code', 1, 3)