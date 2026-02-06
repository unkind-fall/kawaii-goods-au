-- Migration number: 0001 	 2026-02-06T02:27:43.606Z

CREATE TABLE `characters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`hex_color` text,
	`created_at` integer NOT NULL
);

CREATE UNIQUE INDEX `characters_slug_unique` ON `characters` (`slug`);

CREATE TABLE `newsletter_signups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL
);

CREATE UNIQUE INDEX `newsletter_signups_email_unique` ON `newsletter_signups` (`email`);
