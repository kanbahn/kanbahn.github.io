-- flatAll
SELECT 
	p.id AS project_id,
	o."userGoogleId" AS owner_id,
	p.name AS project_name,
	b.name AS board_name,
	l.name AS lane_name,
	c.name AS column_name,
	t.title AS task_title,
	t.index AS task_index
FROM 
	project AS p 
	LEFT OUTER JOIN project_owners_user AS o
		ON p.id = o."projectId"
	LEFT OUTER JOIN board AS b
		ON p.id = b."projectId"
	LEFT OUTER JOIN lane AS l
		ON b.id = l."boardId"
	LEFT OUTER JOIN list AS c
		ON l.id = c."laneIdId"
	LEFT OUTER JOIN task AS t
		ON c.id = t."listId";