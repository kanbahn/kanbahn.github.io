-- getBoardsByUser
SELECT b.id, b.name, b."projectId"
FROM project_owners_user AS o, project AS p, board AS b 
WHERE o."projectId" = p.id 
AND o."projectId" = b."projectId" 
AND o."userGoogleId" = $1

-- getLanes
SELECT l.*
FROM lane AS l, board AS b, project AS p, project_owners_user AS o
WHERE l."boardId" = b."id"
AND b."projectId" = o."projectId"
AND o."userGoogleId" = '116973995376159661774';