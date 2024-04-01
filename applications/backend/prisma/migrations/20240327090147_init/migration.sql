-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('PERSONAL');

-- CreateEnum
CREATE TYPE "NoticeType" AS ENUM ('SECURITY');

-- CreateEnum
CREATE TYPE "UsersToProjectsStatus" AS ENUM ('JOINED', 'INVITED', 'REQUESTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEFAULT', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProfileGender" AS ENUM ('UNKNOWN', 'MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'DEFAULT',
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id","username","email")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "apple" TEXT,
    "google" TEXT,
    "yandex" TEXT,
    "github" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "type" "SubscriptionType" NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AuthHistory" (
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "strategy" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AuthHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "gender" "ProfileGender" NOT NULL DEFAULT 'UNKNOWN',
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "telegram" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "profileId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "ExtraContact" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "ExtraContact_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Skills" (
    "frontend" INTEGER NOT NULL DEFAULT 0,
    "backend" INTEGER NOT NULL DEFAULT 0,
    "machineLearning" INTEGER NOT NULL DEFAULT 0,
    "devOps" INTEGER NOT NULL DEFAULT 0,
    "projectManagement" INTEGER NOT NULL DEFAULT 0,
    "qa" INTEGER NOT NULL DEFAULT 0,
    "profileId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "ExtraSkill" (
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "profileId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ExtraSkill_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" TEXT NOT NULL,
    "type" "NoticeType" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToProjects" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" "UsersToProjectsStatus" NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UsersToProjects_pkey" PRIMARY KEY ("id","userId","projectId")
);

-- CreateTable
CREATE TABLE "RatingToProjects" (
    "profileId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RatingToProjects_pkey" PRIMARY KEY ("profileId","projectId")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "budget" JSONB,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_username_email_idx" ON "User"("id", "username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_apple_key" ON "OAuth"("apple");

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_google_key" ON "OAuth"("google");

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_yandex_key" ON "OAuth"("yandex");

-- CreateIndex
CREATE UNIQUE INDEX "OAuth_github_key" ON "OAuth"("github");

-- CreateIndex
CREATE INDEX "OAuth_apple_google_yandex_github_idx" ON "OAuth"("apple", "google", "yandex", "github");

-- CreateIndex
CREATE INDEX "Subscription_userId_expiresIn_idx" ON "Subscription"("userId", "expiresIn");

-- CreateIndex
CREATE INDEX "AuthHistory_id_userId_idx" ON "AuthHistory"("id", "userId");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Contacts_profileId_idx" ON "Contacts"("profileId");

-- CreateIndex
CREATE INDEX "ExtraContact_profileId_idx" ON "ExtraContact"("profileId");

-- CreateIndex
CREATE INDEX "Skills_profileId_idx" ON "Skills"("profileId");

-- CreateIndex
CREATE INDEX "ExtraSkill_profileId_idx" ON "ExtraSkill"("profileId");

-- CreateIndex
CREATE INDEX "Notice_id_userId_idx" ON "Notice"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersToProjects_id_key" ON "UsersToProjects"("id");

-- CreateIndex
CREATE INDEX "UsersToProjects_id_userId_projectId_isOwner_permissions_idx" ON "UsersToProjects"("id", "userId", "projectId", "isOwner", "permissions");

-- CreateIndex
CREATE INDEX "RatingToProjects_profileId_projectId_idx" ON "RatingToProjects"("profileId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_id_title_slug_idx" ON "Project"("id", "title", "slug");

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthHistory" ADD CONSTRAINT "AuthHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraContact" ADD CONSTRAINT "ExtraContact_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraSkill" ADD CONSTRAINT "ExtraSkill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToProjects" ADD CONSTRAINT "UsersToProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToProjects" ADD CONSTRAINT "UsersToProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingToProjects" ADD CONSTRAINT "RatingToProjects_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingToProjects" ADD CONSTRAINT "RatingToProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
