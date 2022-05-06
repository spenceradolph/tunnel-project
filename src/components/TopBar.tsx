import { CSSProperties } from 'react';

const barStyle: CSSProperties = {
	width: '100%',
	height: '50px',
	backgroundColor: 'lightblue',
};

type Props = {};

export function TopBar(Props: Props) {
	return (
		<div style={barStyle}>
			<h1 style={{ textAlign: 'center' }}>Tunnel Practice!</h1>
		</div>
	);
}
