import { CSSProperties, Dispatch, MouseEventHandler, useState } from 'react';
import { NetworkTopology, schemeOfManeuver, Step } from '../networkSection';
import { Answers } from '../App';

const answerLineStyle: CSSProperties = {
	height: '50px',
	width: '90%',
	backgroundColor: 'grey',
	margin: '10px',
	float: 'left',
};

type Props = {
	step: Step;
	topology: NetworkTopology;
	scheme: schemeOfManeuver;
	answers: Answers;
	setAnswers: Dispatch<React.SetStateAction<Answers>>;
	index: number;
};

export function AnswerLine({ step, topology, scheme, answers, index, setAnswers }: Props) {
	// local state
	const [userInput, setUserInput] = useState('');
	const [ipInput, setIpInput] = useState('');
	const [portInput, setPortInput] = useState('');
	const [forwardInputs, setForwardInputs] = useState<string[]>([]);

	// figure out number of forwards
	let numForwards = 0;
	let arrayOfTargets: number[] = [];
	for (const thisStep of scheme) {
		if (step.target === thisStep.through) numForwards++;
		arrayOfTargets.push(thisStep.target);
	}

	const { through } = step;
	const { user } = topology[step.target];

	const checkAnswer: MouseEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();

		// check user
		if (userInput !== user) return alert('wrong user!');

		// check ip
		// if through == -1, ip is target
		// otherwise 127.0.0.1
		if (through === -1 && ipInput !== topology[step.target].ip) return alert('wrong ip!');
		if (through !== -1 && ipInput !== '127.0.0.1') return alert('wrong ip!');

		// check port
		// if through == -1, port is 'sshPort'
		// otherwise need to check previous answer
		if (through === -1 && portInput !== `${topology[step.target].sshPort}`) return alert('wrong port!');
		if (through !== -1) {
			for (const thisAnswer of answers) {
				for (const thisForward of thisAnswer) {
					const { localPort, target } = thisForward;
					if (target !== step.target) continue;
					if (`${localPort}` !== portInput) return alert('wrong port!');
				}
			}
		}

		let inputForwards: { localPort: number; target: number; direction: 'forward' | 'reverse'; targetPort: number }[] = [];

		// check forward
		// TODO: refactor this mess
		for (const localForward of forwardInputs) {
			const nonWhite = localForward.replaceAll(' ', '');
			if (nonWhite[0] !== '-') return alert('invalid format0');
			if (nonWhite[1] !== 'L' && nonWhite[1] !== 'R') return alert('invalid format1');
			const direction = nonWhite[1];
			const restOfString = nonWhite.slice(2);
			const [arrayPort, arrayTarget, arrayTPort] = restOfString.split(':'); // TODO: length of split may be not 3 (can do defaults)

			// alert(arrayOfItems);

			if (
				inputForwards.findIndex((input, i) => {
					if (`${input.localPort}` === arrayPort) return true;
					return false;
				}) !== -1
			)
				return alert('saw port already');

			const targetNumber = topology.findIndex((box) => {
				return box.ip === arrayTarget;
			});

			inputForwards.push({ localPort: parseInt(arrayPort), target: targetNumber, direction: direction === 'L' ? 'forward' : 'reverse', targetPort: parseInt(arrayTPort) }); // TODO: fix potential errors with string and int
		}

		// alert(inputForwards);
		for (const inputForward of inputForwards) {
			// verify that the target matches the sshPort
			if (inputForward.targetPort !== topology[inputForward.target].sshPort) return alert('bad target port');

			// verify that all the targets are correct
			if (!arrayOfTargets.includes(inputForward.target)) return alert('target not needed');
			arrayOfTargets = [...arrayOfTargets].filter((num) => num !== inputForward.target);
		}

		// TODO: add answer to the higher state and enable next line
		setAnswers([...answers, [...inputForwards]]);

		event.stopPropagation();
	};

	// disabled (TODO: hidden for now, but should be 'disabled' but visible in the future)
	// if (index > answers.length) return null;

	// if (index < answers.length)
	// TODO: refactor this (already done up top)
	let answerPort = -2;
	if (through === -1) answerPort = topology[step.target].sshPort;
	if (through !== -1) {
		for (const thisAnswer of answers) {
			for (const thisForward of thisAnswer) {
				const { localPort, target } = thisForward;
				if (target !== step.target) continue;
				answerPort = localPort;
			}
		}
	}

	const answerIp = through !== -1 ? '127.0.0.1' : topology[step.target].ip;

	return (
		<div style={answerLineStyle}>
			{`${index} ssh `}
			<input placeholder="user" onChange={(e) => setUserInput(e.target.value)} value={index < answers.length ? topology[step.target].user : userInput} disabled={index !== answers.length} />
			{`@`}
			<input placeholder="ip" onChange={(e) => setIpInput(e.target.value)} value={index < answers.length ? answerIp : ipInput} disabled={index !== answers.length} />
			{` -p `}
			<input placeholder="port" onChange={(e) => setPortInput(e.target.value)} value={index < answers.length ? answerPort : portInput} disabled={index !== answers.length} />
			{` `}
			{[...Array(numForwards)].map((e, i) => {
				return (
					<input
						placeholder="forward"
						key={i}
						onChange={(e) => {
							let newArray = [...forwardInputs];
							newArray[i] = e.target.value;
							setForwardInputs(newArray);
						}}
						disabled={index !== answers.length}
						value={
							index < answers.length
								? `${answers[index][i].direction === 'forward' ? '-L ' : '-R '}${answers[index][i].localPort}:${topology[answers[index][i].target].ip}:${answers[index][i].targetPort}`
								: forwardInputs[i]
						}
					/>
				);
			})}
			<input type="submit" onClick={checkAnswer} disabled={index < answers.length || index > answers.length} />
		</div>
	);
}
