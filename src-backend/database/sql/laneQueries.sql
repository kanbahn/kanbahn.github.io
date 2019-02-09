-- lanesByUser
SELECT lane_id, lane_name, board_id FROM flatall
WHERE owner_id = $1;