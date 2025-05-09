import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Car from "@/models/Car";
import { getCurrentUser } from "@/lib/auth/jwt";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, userId } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Get current authenticated user if available
    const currentUser = await getCurrentUser();
    let userPreferences = null;

    if (currentUser || userId) {
      // Fetch user preferences to personalize responses
      const user = await User.findById(currentUser?.userId || userId);
      if (user) {
        userPreferences = user.preferences;
      }
    }

    // Process the user message and generate a response
    // This is a simple placeholder implementation
    // In a real application, you would integrate with an AI service like OpenAI

    const response = await processAiMessage(message, userPreferences);

    return NextResponse.json({ success: true, data: response });
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// Simulated AI message processing
// In a production app, you would replace this with a call to an actual AI service
interface UserPreferences {
  bodyTypes?: string[];
  brands?: string[];
  fuelTypes?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  features?: string[];
}

interface CarRecommendation {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  bodyType: string;
  fuelType: string;
  imageUrl: string;
  features?: string[];
  popularityScore?: number;
}

interface AiResponse {
  text: string;
  recommendations?: Array<CarRecommendation>;
  action?: string;
}

async function processAiMessage(
  message: string,
  userPreferences: UserPreferences | null
): Promise<AiResponse> {
  // Simulate AI response generation
  // Basic keyword matching for demo purposes
  const lowercaseMsg = message.toLowerCase();

  // Handle car recommendation requests
  if (
    lowercaseMsg.includes("recommend") ||
    lowercaseMsg.includes("suggest") ||
    lowercaseMsg.includes("looking for")
  ) {
    // Extract potential car preferences from the message
    interface CarQuery {
      bodyType?: string | { $in: string[] };
      brand?: { $in: string[] };
      fuelType?: string | { $in: string[] };
    }

    const query: CarQuery = {};

    if (lowercaseMsg.includes("suv")) query.bodyType = "suv";
    else if (lowercaseMsg.includes("sedan")) query.bodyType = "sedan";
    else if (lowercaseMsg.includes("coupe")) query.bodyType = "coupe";

    if (lowercaseMsg.includes("luxury")) query.bodyType = "luxury";

    if (lowercaseMsg.includes("electric")) query.fuelType = "electric";
    else if (lowercaseMsg.includes("hybrid")) query.fuelType = "hybrid";

    // Use user preferences if available
    if (userPreferences) {
      const bodyTypesLength = userPreferences.bodyTypes?.length ?? 0;
      if (bodyTypesLength > 0 && !query.bodyType && userPreferences.bodyTypes) {
        query.bodyType = { $in: userPreferences.bodyTypes };
      }

      const brandsLength = userPreferences.brands?.length ?? 0;
      if (brandsLength > 0 && userPreferences.brands) {
        query.brand = { $in: userPreferences.brands };
      }

      const fuelTypesLength = userPreferences.fuelTypes?.length ?? 0;
      if (fuelTypesLength > 0 && !query.fuelType && userPreferences.fuelTypes) {
        query.fuelType = { $in: userPreferences.fuelTypes };
      }
    }

    // Get car recommendations
    const cars = await Car.find(query).limit(3);

    if (cars.length > 0) {
      return {
        text: "Based on your preferences, here are some cars I'd recommend:",
        recommendations: cars,
      };
    } else {
      return {
        text: "I couldn't find cars matching your exact criteria. Here are some popular options:",
        recommendations: await Car.find()
          .sort({ popularityScore: -1 })
          .limit(3),
      };
    }
  }

  // Handle test drive scheduling queries
  else if (
    lowercaseMsg.includes("test drive") ||
    lowercaseMsg.includes("appointment")
  ) {
    return {
      text: "I'd be happy to help you schedule a test drive. Please fill out the appointment form with your preferred date and time, and we'll confirm your appointment shortly.",
      action: "SCHEDULE_TEST_DRIVE",
    };
  }

  // Handle general information queries
  else if (
    lowercaseMsg.includes("hours") ||
    lowercaseMsg.includes("location") ||
    lowercaseMsg.includes("address")
  ) {
    return {
      text: "Gargash Motors is open Monday through Friday from 9am to 7pm, and Saturday from 10am to 5pm. We're located at Sheikh Zayed Road, Dubai, UAE. Would you like me to provide directions?",
      action: "SHOW_CONTACT_INFO",
    };
  }

  // Handle price queries
  else if (
    lowercaseMsg.includes("price") ||
    lowercaseMsg.includes("cost") ||
    lowercaseMsg.includes("financing")
  ) {
    return {
      text: "Our vehicles range in price depending on the model, features, and whether they're new or pre-owned. We offer competitive financing options tailored to your needs. Would you like to speak with one of our financial advisors?",
      action: "SHOW_FINANCING_OPTIONS",
    };
  }

  // Default response
  else {
    return {
      text: "I'm here to help you find the perfect car, schedule a test drive, or answer any questions about our services. How can I assist you today?",
    };
  }
}
