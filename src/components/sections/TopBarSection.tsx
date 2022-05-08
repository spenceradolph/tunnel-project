import { CSSProperties, Dispatch } from 'react';
import { AllActions, AppState } from '../../stateManagement';

const barStyle: CSSProperties = {
	backgroundColor: 'lightblue',
	padding: '20px',
};

type Props = {
	state: AppState;
	dispatch: Dispatch<AllActions>;
};

export function TopBar({ state, dispatch }: Props) {
	const { currentProblem } = state;

	const cycleProblem = () => dispatch({ type: 'cycle-problem' });
	const saveLS = () => dispatch({ type: 'save-ls' });
	const clearLS = () => dispatch({ type: 'clear-ls' });

	return (
		<div style={barStyle}>
			<h1 style={{ textAlign: 'center' }}>Tunnel Practice!</h1>
			<div>Current Problem = {currentProblem}</div>
			<button onClick={cycleProblem}>Cycle To Next Problem</button>
			<button onClick={saveLS}>Save LS</button>
			<button onClick={clearLS}>Clear LS</button>
		</div>
	);
}
