// > 192.168.0.1
// -> 192.168.0.2
// --< 192.168.0.3

export type Step = {
	type: 'forward' | 'reverse';
	through: number;
	target: number;
};

export type schemeOfManeuver = Step[];

type box = {
	user: string;
	ip: string;
	sshPort: number;
	reversePort?: number;
};

export type NetworkTopology = box[];
