import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Car, CalendarCheck, MessageSquareText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Luxury Vehicles, Exceptional Experience
                </h1>
                <p className="max-w-[600px] text-neutral-500 md:text-xl">
                  Discover our premium selection of luxury vehicles at Gargash Motors. Unparalleled quality, performance, and elegance.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/cars">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950">
                    Browse Cars
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/ai-assistant">
                  <Button variant="outline" className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950">
                    AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury car showcase"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Premium Experience</h2>
              <p className="max-w-[700px] text-neutral-500 md:text-xl">
                We offer more than just cars. Experience luxury, service, and innovation.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Premium Selection</h3>
              <p className="text-sm text-neutral-500">
                Curated collection of luxury vehicles from top global brands.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Test Drive Experience</h3>
              <p className="text-sm text-neutral-500">
                Schedule personalized test drives at your convenience.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <MessageSquareText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">AI Assistant</h3>
              <p className="text-sm text-neutral-500">
                Intelligent assistant to help you find your perfect vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="w-full py-12 bg-neutral-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Vehicles</h2>
              <p className="max-w-[700px] text-neutral-500 md:text-xl">
                Explore our selection of premium vehicles.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop" 
                    alt="BMW 7 Series" 
                    fill 
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>BMW 7 Series</CardTitle>
                <CardDescription>Luxury sedan with advanced technology and comfort</CardDescription>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Price: AED {(85000 * 3.67).toLocaleString()}</span>
                  <span>2023</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">Test Drive</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1619362280286-f1f8fd5032ed?q=80&w=1000&auto=format&fit=crop" 
                    alt="Mercedes-Benz S-Class" 
                    fill 
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>Mercedes-Benz S-Class</CardTitle>
                <CardDescription>The pinnacle of luxury automotive engineering</CardDescription>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Price: AED {(95000 * 3.67).toLocaleString()}</span>
                  <span>2023</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">Test Drive</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop" 
                    alt="Porsche Cayenne" 
                    fill 
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>Porsche Cayenne</CardTitle>
                <CardDescription>Sports car performance with SUV versatility</CardDescription>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Price: AED {(75000 * 3.67).toLocaleString()}</span>
                  <span>2023</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm">Test Drive</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/cars">
              <Button variant="outline">
                View All Vehicles
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900 text-neutral-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Experience Luxury?</h2>
              <p className="max-w-[700px] text-neutral-200 md:text-xl">
                Schedule a test drive today or chat with our AI assistant to find your perfect match.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/test-drive">
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-neutral-900 shadow transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950">
                  Schedule Test Drive
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button variant="outline" className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-800 hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950">
                  Chat with AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
