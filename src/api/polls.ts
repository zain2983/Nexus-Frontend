// api/polls.ts
import { BACKEND_URL } from '../config';

export interface Choice {
  choice_id: number;
  text: string;
  votes_count: number;
}

export interface Poll {
  poll_id: number;
  question: string;
  choices: Choice[];
}

export async function getPolls(): Promise<Poll[]> {
  const res = await fetch(`${BACKEND_URL}/api/polls/`);
  if (!res.ok) {
    throw new Error("Failed to fetch polls");
  }
  return res.json();
}
