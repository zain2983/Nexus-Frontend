// api/polls.ts
import { BACKEND_URL } from "../config";

export interface Choice {
  choice_id: number;
  text: string;
  votes_count: number;
  percentage?: number; // add percentage here
}

export interface Poll {
  poll_id: number;
  question: string;
  choices: Choice[];
  total_votes: number; // also store total for convenience
}

export async function getPolls(): Promise<Poll[]> {
  const res = await fetch(`${BACKEND_URL}/api/polls/`);
  if (!res.ok) {
    throw new Error("Failed to fetch polls");
  }

  const data: Poll[] = await res.json();

  return data.map((poll) => {
    const totalVotes = poll.choices.reduce(
      (sum, c) => sum + c.votes_count,
      0
    );

    const choicesWithPercentages = poll.choices.map((choice) => ({
      ...choice,
      percentage: totalVotes === 0 ? 0 : Math.round((choice.votes_count / totalVotes) * 100),
    }));

    return {
      ...poll,
      total_votes: totalVotes,
      choices: choicesWithPercentages,
    };
  });
}
