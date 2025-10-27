
POST /auth/register → create a new user
POST /auth/login → authenticate and return JWT
POST /memes → add a new meme (protected)
POST /memes/:id/like → like/unlike a meme (protected)
GET /users/:id/memes → view memes by a specific user

Define your models. Example:
User: id, username, password (hashed), role (admin/regular)
Meme: id, title, url, userId
UserLikesMeme: id, userId, memeId



Explain the authentication flow:
New users register with username/password.
Passwords are hashed before saving.
Login returns a JWT with the user’s ID and role encoded.
Protected routes require Authorization: Bearer <token>.



Describe roles:
Regular users: can create, update, delete their own memes; like/unlike memes.
Admin users: can delete any meme or user.
Optional: Add a simple diagram of relationships (User ↔ Meme, User ↔ Likes ↔ Meme).