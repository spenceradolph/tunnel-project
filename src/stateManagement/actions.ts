import { Answers } from './types';

type SaveLSAction = {
	type: 'save-ls';
};

type ClearLSAction = {
	type: 'clear-ls';
};

type CycleProblemAction = {
	type: 'cycle-problem';
};

type ChangeUserAction = {
	type: 'change-user';
	user: string;
};

type ChangeIPAction = {
	type: 'change-ip';
	ip: string;
};

type ChangeTPortAction = {
	type: 'change-port';
	port: string;
};

type ChangeForwardsAction = {
	type: 'change-forwards';
	forwards: string[];
};

type SubmitAnswerAction = {
	type: 'submit-answer';
	answer: Answers[0];
};

export type AllActions = SaveLSAction | ClearLSAction | CycleProblemAction | ChangeUserAction | ChangeIPAction | ChangeTPortAction | ChangeForwardsAction | SubmitAnswerAction;
