// > 192.168.0.1
// -> 192.168.0.2
// --< 192.168.0.3

type step = {
	type: 'forward' | 'reverse';
	through: number;
	target: number;
};

export type schemeOfManeuver = step[];

// where -1 is you

const exampleScheme: schemeOfManeuver = [
	{
		through: -1, // > 192.168.0.1
		target: 0,
		type: 'forward',
	},
	{
		through: 0, // -> 192.168.0.2
		target: 1,
		type: 'forward',
	},
	{
		through: 1, // --< 192.168.0.3
		target: 2,
		type: 'reverse',
	},
];

type box = {
	user: string;
	ip: string;
	sshPort: number;
	reversePort?: number;
};

export type NetworkTopology = box[];

export const exampleTopology: NetworkTopology = [
	{
		ip: '192.168.0.1',
		sshPort: 22,
		user: 'steve',
	},
	{
		ip: '192.168.0.2',
		sshPort: 22,
		user: 'steve',
	},
	{
		ip: '192.168.0.3',
		sshPort: 22,
		user: 'steve',
		reversePort: 80,
	},
];
