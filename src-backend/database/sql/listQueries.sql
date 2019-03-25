-- listsByUser
SELECT column_id AS id, column_name AS name, board_id AS board
FROM flatall
WHERE owner_id = $1;