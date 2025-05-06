import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-should-be-in-env';

// Define the token payload interface
export interface TokenPayload {
  userId: string;
  email: string;
  name?: string;
}

// Generate a JWT token
export const signJwt = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

// Verify and decode a JWT token
export const verifyJwt = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

// Set JWT in a cookie
export const setAuthCookie = async (token: string): Promise<void> => {
  cookies().set({
    name: 'authToken',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
  });
};

// Get JWT from a cookie
export const getAuthCookie = async (): Promise<string | undefined> => {
  return cookies().get('authToken')?.value;
};

// Remove JWT cookie
export const removeAuthCookie = async (): Promise<void> => {
  cookies().delete('authToken');
};

// Get current user from JWT token
export const getCurrentUser = async (): Promise<TokenPayload | null> => {
  const token = await getAuthCookie();
  if (!token) return null;
  
  return verifyJwt(token);
};