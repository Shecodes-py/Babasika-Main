ALTER TABLE "users" RENAME COLUMN "full_name" TO "legacy_full_name";

ALTER TABLE "users"
ADD COLUMN "first_name" VARCHAR(120),
ADD COLUMN "last_name" VARCHAR(120),
ADD COLUMN "email" VARCHAR(254);

UPDATE "users"
SET
    "first_name" = split_part(btrim("legacy_full_name"), ' ', 1),
    "last_name" = CASE
        WHEN strpos(btrim("legacy_full_name"), ' ') > 0 THEN NULLIF(
            btrim(
                substring(
                    btrim("legacy_full_name")
                    FROM strpos(btrim("legacy_full_name"), ' ') + 1
                )
            ),
            ''
        )
        ELSE NULL
    END;

ALTER TABLE "users"
ALTER COLUMN "first_name" SET NOT NULL,
DROP COLUMN "legacy_full_name";

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
