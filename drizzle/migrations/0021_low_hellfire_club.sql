ALTER TABLE `user_to_chat` DROP FOREIGN KEY `user_to_chat_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user_to_chat` ADD CONSTRAINT `user_to_chat_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;