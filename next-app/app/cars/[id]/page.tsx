import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dbConnect from "@/lib/db/mongoose";
import Car from "@/models/Car";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

// Generate metadata for the page dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const car = await Car.findById(params.id).lean();
  
  if (!car) {
    return {
      title: "Car Not Found | Gargash Motors",
      description: "The requested vehicle could not be found",
    };
  }
  
  return {
    title: `${car.year} ${car.brand} ${car.model} | Gargash Motors`,
    description: car.description.substring(0, 160),
  };
}

// Get car data by ID
async function getCar(id: string) {
  await dbConnect();
  try {
    const car = await Car.findById(id).lean();
    if (!car) return null;
    return JSON.parse(JSON.stringify(car));
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
}

export default async function CarDetailPage({ params }: Props) {
  const car = await getCar(params.id);
  
  if (!car) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/cars" className="flex items-center text-sm font-medium mb-6 hover:underline">
          ← Back to cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery Section */}
          <div>
            <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
              <Image 
                src={car.imageUrl} 
                alt={`${car.brand} ${car.model}`} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {car.additionalImages?.map((img, i) => (
                <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                  <Image 
                    src={img} 
                    alt={`${car.brand} ${car.model} - view ${i+1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Car Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{car.year} {car.brand} {car.model}</h1>
              <p className="text-xl font-semibold mt-2">AED {Math.round(car.price * 3.67).toLocaleString()}</p>
            </div>

            <p className="text-neutral-700">{car.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Body Type</p>
                <p className="font-medium capitalize">{car.bodyType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Fuel Type</p>
                <p className="font-medium capitalize">{car.fuelType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Transmission</p>
                <p className="font-medium capitalize">{car.transmission}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Color</p>
                <p className="font-medium">{car.color}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Engine</p>
                <p className="font-medium">{car.engineCapacity}L</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-neutral-500">Horsepower</p>
                <p className="font-medium">{car.horsepower} hp</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, i) => (
                  <span key={i} className="text-sm bg-neutral-100 rounded-full px-3 py-1">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href={`/test-drive?car=${car._id}`} className="flex-1">
                <Button size="lg" className="w-full">Schedule Test Drive</Button>
              </Link>
              <Link href="/ai-assistant" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">Ask AI Assistant</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}