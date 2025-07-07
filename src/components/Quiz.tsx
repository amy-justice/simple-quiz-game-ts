import React from 'react';
import QuizQuestion from './QuizQuestion';
import QuizSetup from './QuizSetup';
import QuizProgress from './QuizProgress';

export type Question = {
	category: string;
	id: string;
	tags: string[];
	question: { text: string };
	difficulty: string;
	type: string;
	correctAnswer: string;
	incorrectAnswers: string[];
};

type QuizContextType = {
	quizStart: boolean;
	setQuizStart: React.Dispatch<React.SetStateAction<boolean>>;
	quizQuestions: Question[];
	setQuizQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
	currentQuestion: number;
	setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
	answered: boolean;
	setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuizContext = React.createContext({} as QuizContextType);

export default function Quiz() {
	const [quizStart, setQuizStart] = React.useState<boolean>(false);
	const [quizQuestions, setQuizQuestions] = React.useState<Question[]>([]);
	const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
	const [answered, setAnswered] = React.useState<boolean>(false);

	return (
		<QuizContext.Provider
			value={{
				quizStart,
				setQuizStart,
				quizQuestions,
				setQuizQuestions,
				currentQuestion,
				setCurrentQuestion,
				answered,
				setAnswered,
			}}
		>
			{quizStart ? (
				<>
					<QuizProgress />
					<QuizQuestion />
				</>
			) : (
				<QuizSetup />
			)}
		</QuizContext.Provider>
	);
}

export { QuizContext };
