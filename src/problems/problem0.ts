import { Problem } from '../types';

// > 192.168.0.1
// -> 192.168.0.2
// --> 192.168.0.3
export const problem0: Problem = {
	topology: [
		{
			ip: '192.168.0.1',
			sshPort: 22,
			user: 'steve0',
		},
		{
			ip: '192.168.0.2',
			sshPort: 22,
			user: 'steve1',
		},
		{
			ip: '192.168.0.3',
			sshPort: 22,
			user: 'steve2',
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
			through: 1,
			target: 2,
		},
	],
};
