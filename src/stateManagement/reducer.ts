import { problems } from '../problemSets';
import { AllActions } from './actions';
import { AppState, emptyState } from './state';

export const reducer = (currentState: AppState, action: AllActions): AppState => {
	const { currentAnswerLine, currentProblem, submittedAnswers } = currentState;

	switch (action.type) {
		case 'save-ls': {
			localStorage.setItem('tunnel', JSON.stringify(currentState));
			return { ...currentState };
		}

		case 'clear-ls': {
			localStorage.removeItem('tunnel');
			return { ...currentState };
		}

		case 'cycle-problem': {
			const newProblem = (currentProblem + 1) % problems.length;
			let numForwards = 0;
			for (const thisStep of problems[newProblem].scheme) {
				if (thisStep.through === 0) numForwards++;
			}
			return { ...emptyState, currentProblem: newProblem, currentAnswerLine: { ...emptyState.currentAnswerLine, forwards: [...Array(numForwards)].map(() => '') } };
		}

		case 'change-user': {
			const { user } = action;
			return { ...currentState, currentAnswerLine: { ...currentAnswerLine, user } };
		}

		case 'change-ip': {
			const { ip } = action;
			return { ...currentState, currentAnswerLine: { ...currentAnswerLine, ip } };
		}

		case 'change-port': {
			const { port } = action;
			return { ...currentState, currentAnswerLine: { ...currentAnswerLine, port } };
		}

		case 'change-forwards': {
			const { forwards } = action;
			return { ...currentState, currentAnswerLine: { ...currentAnswerLine, forwards } };
		}

		case 'submit-answer': {
			const { answer } = action;
			let numForwards = 0;
			for (const thisStep of problems[currentProblem].scheme) {
				if (thisStep.through === submittedAnswers.length + 1) numForwards++;
			}
			return { ...currentState, submittedAnswers: [...submittedAnswers, answer], currentAnswerLine: { ...emptyState.currentAnswerLine, forwards: [...Array(numForwards)].map(() => '') } };
		}

		default: {
			const exhaustiveCheck: never = action;
			throw new Error(`Unhandled Action Case: ${exhaustiveCheck}`);
		}
	}
};
