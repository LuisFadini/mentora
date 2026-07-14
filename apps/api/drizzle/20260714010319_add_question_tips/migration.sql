CREATE TABLE `question_tips` (
	`id` text PRIMARY KEY,
	`question_id` text NOT NULL,
	`order` integer NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_question_tips_question_id_questions_id_fk` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tips_question_order_unique` ON `question_tips` (`question_id`,`order`);