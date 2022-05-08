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

export type Problem = {
	topology: NetworkTopology;
	scheme: schemeOfManeuver;
};

export type Answers = {
	localPort: number;
	target: number;
	direction: 'forward' | 'reverse';
	targetPort: number;
}[][];
