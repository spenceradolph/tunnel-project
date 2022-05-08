import { CSSProperties } from 'react';
import { problems } from '../problems';

const barStyle: CSSProperties = {
	width: '100%',
	height: '50px',
	backgroundColor: 'lightblue',
};

type Props = {
	selectedProblem: number;
	setSelectedProblem: React.Dispatch<React.SetStateAction<number>>;
	answerHook: any;
	problemsLength: number;
};

export function TopBar({ selectedProblem, setSelectedProblem, answerHook, problemsLength }: Props) {
	const [answers, setAnswers] = answerHook;

	return (
		<div style={barStyle}>
			<h1 style={{ textAlign: 'center' }}>Tunnel Practice!</h1>
			<button
				style={{ float: 'right', marginRight: '500px' }}
				onClick={() => {
					setSelectedProblem((selectedProblem + 1) % problemsLength);
					setAnswers([]);
				}}
			>
				Cycle To Next Problem
			</button>
		</div>
	);
}
