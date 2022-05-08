import { Problem } from '../stateManagement';

// > 10.0.0.1
// -> 10.0.0.2
// -> 10.0.0.3
export const problem1: Problem = {
	topology: [
		{
			ip: '10.0.0.1',
			sshPort: '22',
			user: 'john0',
		},
		{
			ip: '10.0.0.2',
			sshPort: '22',
			user: 'john1',
		},
		{
			ip: '10.0.0.3',
			sshPort: '22',
			user: 'john2',
		},
	],
	scheme: [
		{
			type: 'forward',
			through: -1,
			target: 0,
		},
		{
			type: 'forward',
			through: 0,
			target: 1,
		},
		{
			type: 'forward',
			through: 0,
			target: 2,
		},
	],
};
