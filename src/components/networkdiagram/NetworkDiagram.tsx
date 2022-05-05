import { CSSProperties } from 'react';
import { NetworkTopology } from './networkTypes';

const networkDiagramStyle: CSSProperties = {
	width: '100%',
	height: '500px',
	backgroundColor: 'yellow',
	float: 'left',
};

const boxStyle: CSSProperties = {
	float: 'left',
	width: '200px',
	height: '400px',
	backgroundColor: 'grey',
	marginRight: '20px',
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
				<div>port: {sshPort}</div>
				<div>user: {user}</div>
			</div>
		);
	});

	return <div style={networkDiagramStyle}>{boxes}</div>;
}
