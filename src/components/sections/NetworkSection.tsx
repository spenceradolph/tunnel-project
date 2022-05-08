import { CSSProperties } from 'react';
import { problems } from '../../problemSets';
import { AppState } from '../../stateManagement';

const networkDiagramStyle: CSSProperties = {
	backgroundColor: 'yellow',
	overflow: 'hidden',
};

const boxStyle: CSSProperties = {
	backgroundColor: 'grey',
	float: 'left',
	margin: '15px',
	padding: '10px',
};

type Props = {
	state: AppState;
};

export function NetworkDiagram({ state }: Props) {
	const { currentProblem } = state;
	const { topology } = problems[currentProblem];

	const boxes = topology.map((box, i) => {
		const { ip, sshPort, user } = box;

		return (
			<div style={boxStyle} key={i}>
				<div>ip: {ip}</div>
				<div>sshport: {sshPort}</div>
				<div>user: {user}</div>
			</div>
		);
	});

	return (
		<div style={networkDiagramStyle}>
			<h2 style={{ marginLeft: '20px' }}>Network Info</h2>
			{boxes}
		</div>
	);
}
