import {exportEndpoint, exportInterface, IEndpointReflection, IInterfaceReflection, ISdk, pickNodes} from "@leight-core/leight";
import fs from "fs";
import {glob} from "glob";

export function toSdk(endpoint: string): ISdk | undefined {
	const ts = require("typescript");
	const interfaces: (IInterfaceReflection | false)[] = [];
	const endpoints: (IEndpointReflection | false)[] = [];
	const root = ts.createSourceFile(endpoint, fs.readFileSync(endpoint, "utf8"), ts.ScriptTarget.Latest);

	pickNodes(["*", "InterfaceDeclaration"], root, root).forEach(node => interfaces.push(exportInterface(node, root)));
	pickNodes(["*", "FirstStatement"], root, root).forEach(node => endpoints.push(exportEndpoint(node, root)));

	const _endpoint = endpoints.filter(item => item).map<IEndpointReflection>(item => item as IEndpointReflection)?.[0];

	if (!_endpoint) {
		return undefined;
	}

	return {
		file: root.fileName.replace("/pages", "/sdk"),
		interfaces: interfaces.filter(item => item).map<IInterfaceReflection>(item => item as IInterfaceReflection),
		endpoint: _endpoint,
	};
}

export function toSdks(path: string): ISdk[] {
	return glob.sync(path).map(toSdk).filter(sdk => sdk) as ISdk[];
}
