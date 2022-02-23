import {generateIMutationEndpoint, IGenerators, ISdk, toSdks} from "@leight-core/leight";
import {outputFile, remove} from "fs-extra";

export function toSource(sdk: ISdk, generators: IGenerators): string {
	const source: string[] = [];
	source.push(generators[sdk.endpoint.type]?.(sdk) || "");
	return source.join("\n");
}

export async function generateSdkFor(path: string, generators?: IGenerators): Promise<string[]> {
	const _generators = generators || {
		"IMutationEndpoint": generateIMutationEndpoint,
	};
	const exported: string[] = [];
	await remove("src/sdk");
	toSdks(path, _generators).forEach(sdk => {
		console.log(`Exporting [${sdk.file}]`, sdk);
		outputFile(sdk.file, toSource(sdk, _generators));
		exported.push(sdk.file);
	});
	return exported;
}
