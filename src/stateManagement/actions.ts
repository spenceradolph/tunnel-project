import { AppState } from './state';
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
	user: AppState[`currentAnswerLine`][`user`];
};

type ChangeIPAction = {
	type: 'change-ip';
	ip: AppState[`currentAnswerLine`][`ip`];
};

type ChangeTPortAction = {
	type: 'change-port';
	port: AppState[`currentAnswerLine`][`port`];
};

type ChangeForwardsAction = {
	type: 'change-forwards';
	forwards: AppState[`currentAnswerLine`][`forwards`];
};

type SubmitAnswerAction = {
	type: 'submit-answer';
	answer: Answers[0];
};

export type AllActions = SaveLSAction | ClearLSAction | CycleProblemAction | ChangeUserAction | ChangeIPAction | ChangeTPortAction | ChangeForwardsAction | SubmitAnswerAction;
