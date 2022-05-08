import { Answers } from './types';

export type AppState = {
	currentProblem: number;
	submittedAnswers: Answers;
	currentAnswerLine: {
		user: string;
		ip: string;
		port: string;
		forwards: string[];
	};
};

export const emptyState: AppState = {
	currentProblem: 0,
	submittedAnswers: [],
	currentAnswerLine: {
		user: '',
		ip: '',
		port: '',
		forwards: [''],
	},
};

const locallyStoredState = localStorage.getItem('tunnel');

export const initialState: AppState = locallyStoredState ? JSON.parse(locallyStoredState) : emptyState;
