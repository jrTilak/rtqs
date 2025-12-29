CREATE TYPE "public"."quiz_lobby_enum" AS ENUM('IN_LOBBY', 'ENDED');--> statement-breakpoint
CREATE TABLE "quiz_lobby" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	"quiz_id" uuid NOT NULL,
	"participants_count" integer DEFAULT 0 NOT NULL,
	"wait_in_lobby_until" timestamp NOT NULL,
	"status" "quiz_lobby_enum" DEFAULT 'IN_LOBBY' NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "quiz_lobby_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "quiz_lobby" ADD CONSTRAINT "quiz_lobby_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;