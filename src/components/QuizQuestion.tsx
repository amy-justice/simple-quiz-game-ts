import React from 'react';
import { QuizContext } from './Quiz';
import QuizAnswer from './QuizAnswer';

type Answer = {
	text: string;
	correct?: boolean;
};

export default function QuizQuestion() {
	const {
		quizQuestions,
		setQuizStart,
		currentQuestion,
		setCurrentQuestion,
		answered,
		setAnswered,
	} = React.useContext(QuizContext);

	const [answers, setAnswers] = React.useState<Answer[]>([]);
	const [correctAnswer, setCorrectAnswer] = React.useState(
		quizQuestions[currentQuestion].correctAnswer
	);

	const shuffleAnswers = (answersArr: string[]) => {
		const shuffled: string[] = answersArr
			.map(answer => ({ answer, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ answer }) => answer);

		return shuffled;
	};

	const getAnswers = () => {
		if (currentQuestion + 1 < quizQuestions.length) {
			setCorrectAnswer(quizQuestions[currentQuestion + 1].correctAnswer);
		}
		const answersArray = shuffleAnswers([
			quizQuestions[currentQuestion].correctAnswer,
			...quizQuestions[currentQuestion].incorrectAnswers,
		]);
		setAnswers(
			answersArray.map((answer: string) => {
				if (answer === correctAnswer) {
					return {
						text: answer,
						correct: true,
					};
				} else {
					return {
						text: answer,
						correct: false,
					};
				}
			})
		);
	};

	React.useEffect(() => {
		getAnswers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentQuestion]);

	const getNextQuestion = () => {
		if (currentQuestion + 1 >= quizQuestions.length) {
			setCurrentQuestion(0);
			setAnswered(false);
			setCorrectAnswer('');
			setQuizStart(false);
		} else {
			setCurrentQuestion((currentQuestion: number) => currentQuestion + 1);
			setAnswered(false);
			getAnswers();
		}
	};

	return (
		<div className="quiz-question-container">
			<h1 className="quiz-question">
				{quizQuestions[currentQuestion].question.text}
			</h1>
			<div className="quiz-answer-container">
				{answers.map((answer, index) => (
					<QuizAnswer key={index} correct={answer.correct}>
						{answer.text}
					</QuizAnswer>
				))}
			</div>

			<div className={`button-container ${answered ? '' : 'button-hide'}`}>
				<button
					className={`quiz-button ${
						currentQuestion + 1 < quizQuestions.length
							? 'next-question'
							: 'button-restart'
					}`}
					onClick={getNextQuestion}
				>
					{currentQuestion + 1 < quizQuestions.length
						? 'Next Question'
						: 'Restart Quiz'}
				</button>
			</div>
		</div>
	);
}
