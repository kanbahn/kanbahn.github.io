-- lanesByUser
SELECT lane_id AS id, lane_name AS name, board_id AS board
FROM flatall
WHERE owner_id = $1;