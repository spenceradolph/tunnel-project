import { CSSProperties, useReducer } from 'react';
import { initialState, reducer } from '../stateManagement';
import { AnswerSection, NetworkDiagram, SchemeOfManeuver, TopBar } from './sections';

const appStyle: CSSProperties = {
	backgroundColor: 'green',
	height: '100vh',
	width: '100vw',
};

export function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div style={appStyle}>
			<TopBar {...{ state, dispatch }} />
			<NetworkDiagram {...{ state }} />
			<SchemeOfManeuver {...{ state }} />
			<AnswerSection {...{ state, dispatch }} />
		</div>
	);
}
