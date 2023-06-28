CREATE TABLE `products` (
	`prd_hash` varchar(256) PRIMARY KEY NOT NULL,
	`prd_link` varchar(256) NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` varchar(256) NOT NULL,
	`price` decimal);
--> statement-breakpoint
CREATE TABLE `users` (
	`wallet` varchar(256) NOT NULL,
	`prd_hash` varchar(256) NOT NULL);
