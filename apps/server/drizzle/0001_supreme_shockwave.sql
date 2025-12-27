ALTER TABLE "quiz_module" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "quiz_question" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "quiz" ALTER COLUMN "created_at" DROP DEFAULT;