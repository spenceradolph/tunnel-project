import { CSSProperties } from 'react';

const answerLineStyle: CSSProperties = {
	height: '50px',
	width: '90%',
	backgroundColor: 'grey',
	margin: '10px',
	float: 'left',
};

export function AnswerLine() {
	return (
		<div style={answerLineStyle}>
			{`ssh `}
			<input placeholder="user"></input>
			{`@`}
			<input placeholder="ip"></input>
			{` -p `}
			<input placeholder="port"></input>
			{` `}
			<input placeholder="forward"></input>
			<input type="submit"></input>
		</div>
	);
}
