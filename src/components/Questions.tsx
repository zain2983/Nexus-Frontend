import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface Question {
    id: number;
    question_text: string;
    option_one: string;
    option_two: string;
    created_at: string;
}

const Questions: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/polls/questions/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) {
        return <div className="text-center py-8 text-indigo-600">Loading questions...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {questions.map((question) => (
                <div
                    key={question.id}
                    className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-indigo-100"
                >
                    <h2 className="text-2xl text-indigo-900 font-bold text-center mb-8">
                        {question.question_text}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            className="w-full py-4 px-6 bg-indigo-500 hover:bg-indigo-600 
                                     rounded-lg transition-colors duration-200 text-white 
                                     font-semibold shadow-md hover:shadow-lg transform 
                                     hover:scale-[1.02] transition-all"
                        >
                            {question.option_one}
                        </button>
                        <button
                            className="w-full py-4 px-6 bg-purple-500 hover:bg-purple-600 
                                     rounded-lg transition-colors duration-200 text-white 
                                     font-semibold shadow-md hover:shadow-lg transform 
                                     hover:scale-[1.02] transition-all"
                        >
                            {question.option_two}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Questions;