ALTER TABLE `chat` MODIFY COLUMN `is_group` boolean;--> statement-breakpoint
ALTER TABLE `chat` MODIFY COLUMN `name` varchar(50);--> statement-breakpoint
ALTER TABLE `chat` ADD CONSTRAINT `chat_admin_id_user_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;