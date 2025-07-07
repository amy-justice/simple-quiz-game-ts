import React from 'react';
import { QuizContext } from './Quiz';
import type { Question } from './Quiz';

export default function QuizProgress() {
	const { quizQuestions, currentQuestion } = React.useContext(QuizContext);

	return (
		<>
			<h1>
				{currentQuestion + 1} / {quizQuestions.length}
			</h1>
			<div className="quiz-progress-bar">
				{quizQuestions.map((_item: Question, index: number) => {
					return (
						<div
							key={index}
							className={`progress-chunk ${
								index < currentQuestion + 1 ? 'complete' : 'grey'
							}`}
						></div>
					);
				})}
			</div>
		</>
	);
}
