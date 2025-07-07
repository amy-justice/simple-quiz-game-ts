import React from 'react';
import { QuizContext } from './Quiz';

export default function QuizAnswer({
	children,
	correct,
}: {
	children: React.ReactNode;
	correct?: boolean;
}) {
	const { answered, setAnswered, currentQuestion } =
		React.useContext(QuizContext);
	const [selected, setSelected] = React.useState(false);

	React.useEffect(() => setSelected(false), [currentQuestion]);

	const selectAnswer = () => {
		if (!answered) {
			setAnswered(true);
			setSelected(true);
		}
	};

	return (
		<button
			onClick={selectAnswer}
			className={`quiz-answer ${answered && correct && 'correct-answer'} ${
				!correct && selected && 'wrong-answer'
			}`}
		>
			{children}
		</button>
	);
}
