import { CSSProperties } from 'react';
import { NetworkTopology } from '../../types';

const networkDiagramStyle: CSSProperties = {
	width: '100%',
	height: '250px',
	backgroundColor: 'yellow',
};

const boxStyle: CSSProperties = {
	float: 'left',
	width: '200px',
	height: '200px',
	backgroundColor: 'grey',
	marginRight: '20px',
	margin: '5px',
};

export type Props = {
	networkTopology: NetworkTopology;
};

export function NetworkDiagram({ networkTopology }: Props) {
	const boxes = networkTopology.map((box, index) => {
		const { ip, sshPort, user } = box;

		return (
			<div style={boxStyle} key={index}>
				<div>ip: {ip}</div>
				<div>sshport: {sshPort}</div>
				<div>user: {user}</div>
			</div>
		);
	});

	return (
		<>
			<h1 style={{ marginLeft: '20px' }}>Network Info</h1>
			<div style={networkDiagramStyle}>{boxes}</div>
		</>
	);
}
