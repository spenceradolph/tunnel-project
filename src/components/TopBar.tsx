import { CSSProperties } from 'react';

const barStyle: CSSProperties = {
	width: '100%',
	height: '50px',
	backgroundColor: 'lightblue',
};

type Props = {
	selectedProblem: number;
	setSelectedProblem: React.Dispatch<React.SetStateAction<number>>;
	answerHook: any;
};

export function TopBar({ selectedProblem, setSelectedProblem, answerHook }: Props) {
	const [answers, setAnswers] = answerHook;

	return (
		<div style={barStyle}>
			<h1 style={{ textAlign: 'center' }}>Tunnel Practice!</h1>
			<button
				style={{ float: 'right', marginRight: '500px' }}
				onClick={() => {
					setSelectedProblem(0);
					setAnswers([]);
				}}
			>
				Change Problem
			</button>
		</div>
	);
}
