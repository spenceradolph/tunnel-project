import { CSSProperties } from 'react';
import { AnswerLine } from './AnswerLine';

const sectionStyle: CSSProperties = {
	backgroundColor: 'yellow',
	height: '200px',
};

type Props = {};

export function AnswerBox(props: Props) {
	return (
		<>
			<h1 style={{ marginLeft: '20px' }}>Answer Section</h1>
			<div style={sectionStyle}>
				<AnswerLine />
				<AnswerLine />
			</div>
		</>
	);
}
