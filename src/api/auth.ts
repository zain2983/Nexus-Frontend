// API utility for authentication

export async function signup(username: string, password: string) {
  const res = await fetch('http://localhost:8000/api/users/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Signup failed');
  }
  return res.json();
}