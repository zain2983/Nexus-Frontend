// API utility for authentication

// const BASE_URL = 'http://localhost:8000'
const BASE_URL = 'https://nexus-backend-bye3.onrender.com';

export async function signup(username: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/users/signup/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}