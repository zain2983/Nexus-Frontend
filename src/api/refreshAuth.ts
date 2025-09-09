// refreshAuth.ts
// import { store } from "./store/store";
import store from "../store";
import { setAccessToken, logout } from "../store/userSlice";
import { BACKEND_URL } from '../config';

export async function refreshAuth() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/token/refresh/`, {
      method: "POST",
      credentials: "include", // 🔑 send HTTP-only cookie automatically
    });

    if (!res.ok) {
      throw new Error("Failed to refresh");
    }

    const data = await res.json(); // { access: "new_access_token" }

    // update Redux with new token
    store.dispatch(setAccessToken(data.access));
  } catch (err) {
    console.error("Token refresh failed", err);
    store.dispatch(logout());
  }
}
