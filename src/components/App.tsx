import { CSSProperties } from 'react';
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

export function App() {
	// TODO: problem selection (random or select)
	const { scheme, topology } = problems[1];

	return (
		<div style={appStyle}>
			<TopBar />
			<NetworkDiagram networkTopology={topology} />
			<SchemeOfManeuver scheme={scheme} topology={topology} />
			<AnswerBox scheme={scheme} topology={topology} />
		</div>
	);
}
