import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/db/mongoose";
import Car from "@/models/Car";

export const metadata: Metadata = {
  title: "Our Luxury Cars | Gargash Motors",
  description: "Browse our exclusive collection of premium luxury vehicles at Gargash Motors",
};

async function getCars() {
  await dbConnect();
  const cars = await Car.find({}).sort({ popularityScore: -1 }).lean();
  return JSON.parse(JSON.stringify(cars)); // Convert Mongoose documents to plain objects
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Luxury Vehicle Collection</h1>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Explore our curated selection of premium vehicles, featuring the finest in automotive engineering, comfort, and design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cars.map((car) => (
          <Card key={car._id} className="overflow-hidden flex flex-col">
            <div className="relative h-56 w-full">
              <Image 
                src={car.imageUrl} 
                alt={`${car.brand} ${car.model}`} 
                fill 
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle>{car.brand} {car.model}</CardTitle>
              <CardDescription>{car.year} · {car.bodyType} · {car.fuelType}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex-1">
              <p className="text-sm text-neutral-600 line-clamp-2">
                {car.description}
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-lg font-bold">AED {Math.round(car.price * 3.67).toLocaleString()}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {car.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className="text-xs bg-neutral-100 rounded-full px-2 py-1">
                    {feature}
                  </span>
                ))}
                {car.features.length > 3 && (
                  <span className="text-xs bg-neutral-100 rounded-full px-2 py-1">
                    +{car.features.length - 3} more
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Link href={`/cars/${car._id}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
              <Link href={`/test-drive?car=${car._id}`}>
                <Button size="sm">Schedule Test Drive</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}