-- CreateTable
CREATE TABLE "tasks_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,

    CONSTRAINT "tasks_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_table_title_key" ON "tasks_table"("title");
