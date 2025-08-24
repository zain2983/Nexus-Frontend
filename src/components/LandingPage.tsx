import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaXTwitter, FaLink } from 'react-icons/fa6';

const SAMPLE_QUESTIONS = [
  {
    question: 'Be invisible or be able to fly?',
    optionOne: 'Be invisible',
    optionTwo: 'Be able to fly',
    votesOne: 423,
    votesTwo: 577,
  },
  {
    question: 'Live in the ocean or live in space?',
    optionOne: 'Ocean life',
    optionTwo: 'Space life',
    votesOne: 312,
    votesTwo: 688,
  },
  {
    question: 'Be a famous actor or a successful CEO?',
    optionOne: 'Famous actor',
    optionTwo: 'Successful CEO',
    votesOne: 445,
    votesTwo: 555,
  },
  {
    question: 'Time travel to the past or future?',
    optionOne: 'Past',
    optionTwo: 'Future',
    votesOne: 378,
    votesTwo: 622,
  },
];

const LandingPage: React.FC = () => {
  const [hoveredOption, setHoveredOption] = useState<{
    cardIndex: number;
    option: number;
  } | null>(null);

  const calculatePercentage = (votes: number, total: number) => {
    return Math.round((votes / total) * 100);
  };

  const handleShare = (question: string, type: 'twitter' | 'copy') => {
    if (type === 'twitter') {
      const tweetText = encodeURIComponent(
        `Would you rather: ${question}? Vote now at yourdomain.com/poll/123`
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${tweetText}`,
        '_blank'
      );
    } else {
      navigator.clipboard.writeText(`https://yourdomain.com/poll/123`);
      // Optionally add a toast notification here
    }
  };

  return (
    <div className="relative overflow-hidden py-12 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Would You Rather</span>
          </h1>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {SAMPLE_QUESTIONS.map((q, idx) => {
            const totalVotes = q.votesOne + q.votesTwo;
            const percentageOne = calculatePercentage(q.votesOne, totalVotes);
            const percentageTwo = calculatePercentage(q.votesTwo, totalVotes);

            return (
              <div
                key={idx}
                className="relative bg-gray-800 rounded-xl shadow-xl p-8 border border-purple-900
                         transform transition-all duration-300 hover:scale-[1.02]"
              >
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  {q.question}
                </h2>

                <div className="space-y-6">
                  {/* Option One */}
                  <div
                    className="relative"
                    onMouseEnter={() => setHoveredOption({ cardIndex: idx, option: 1 })}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div className={`relative w-full h-12 bg-purple-500/20 rounded-full overflow-hidden
                transition-all duration-300 
                ${hoveredOption?.cardIndex === idx && hoveredOption?.option === 1 ? 'blur-[5px]' : ''}`}>
                      {/* Progress Fill */}
                      <div
                        className="absolute right-0 top-0 h-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${percentageOne}%` }}
                      />

                      {/* Content Layer */}
                      <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
                        <span className="text-white font-medium">
                          {q.optionOne}
                        </span>
                        <span className="text-white font-medium">
                          {percentageOne}%
                        </span>
                      </div>
                    </div>

                    {/* Login Overlay */}
                    {hoveredOption?.cardIndex === idx && hoveredOption?.option === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 rounded-full">
                        <Link
                          to="/auth/login"
                          className="px-6 py-2 rounded-lg text-white 
                 font-medium transition-all duration-200 hover:scale-105"
                        >
                          Login/Signup to Vote
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Option Two */}
                  <div
                    className="relative"
                    onMouseEnter={() => setHoveredOption({ cardIndex: idx, option: 2 })}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div className={`relative w-full h-12 bg-indigo-500/20 rounded-full overflow-hidden
                transition-all duration-300 
                ${hoveredOption?.cardIndex === idx && hoveredOption?.option === 2 ? 'blur-[5px]' : ''}`}>
                      {/* Progress Fill */}
                      <div
                        className="absolute right-0 top-0 h-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${percentageTwo}%` }}
                      />

                      {/* Content Layer */}
                      <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
                        <span className="text-white font-medium">
                          {q.optionTwo}
                        </span>
                        <span className="text-white font-medium">
                          {percentageTwo}%
                        </span>
                      </div>
                    </div>

                    {/* Login Overlay */}
                    {hoveredOption?.cardIndex === idx && hoveredOption?.option === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 rounded-full">
                        <Link
                          to="/auth/login"
                          className="px-6 py-2 rounded-lg text-white 
                 font-medium transition-all duration-200 hover:scale-105"
                        >
                          Login/Signup to Vote
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400 text-center">
                  {totalVotes.toLocaleString()} total votes
                </div>

                {/* Share Buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleShare(q.question, 'twitter')}
                    className="p-2 text-gray-300 hover:text-purple-400 transition-colors"
                    title="Share on X (Twitter)"
                  >
                    <FaXTwitter size={20} />
                  </button>
                  <button
                    onClick={() => handleShare(q.question, 'copy')}
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
      </div>
    </div>
  );
};

export default LandingPage;