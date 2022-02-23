import {exportEndpoint, exportImport, exportInterface, IEndpointReflection, IGenerators, IImportReflection, IInterfaceReflection, ISdk, pickNodes} from "@leight-core/leight";
import {readFileSync} from "fs-extra";
import {glob} from "glob";

export function toSdk(endpoint: string, generators: IGenerators): ISdk | undefined {
	const ts = require("typescript");
	const interfaces: (IInterfaceReflection | false)[] = [];
	const imports: (IImportReflection | false)[] = [];
	const endpoints: (IEndpointReflection | false)[] = [];
	const root = ts.createSourceFile(endpoint, readFileSync(endpoint, "utf8"), ts.ScriptTarget.Latest);

	console.log(`${"-".repeat(16)} Parsing ${"-".repeat(16)}\n${endpoint}\n--------------------------------`);
	// toPrintNode(root, root);

	pickNodes(["*", "ImportDeclaration"], root, root).forEach(node => imports.push(exportImport(node, root)));
	pickNodes(["*", "InterfaceDeclaration"], root, root).forEach(node => interfaces.push(exportInterface(node, root)));
	pickNodes(["*", "FirstStatement"], root, root).forEach(node => endpoints.push(exportEndpoint(node, root, generators)));

	const _endpoint = endpoints.filter(item => item).map<IEndpointReflection>(item => item as IEndpointReflection)?.[0];

	if (!_endpoint) {
		return undefined;
	}

	return {
		file: root.fileName.replace("/pages", "/sdk").replace(".ts", ".tsx"),
		imports: imports.filter(Boolean) as IImportReflection[],
		interfaces: interfaces.filter(Boolean) as IInterfaceReflection[],
		endpoint: _endpoint,
	};
}

export function toSdks(path: string, generators: IGenerators): ISdk[] {
	return glob.sync(path).map(endpoint => toSdk(endpoint, generators)).filter(sdk => sdk) as ISdk[];
}
