-- listsByUser
SELECT column_id AS id, column_name AS name, lane_id AS lane
FROM flatall
WHERE owner_id = $1;