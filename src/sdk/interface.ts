export interface IImportReflection {
	name: string;
	source: string;
}

export interface IInterfaceReflection {
	name: string;
	source: string;
}

export interface IEndpointReflection {
	name: string;
	type: string;
	api: string;
	generics: string[];
}

export interface ISdk {
	file: string;
	interfaces: IInterfaceReflection[];
	endpoint: IEndpointReflection;
}

export interface IGenerator {
	(sdk: ISdk): string;
}

export interface IGenerators {
	[index: string]: IGenerator;
}
