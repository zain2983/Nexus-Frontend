// api/vote.ts
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

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

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    let errorMessage = "Failed to cast vote. Please try again.";

    if (data?.detail) {
      errorMessage = data.detail;
    } else if (data?.non_field_errors?.length) {
      errorMessage = data.non_field_errors[0];
    } else {
      const firstVal = Object.values(data)[0];
      if (Array.isArray(firstVal) && firstVal.length > 0) {
        errorMessage = firstVal[0];
      }
    }

    toast.error(errorMessage);
    return null; // stop execution but prevent crash
  }
  
  toast.success("Vote cast successfully!");
  return data; // return updated vote object from backend
}
