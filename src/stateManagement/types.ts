type Port = string;

type Box = {
	user: string;
	ip: string;
	sshPort: Port;
};

export type Step = {
	type: 'forward' | 'reverse';
	through: number;
	target: number;
};

export type NetworkTopology = Box[];

export type SchemeOfManeuver = Step[];

export type Problem = {
	topology: NetworkTopology;
	scheme: SchemeOfManeuver;
};

export type Answers = {
	localPort: Port;
	target: number;
	direction: Step[`type`];
	targetPort: Port;
}[][];
