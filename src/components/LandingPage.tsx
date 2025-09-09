// pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import { getPolls, Poll } from "../api/polls";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { castVote } from "../api/vote";

const LandingPage: React.FC = () => {
  const [hoveredOption, setHoveredOption] = useState<{
    cardIndex: number;
    option: number;
  } | null>(null);

  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = Boolean(user && user.username);

  useEffect(() => {
    getPolls()
      .then((data) => setPolls(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const calculatePercentage = (votes: number, total: number) => {
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  };

  const handleShare = (
    question: string,
    type: "twitter" | "copy",
    pollId: number
  ) => {
    const pollUrl = `https://yourdomain.com/poll/${pollId}`;
    if (type === "twitter") {
      const tweetText = encodeURIComponent(
        `Would you rather: ${question}? Vote now at ${pollUrl}`
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${tweetText}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(pollUrl);
    }
  };

  const handleVote = async (pollId: number, choiceId: number) => {
    if (!user?.token) return;
    try {
      const result = await castVote(user.token, pollId, choiceId);
      if (result) {
        const updatedPolls = await getPolls();
        setPolls(updatedPolls);
      }
    } catch (err) {
      // errors are already handled in castVote with toast
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        {error}
      </div>
    );
  }



return (
  <div className="min-h-screen bg-gray-950 py-12">
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">Would You Rather</h1>
        <p className="mt-2 text-gray-400">Vote and see what others think</p>
      </div>

      {/* Polls Grid */}
      {polls.length === 0 ? (
        <div className="text-center text-gray-500">No polls available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {polls.map((poll, idx) => {
            const totalVotes = poll.choices.reduce(
              (sum, c) => sum + c.votes_count,
              0
            );

            return (
              <div
                key={poll.poll_id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between"
              >
                <h2 className="text-lg font-semibold text-white text-center mb-6">
                  {poll.question}
                </h2>

                <div className="space-y-4 flex-1">
                  {poll.choices.map((choice, choiceIdx) => {
                    const percentage = calculatePercentage(
                      choice.votes_count,
                      totalVotes
                    );
                    const isHovered =
                      hoveredOption?.cardIndex === idx &&
                      hoveredOption?.option === choiceIdx;

                    return (
                      <div
                        key={choice.choice_id}
                        className={`relative cursor-pointer transition-transform ${
                          isHovered ? "scale-[1.02]" : ""
                        }`}
                        onMouseEnter={() =>
                          setHoveredOption({ cardIndex: idx, option: choiceIdx })
                        }
                        onMouseLeave={() => setHoveredOption(null)}
                        onClick={() =>
                          isLoggedIn && handleVote(poll.poll_id, choice.choice_id)
                        }
                      >
                        <div className="relative w-full h-10 bg-gray-800 rounded-lg overflow-hidden">
                          {/* Progress Fill (right to left) */}
                          <div
                            className="absolute right-0 top-0 h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${percentage}%` }}
                          />

                          {/* Content */}
                          <div className="absolute inset-0 flex items-center justify-between px-3 text-sm font-medium text-white">
                            <span>{choice.text}</span>
                            <span>{percentage}%</span>
                          </div>
                        </div>

                        {/* Login Overlay */}
                        {!isLoggedIn && isHovered && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                            <Link
                              to="/auth/login"
                              className="px-3 py-1 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-500"
                            >
                              Login to vote
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  {totalVotes.toLocaleString()} votes
                </div>

                {/* Share */}
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      handleShare(poll.question, "twitter", poll.poll_id)
                    }
                    className="p-2 text-gray-400 hover:text-blue-500"
                  >
                    <FaXTwitter size={18} />
                  </button>
                  <button
                    onClick={() =>
                      handleShare(poll.question, "copy", poll.poll_id)
                    }
                    className="p-2 text-gray-400 hover:text-blue-500"
                  >
                    <FaLink size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);




};

export default LandingPage;
