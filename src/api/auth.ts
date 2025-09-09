// API utility for authentication

import { BACKEND_URL } from '../config';

const role = "BASIC";
export async function signup(username: string, name: string, email: string, password: string, password2: string) {
  const res = await fetch(`${BACKEND_URL}/api/users/signup/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, name, email, password, password2 , role}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  return data;
}

export async function login(loginValue: string, password: string) {
  const res = await fetch(`${BACKEND_URL}/api/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",  // 🔑
    body: JSON.stringify({
      username: loginValue,
      login: loginValue,
      password,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}
