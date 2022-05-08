import { ChangeEventHandler, CSSProperties, MouseEventHandler } from 'react';
import { problems } from '../../problemSets';
import { AllActions, Answers, AppState } from '../../stateManagement';

const answerSectionStyle: CSSProperties = {
	backgroundColor: 'coral',
	padding: '5px',
};

const answerLineStyle: CSSProperties = {
	backgroundColor: 'grey',
	height: '50px',
	width: '90%',
	margin: '10px',
};

type Props = {
	state: AppState;
	dispatch: React.Dispatch<AllActions>;
};

export function AnswerSection({ state, dispatch }: Props) {
	const { submittedAnswers, currentProblem, currentAnswerLine } = state;
	const { scheme, topology } = problems[currentProblem];

	const answerLines = scheme.map((step, i) => {
		const disabled = submittedAnswers.length !== i;
		const { through } = step;
		const { user } = topology[step.target];

		const changeUser: ChangeEventHandler<HTMLInputElement> = (e) => dispatch({ type: 'change-user', user: e.target.value });
		const answerUser = topology[step.target].user;
		const userValue = submittedAnswers.length === i ? currentAnswerLine.user : submittedAnswers.length > i ? answerUser : '';

		const changeIp: ChangeEventHandler<HTMLInputElement> = (e) => dispatch({ type: 'change-ip', ip: e.target.value });
		const answerIp = through !== -1 ? '127.0.0.1' : topology[step.target].ip;
		const ipValue = submittedAnswers.length === i ? currentAnswerLine.ip : submittedAnswers.length > i ? answerIp : '';

		const changePort: ChangeEventHandler<HTMLInputElement> = (e) => dispatch({ type: 'change-port', port: e.target.value });
		let answerPort = '';
		// TODO: consider refactor
		if (through === -1) answerPort = topology[step.target].sshPort;
		if (through !== -1) {
			for (const thisAnswer of submittedAnswers) {
				for (const thisForward of thisAnswer) {
					const { localPort, target } = thisForward;
					if (target !== step.target) continue;
					answerPort = localPort;
					break;
				}
			}
		}
		const portValue = submittedAnswers.length === i ? currentAnswerLine.port : submittedAnswers.length > i ? answerPort : '';

		// figure out number of forwards
		let numForwards = 0;
		let arrayOfTargets: number[] = [];
		for (const thisStep of scheme) {
			if (step.target === thisStep.through) {
				arrayOfTargets.push(thisStep.target);
				numForwards++;
			}
		}

		const checkAnswer: MouseEventHandler<HTMLInputElement> = (event) => {
			event.preventDefault();

			// check user
			if (currentAnswerLine.user !== user) return alert('wrong user!');

			// check ip
			// if through == -1, ip is target
			// otherwise 127.0.0.1
			if (through === -1 && currentAnswerLine.ip !== topology[step.target].ip) return alert('wrong ip!');
			if (through !== -1 && currentAnswerLine.ip !== '127.0.0.1') return alert('wrong ip!');

			// check port
			// if through == -1, port is 'sshPort'
			// otherwise need to check previous answer
			if (through === -1 && currentAnswerLine.port !== `${topology[step.target].sshPort}`) return alert('wrong port!');
			if (through !== -1) {
				for (const thisAnswer of submittedAnswers) {
					for (const thisForward of thisAnswer) {
						const { localPort, target } = thisForward;
						if (target !== step.target) continue;
						if (`${localPort}` !== currentAnswerLine.port) return alert('wrong port!');
					}
				}
			}

			let inputForwards: Answers[0] = [];

			// check forward
			// TODO: refactor this mess
			for (const localForward of currentAnswerLine.forwards) {
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

				inputForwards.push({ localPort: arrayPort, target: targetNumber, direction: direction === 'L' ? 'forward' : 'reverse', targetPort: arrayTPort }); // TODO: fix potential errors with string and int
			}

			// alert(inputForwards);
			for (const inputForward of inputForwards) {
				// verify that the target matches the sshPort
				// if (inputForward.targetPort !== topology[inputForward.target].sshPort) return alert('bad target port');

				// verify that all the targets are correct
				if (!arrayOfTargets.includes(inputForward.target)) return alert('target not needed');
				arrayOfTargets = [...arrayOfTargets].filter((num) => num !== inputForward.target);
			}

			// TODO: add answer to the higher state and enable next line
			dispatch({ type: 'submit-answer', answer: inputForwards });

			event.stopPropagation();
		};

		return (
			<div style={answerLineStyle} key={i}>
				{`ssh `}
				<input placeholder="user" value={userValue} onChange={changeUser} disabled={disabled} />
				{`@`}
				<input placeholder="ip" value={ipValue} onChange={changeIp} disabled={disabled} />
				{` -p `}
				<input placeholder="port" value={portValue} onChange={changePort} disabled={disabled} />
				{` `}
				{[...Array(numForwards)].map((e, x) => {
					const changeForward: ChangeEventHandler<HTMLInputElement> = (e) => {
						let forwards = [...currentAnswerLine.forwards];
						forwards[x] = e.target.value;
						dispatch({ type: 'change-forwards', forwards });
					};
					const forwardValue =
						submittedAnswers.length === i
							? currentAnswerLine.forwards[x]
							: submittedAnswers.length > i
							? `${submittedAnswers[i][x].direction === 'forward' ? '-L ' : '-R '}${submittedAnswers[i][x].localPort}:${topology[submittedAnswers[i][x].target].ip}:${
									submittedAnswers[i][x].targetPort
							  }`
							: '';

					return <input key={x} placeholder="forward" value={forwardValue} onChange={changeForward} disabled={disabled} />;
				})}
				<input type="submit" onClick={checkAnswer} disabled={disabled} />
			</div>
		);
	});

	return (
		<div style={answerSectionStyle}>
			<h2 style={{ marginLeft: '20px' }}>Answers</h2>
			{answerLines}
			{submittedAnswers.length === scheme.length ? 'WIN' : null}
		</div>
	);
}
