import { CSSProperties } from 'react';
import { problems } from '../../problemSets';
import { AppState } from '../../stateManagement';

const schemeStyle: CSSProperties = {
	backgroundColor: 'lightgrey',
};

type Props = {
	state: AppState;
};

export function SchemeOfManeuver({ state }: Props) {
	const { currentProblem } = state;
	const { scheme, topology } = problems[currentProblem];

	const numDashes = scheme.reduce(
		(prev: { [key: number]: number }, step, i) => {
			const { through } = step;
			return { ...prev, [i]: prev[through] + 1 };
		},
		{ [-1]: -1 }
	);

	const schemeLines = scheme.map((step, i) => {
		const { type, target } = step;

		const dashes = `-`.repeat(numDashes[i]);
		const arrow = type === 'forward' ? `>` : `<`;
		const { ip } = topology[target];

		return <div key={i} style={{ marginLeft: '10px' }}>{`${dashes} ${arrow} ${ip}`}</div>;
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
