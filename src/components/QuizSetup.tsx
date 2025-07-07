import React from 'react';

import { QuizContext } from './Quiz';

export default function QuizSetup() {
	const DEFAULT_PARAMS = {
		limit: 1,
		categories: 'all',
		difficulties: 'all',
	};

	const [quizParameters, setQuizParameters] = React.useState(DEFAULT_PARAMS);

	const { setQuizStart, setQuizQuestions } = React.useContext(QuizContext);

	React.useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(
				`https://the-trivia-api.com/v2/questions?limit=${quizParameters.limit}${
					quizParameters.categories !== 'all'
						? `&categories=${quizParameters.categories}`
						: ''
				}${
					quizParameters.difficulties !== 'all'
						? `&difficulties=${quizParameters.difficulties}`
						: ''
				}`
			);
			const json = await data.json();
			setQuizQuestions(json);
		};
		fetchData();
	}, [quizParameters, setQuizQuestions]);

	const handleClick = (): void => {
		setQuizStart(true);
	};

	const changeParameters = (
		event:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>
	): void => {
		setQuizParameters(oldQuizParameters => ({
			...oldQuizParameters,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<div className="quiz-setup">
			<h1>Quiz Setup</h1>
			<label htmlFor="limit">Number of questions</label>
			<input
				className="quiz-form-input"
				name="limit"
				type="number"
				placeholder="Number of questions"
				min="1"
				max="10"
				value={quizParameters.limit}
				onChange={event => changeParameters(event)}
			/>
			<label htmlFor="categories">Question category</label>
			<select
				className="quiz-form-input"
				name="categories"
				id="category"
				onChange={event => changeParameters(event)}
				value={quizParameters.categories}
			>
				<option value="all">All</option>
				<option value="music">Music</option>
				<option value="sport_and_leisure">Sport and Leisure</option>
				<option value="film_and_tv">Film and TV</option>
				<option value="arts_and_literature">Arts and Literature</option>
				<option value="history">History</option>
				<option value="society_and_culture">Society and Culture</option>
				<option value="science">Science</option>
				<option value="geography">Geography</option>
				<option value="food_and_drink">Food and Drink</option>
				<option value="general_knowledge">General Knowledge</option>
			</select>
			<label htmlFor="difficulties">Difficulty</label>
			<select
				className="quiz-form-input"
				name="difficulties"
				id="difficulty"
				onChange={event => changeParameters(event)}
				value={quizParameters.difficulties}
			>
				<option value="all">All</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
			<button className="quiz-button button-setup" onClick={handleClick}>
				Start Quiz
			</button>
		</div>
	);
}
