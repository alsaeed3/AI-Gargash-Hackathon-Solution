import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import Appointment from '@/models/Appointment';
import { getCurrentUser } from '@/lib/auth/jwt';

// GET /api/appointments - Get all appointments for the current user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Get current authenticated user
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Build query based on params
    const query: any = { userId: currentUser.userId };
    if (status) query.status = status;
    
    const appointments = await Appointment.find(query)
      .populate('carId')
      .sort({ appointmentDate: 1 });
    
    return NextResponse.json({ success: true, data: appointments });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/appointments - Create a new appointment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get current authenticated user if available
    const currentUser = getCurrentUser();
    
    // If logged in, associate appointment with user
    if (currentUser) {
      body.userId = currentUser.userId;
    }
    
    await dbConnect();
    const appointment = await Appointment.create(body);
    
    return NextResponse.json(
      { success: true, data: appointment },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}