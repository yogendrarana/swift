CREATE TABLE `chat` (
	`id` int AUTO_INCREMENT NOT NULL,
	`is_group` boolean NOT NULL,
	`name` varchar(50) NOT NULL,
	`admin_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chat_id` int NOT NULL,
	`sender_id` int NOT NULL,
	`receiver_id` int NOT NULL,
	`text` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`is_verified` boolean,
	`password` varchar(255) NOT NULL,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`image` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_to_chat` (
	`user_id` int NOT NULL,
	`chat_id` int NOT NULL,
	CONSTRAINT `user_to_chat_chat_id_user_id` PRIMARY KEY(`chat_id`,`user_id`)
);
--> statement-breakpoint
ALTER TABLE `user_to_chat` ADD CONSTRAINT `user_to_chat_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_to_chat` ADD CONSTRAINT `user_to_chat_chat_id_chat_id_fk` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`id`) ON DELETE no action ON UPDATE no action;