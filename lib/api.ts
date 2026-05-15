export interface LoginResponse {
  // Define expected response fields here. 
  // Examples: token, user, message, etc.
  token?: string;
  message?: string;
  [key: string]: any;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sit-api.seekersplus.ai/api';
  
  const response = await fetch(`${baseUrl}/employer/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }

  return data;
};
