/*
  Warnings:

  - Added the required column `updatedAt` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "feedbackId" TEXT NOT NULL PRIMARY KEY,
    "websiteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Feedback_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("websiteId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("email", "feedbackId", "message", "name", "websiteId") SELECT "email", "feedbackId", "message", "name", "websiteId" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE UNIQUE INDEX "Feedback_feedbackId_key" ON "Feedback"("feedbackId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
