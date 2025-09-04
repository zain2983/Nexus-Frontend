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
      await castVote(user.token, pollId, choiceId);
      setPolls((prevPolls) =>
        prevPolls.map((p) =>
          p.poll_id === pollId
            ? {
              ...p,
              choices: p.choices.map((c) =>
                c.choice_id === choiceId
                  ? { ...c, votes_count: c.votes_count + 1 }
                  : c
              ),
            }
            : p
        )
      );
    } catch (err: any) {
      alert(err.message);
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
    <div className="relative overflow-hidden py-12 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Would You Rather</span>
          </h1>
        </div>

        {/* Polls Grid */}
        {polls.length === 0 ? (
          <div className="text-center text-gray-400">
            No polls available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {polls.map((poll, idx) => {
              const totalVotes = poll.choices.reduce(
                (sum, c) => sum + c.votes_count,
                0
              );

              return (
                <div
                  key={poll.poll_id}
                  className="relative bg-gray-800 rounded-xl shadow-xl p-8 border border-purple-900 transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    {poll.question}
                  </h2>

                  <div className="space-y-6">
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
                          className="relative cursor-pointer" // ⬅️ add cursor-pointer
                          onMouseEnter={() =>
                            setHoveredOption({ cardIndex: idx, option: choiceIdx })
                          }
                          onMouseLeave={() => setHoveredOption(null)}
                          onClick={() => isLoggedIn && handleVote(poll.poll_id, choice.choice_id)} // ⬅️ new
                        >

                          <div
                            className={`relative w-full h-12 bg-purple-500/20 rounded-full overflow-hidden transition-all duration-300 ${isHovered && !isLoggedIn ? "blur-[5px]" : ""
                              }`}
                          >
                            {/* Progress Fill */}
                            <div
                              className="absolute right-0 top-0 h-full bg-purple-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />

                            {/* Content Layer */}
                            <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
                              <span className="text-white font-medium">
                                {choice.text}
                              </span>
                              <span className="text-white font-medium">
                                {percentage}%
                              </span>
                            </div>
                          </div>

                          {/* Login Overlay */}
                          {!isLoggedIn && isHovered && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 rounded-full">
                              <Link
                                to="/auth/login"
                                className="px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
                              >
                                Login/Signup to Vote
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-sm text-gray-400 text-center">
                    {totalVotes.toLocaleString()} total votes
                  </div>

                  {/* Share Buttons */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={() =>
                        handleShare(poll.question, "twitter", poll.poll_id)
                      }
                      className="p-2 text-gray-300 hover:text-purple-400 transition-colors"
                      title="Share on X (Twitter)"
                    >
                      <FaXTwitter size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleShare(poll.question, "copy", poll.poll_id)
                      }
                      className="p-2 text-gray-300 hover:text-purple-400 transition-colors"
                      title="Copy Link"
                    >
                      <FaLink size={20} />
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
