import { CSSProperties, useState } from 'react';
import { problems } from '../problems';
import { Answers } from '../types';
import { AnswerBox } from './answerSection';
import { NetworkDiagram } from './networkSection';
import { SchemeOfManeuver } from './schemeSection';
import { TopBar } from './TopBar';

const appStyle: CSSProperties = {
	backgroundColor: 'green',
	height: '100vh',
	width: '100vw',
};

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
			<TopBar {...{ selectedProblem, setSelectedProblem, answerHook, problemsLength: problems.length }} />
			<NetworkDiagram networkTopology={topology} />
			<SchemeOfManeuver {...{ scheme, topology }} />
			<AnswerBox {...{ scheme, topology, answerHook, selectedProblem }} />
		</div>
	);
}
