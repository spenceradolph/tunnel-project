import { CSSProperties } from 'react';
import { NetworkTopology, schemeOfManeuver } from '../networkSection';

const schemeStyle: CSSProperties = {
	backgroundColor: 'yellow',
};

type Props = {
	scheme: schemeOfManeuver;
	topology: NetworkTopology;
};

export function SchemeOfManeuver({ scheme, topology }: Props) {
	const schemeLines = scheme.map((step, index) => {
		const { type, through, target } = step;
		const arrow = type === 'forward' ? `>` : `<`;
		const { ip } = topology[target];

		return (
			<div key={index} style={{ marginLeft: '10px' }}>
				{`${`-`.repeat(through + 1)} ${arrow} ${ip}`}
			</div>
		);
	});

	return (
		<>
			<h1 style={{ marginLeft: '20px' }}>Scheme of Maneuver</h1>
			<div style={schemeStyle}>{schemeLines}</div>
		</>
	);
}
