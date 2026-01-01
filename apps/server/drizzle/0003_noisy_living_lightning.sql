ALTER TABLE "quiz_lobby" DROP CONSTRAINT "quiz_lobby_code_unique";--> statement-breakpoint
ALTER TABLE "quiz_lobby" ADD COLUMN "name" text NOT NULL;