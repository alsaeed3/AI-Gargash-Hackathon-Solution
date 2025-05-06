import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Car from '@/models/Car';
import { ICar } from '@/models/Car';

// GET /api/cars - Get all cars with optional filtering
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');
  const bodyType = searchParams.get('bodyType');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const fuelType = searchParams.get('fuelType');

  const query: any = {};

  // Apply filters if provided
  if (brand) query.brand = { $regex: brand, $options: 'i' };
  if (bodyType) query.bodyType = bodyType;
  if (fuelType) query.fuelType = fuelType;
  if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
  
  try {
    await dbConnect();
    const cars = await Car.find(query).sort({ popularity: -1 });
    return NextResponse.json({ success: true, data: cars });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/cars - Create a new car
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await dbConnect();
    const car = await Car.create(body);
    
    return NextResponse.json(
      { success: true, data: car },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}