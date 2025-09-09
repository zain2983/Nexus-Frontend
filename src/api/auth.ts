// API utility for authentication

import { BACKEND_URL } from '../config';

const role = "BASIC";

export async function signup(username: string, name: string, email: string, password: string, password2: string) {
  const res = await fetch(`${BACKEND_URL}/api/users/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, email, password, password2, role }),
  });

  const data = await res.json();

  if (!res.ok) {
    const errors = data as Record<string, string[]>;
    let firstError = "Signup failed. Please try again.";

    if (errors.password?.length) {
      firstError = errors.password[0];
    } else {
      const firstVal = Object.values(errors)[0];
      if (Array.isArray(firstVal) && firstVal.length > 0) {
        firstError = firstVal[0];
      }
    }

    // ✅ Map raw backend messages → user-friendly
    if (firstError.toLowerCase().includes("email")) {
      firstError = "Email already occupied";
    } else if (firstError.toLowerCase().includes("username")) {
      firstError = "Username already taken";
    } else if (firstError.toLowerCase().includes("password")) {
      firstError = "Password is too weak, please choose a stronger one";
    }

    throw new Error(firstError);
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
