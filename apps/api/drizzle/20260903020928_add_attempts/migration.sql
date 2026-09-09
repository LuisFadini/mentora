CREATE TABLE `question_attempts` (
	`id` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`question_id` text NOT NULL,
	`answer_id` text NOT NULL,
	`tips_used` integer NOT NULL,
	`created_at` integer NOT NULL,
	CONSTRAINT `fk_question_attempts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_question_attempts_question_id_questions_id_fk` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_question_attempts_answer_id_answers_id_fk` FOREIGN KEY (`answer_id`) REFERENCES `answers`(`id`) ON DELETE CASCADE,
	CONSTRAINT "question_attempts_tips_used_check" CHECK("tips_used" >= 0)
);
