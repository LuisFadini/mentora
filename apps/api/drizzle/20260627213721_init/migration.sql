CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`password` text NOT NULL,
	`avatar_url` text,
	CONSTRAINT "name_min_length" CHECK(length("name") >= 4),
	CONSTRAINT "password_min_length" CHECK(length("password") >= 8)
);
