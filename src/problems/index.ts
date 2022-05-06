import { NetworkTopology, schemeOfManeuver } from '../components/networkSection';

// TODO: consider putting this with other typings
type Problem = {
	topology: NetworkTopology;
	scheme: schemeOfManeuver;
};

// > 192.168.0.1
// -> 192.168.0.2
// --> 192.168.0.3
const problem0: Problem = {
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

// > 10.0.0.1
// -> 10.0.0.2
// -> 10.0.0.3
const problem1: Problem = {
	topology: [
		{
			ip: '10.0.0.1',
			sshPort: 22,
			user: 'john0',
		},
		{
			ip: '10.0.0.2',
			sshPort: 22,
			user: 'john1',
		},
		{
			ip: '10.0.0.3',
			sshPort: 22,
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

export const problems = [problem0, problem1];
