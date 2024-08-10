/*
  Warnings:

  - You are about to drop the column `userId` on the `Website` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "websiteId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "sitekey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Website_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("createdAt", "description", "name", "sitekey", "updatedAt", "url", "websiteId") SELECT "createdAt", "description", "name", "sitekey", "updatedAt", "url", "websiteId" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE UNIQUE INDEX "Website_websiteId_key" ON "Website"("websiteId");
CREATE UNIQUE INDEX "Website_url_key" ON "Website"("url");
CREATE UNIQUE INDEX "Website_sitekey_key" ON "Website"("sitekey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
