import { CSSProperties, useEffect, useState } from 'react';
import { problems } from '../problems';
import { AnswerBox } from './answerSection';
import { NetworkDiagram } from './networkSection';
import { SchemeOfManeuver } from './schemeSection';
import { TopBar } from './TopBar';

const appStyle: CSSProperties = {
	backgroundColor: 'green',
	height: '100vh',
	width: '100vw',
};

export type Answers = {
	localPort: number;
	target: number;
	direction: 'forward' | 'reverse';
	targetPort: number;
}[][];

export function App() {
	// TODO: problem selection (random or select)
	const [selectedProblem, setSelectedProblem] = useState(1);

	const { scheme, topology } = problems[selectedProblem];

	const answerHook = useState<Answers>([
		// for problems[1]
		[
			{ localPort: 2222, target: 1, direction: 'forward', targetPort: 22 },
			{ localPort: 3333, target: 2, direction: 'forward', targetPort: 22 },
		],
		// [],
		// [],
	]);

	return (
		<div style={appStyle}>
			<TopBar {...{ selectedProblem, setSelectedProblem, answerHook }} />
			<NetworkDiagram networkTopology={topology} />
			<SchemeOfManeuver scheme={scheme} topology={topology} />
			<AnswerBox scheme={scheme} topology={topology} answerHook={answerHook} />
		</div>
	);
}
