ALTER TABLE `user` RENAME COLUMN `email_verified` TO `is_verified`;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `name` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `password` varchar(50) NOT NULL;