import { CSSProperties, MouseEventHandler, useEffect } from 'react';
import { NetworkTopology, schemeOfManeuver } from '../../types';
import { AnswerLine } from './AnswerLine';

const sectionStyle: CSSProperties = {
	backgroundColor: 'yellow',
	height: '250px',
};

type Props = {
	scheme: schemeOfManeuver;
	topology: NetworkTopology;
	answerHook: any;
	selectedProblem: any;
};

export function AnswerBox({ scheme, topology, answerHook, selectedProblem }: Props) {
	const [answers, setAnswers] = answerHook;

	useEffect(() => {
		const stored = localStorage.getItem('tunnel');
		if (stored !== null) setAnswers(JSON.parse(stored));
	}, [setAnswers]);

	// useEffect(() => {
	// 	setAnswers([]);
	// }, [scheme]);

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
			{answers.length === scheme.length ? 'WIN' : null}
		</>
	);
}
