SELECT DISTINCT
users.firstname,
users.lastname,
users.id,
users.displayname,
users.genre,
users.description,
users.profilepic,
mixes.artist,
mixes.title,
mixes.isMix,
mixes.id,
multitracks.artist,
multitracks.id,
multitracks.title,
multitracks.isMix
FROM users, mixes, multitracks
WHERE users.id = null OR  users.displayname = 'KarriGrl'
AND (mixes.userId = users.id OR multitracks.userId = users.id) GROUP BY mixes.id;