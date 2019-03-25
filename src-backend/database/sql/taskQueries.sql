-- tasksByUser
SELECT task_id AS id, task_title AS title, task_index AS index, column_id AS list
FROM flatall
WHERE owner_id = $1;