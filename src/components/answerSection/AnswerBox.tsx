import { CSSProperties, MouseEventHandler, useEffect, useState } from 'react';
import { NetworkTopology, schemeOfManeuver } from '../networkSection';
import { AnswerLine } from './AnswerLine';

const sectionStyle: CSSProperties = {
	backgroundColor: 'yellow',
	height: '250px',
};

export type Answers = {
	localPort: number;
	target: number;
	direction: 'forward' | 'reverse';
	targetPort: number;
}[][];

type Props = {
	scheme: schemeOfManeuver;
	topology: NetworkTopology;
};

export function AnswerBox({ scheme, topology }: Props) {
	const [answers, setAnswers] = useState<Answers>([
		[
			{ localPort: 2222, target: 1, direction: 'forward', targetPort: 22 },
			{ localPort: 3333, target: 2, direction: 'forward', targetPort: 22 },
		],
	]);

	useEffect(() => {
		const stored = localStorage.getItem('tunnel');
		if (stored !== null) setAnswers(JSON.parse(stored));
	}, []);

	useEffect(() => {
		if (answers.length === scheme.length) alert('win');
	}, [answers, scheme]);

	const saveLocal: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		localStorage.setItem('tunnel', JSON.stringify(answers));
		e.stopPropagation();
	};

	const clearLocal: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		localStorage.removeItem('tunnel');
		e.stopPropagation();
	};

	const answerLines = scheme.map((step, index) => {
		return <AnswerLine key={index} index={index} step={step} topology={topology} scheme={scheme} answers={answers} setAnswers={setAnswers} />;
	});

	// if (answers.length === scheme.length) alert('win!');

	return (
		<>
			<h1 style={{ marginLeft: '20px' }}>Answer Section</h1>
			<button onClick={saveLocal}>Save LS</button>
			<button onClick={clearLocal}>Clear LS</button>
			<div style={sectionStyle}>{answerLines}</div>
		</>
	);
}
