// api/vote.ts
import { BACKEND_URL } from "../config";

interface VotePayload {
  poll: number;
  choice: number;
}

export async function castVote(
  token: string,
  pollId: number,
  choiceId: number
): Promise<any> {
  const payload: VotePayload = { poll: pollId, choice: choiceId };

  const res = await fetch(`${BACKEND_URL}/api/votes/vote/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔑 send JWT
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData?.detail || "Failed to cast vote. Please try again."
    );
  }

  return res.json(); // return updated vote object from backend
}
