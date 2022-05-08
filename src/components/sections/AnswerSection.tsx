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
		const { through, target } = step;
		const { user, ip, sshPort } = topology[target];

		const changeUser: ChangeEventHandler<HTMLInputElement> = (e) => dispatch({ type: 'change-user', user: e.target.value });
		const userValue = submittedAnswers.length === i ? currentAnswerLine.user : submittedAnswers.length > i ? user : '';

		const changeIp: ChangeEventHandler<HTMLInputElement> = (e) => dispatch({ type: 'change-ip', ip: e.target.value });
		const answerIp = through !== -1 ? '127.0.0.1' : ip;
		const ipValue = submittedAnswers.length === i ? currentAnswerLine.ip : submittedAnswers.length > i ? answerIp : '';

		const changePort: ChangeEventHandler<HTMLInputElement> = (e) => dispatch({ type: 'change-port', port: e.target.value });
		let answerPort = sshPort;
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
			if (target === thisStep.through) {
				arrayOfTargets.push(thisStep.target);
				numForwards++;
			}
		}

		const checkAnswer: MouseEventHandler<HTMLInputElement> = (event) => {
			event.preventDefault();

			// check user
			if (currentAnswerLine.user !== user) return alert('wrong user!');

			// check ip
			if (through === -1 && currentAnswerLine.ip !== ip) return alert('wrong ip!');
			if (through !== -1 && currentAnswerLine.ip !== '127.0.0.1') return alert('wrong ip!');

			// check port
			if (through === -1 && currentAnswerLine.port !== sshPort) return alert('wrong port!');
			if (through !== -1) {
				for (const thisAnswer of submittedAnswers) {
					for (const thisForward of thisAnswer) {
						const { localPort, target } = thisForward;
						if (target !== step.target) continue;
						if (localPort !== currentAnswerLine.port) return alert('wrong port!'); // doesn't match previous forward
					}
				}
			}

			// check forward (and finalize answer to save)
			let inputForwards: Answers[0] = [];
			for (const localForward of currentAnswerLine.forwards) {
				const nonWhite = localForward.replaceAll(' ', '');
				if (nonWhite[0] !== '-') return alert('invalid format');
				if (nonWhite[1] !== 'L' && nonWhite[1] !== 'R') return alert('invalid format');
				const direction = nonWhite[1] === 'L' ? 'forward' : 'reverse';
				const restOfString = nonWhite.slice(2);
				if (restOfString.split(':').length !== 3) return alert('invalid format');
				const [localPort, arrayTarget, targetPort] = restOfString.split(':');
				if (inputForwards.findIndex((input, i) => `${input.localPort}` === localPort) !== -1) return alert('saw port already');
				const target = topology.findIndex((box) => box.ip === arrayTarget);
				inputForwards.push({ localPort, target, direction, targetPort });
			}

			for (const inputForward of inputForwards) {
				// verify that the target matches the sshPort
				if (inputForward.targetPort !== topology[inputForward.target].sshPort) return alert('bad target port');

				// verify that all the targets are correct
				if (!arrayOfTargets.includes(inputForward.target)) return alert('target not needed');
				arrayOfTargets = [...arrayOfTargets].filter((num) => num !== inputForward.target);
			}

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
