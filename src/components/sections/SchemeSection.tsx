import { CSSProperties } from 'react';
import { problems } from '../../problemSets';
import { AllActions, AppState } from '../../stateManagement';

const schemeStyle: CSSProperties = {
	backgroundColor: 'lightgrey',
};

type Props = {
	state: AppState;
	dispatch: React.Dispatch<AllActions>;
};

export function SchemeOfManeuver({ state }: Props) {
	const { currentProblem } = state;
	const { scheme, topology } = problems[currentProblem];

	const schemeLines = scheme.map((step, i) => {
		const { type, through, target } = step;

		const dashes = `-`.repeat(through + 1);
		const arrow = type === 'forward' ? `>` : `<`;
		const { ip } = topology[target];

		return (
			<div key={i} style={{ marginLeft: '10px' }}>
				{`${dashes} ${arrow} ${ip}`}
			</div>
		);
	});

	return (
		<div style={schemeStyle}>
			<h2 style={{ marginLeft: '20px' }}>Scheme of Maneuver</h2>
			<br />
			{schemeLines}
			<br />
		</div>
	);
}
