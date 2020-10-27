INSERT INTO users(username, password)
VALUES 
($1, $2);
SELECT user_id, username FROM users
WHERE username = $1;