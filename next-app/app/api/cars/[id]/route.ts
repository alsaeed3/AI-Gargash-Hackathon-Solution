import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Car from "@/models/Car";

interface Params {
  params: {
    id: string;
  };
}

// GET /api/cars/:id - Get a specific car by ID
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    await dbConnect();

    const car = await Car.findById(id);

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: car });
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// PUT /api/cars/:id - Update a specific car
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();

    await dbConnect();

    const car = await Car.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: car });
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE /api/cars/:id - Delete a specific car
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    await dbConnect();

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
