-- CreateTable
CREATE TABLE "Airport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Airline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AirlineToAirport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AirlineToAirport_AB_unique" ON "_AirlineToAirport"("A", "B");

-- CreateIndex
CREATE INDEX "_AirlineToAirport_B_index" ON "_AirlineToAirport"("B");

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airline" ADD CONSTRAINT "Airline_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AirlineToAirport" ADD CONSTRAINT "_AirlineToAirport_A_fkey" FOREIGN KEY ("A") REFERENCES "Airline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AirlineToAirport" ADD CONSTRAINT "_AirlineToAirport_B_fkey" FOREIGN KEY ("B") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
