-- getProjectsByUser
SELECT p.id, p.name
FROM project as p, project_owners_user AS o
WHERE p.id = o."projectId"
AND o."userGoogleId" = $1

-- projectsWithOwners
SELECT p.id AS projectId, p.name AS projectName, o."userGoogleId" AS ownerUserId
FROM project AS p, project_owners_user o
WHERE p.id = o."projectId";