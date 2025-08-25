// API utility for authentication

import { BACKEND_URL } from '../config';


export async function signup(username: string, email: string, password: string) {
  const res = await fetch(`${BACKEND_URL}/api/users/signup/`, {
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
  const res = await fetch(`${BACKEND_URL}/api/users/login/`, {
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