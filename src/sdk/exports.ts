import {IEndpointReflection, IGenerators, IImportReflection, IInterfaceReflection, isExport, pickNode, pickNodes, requireNode, toNode, toPrintNode} from "@leight-core/leight";
import type ts from "typescript";

export function exportImport(node: ts.Node, sourceFile: ts.SourceFile): IImportReflection | false {
	console.log("So, it's time to export imports");
	toPrintNode(node, sourceFile);
	return false;
}

export function exportInterface(node: ts.Node, sourceFile: ts.SourceFile): IInterfaceReflection | false {
	const source = node.getText(sourceFile);
	const withExport = isExport(node, sourceFile);
	const name = toNode(requireNode(["Identifier"], node, sourceFile), sourceFile);
	console.info(`=== Export interface (${withExport}) ===\n${source}\n`);
	return withExport && {
		source,
		name: name.source,
	};
}

export function exportEndpoint(node: ts.Node, sourceFile: ts.SourceFile, generators: IGenerators): IEndpointReflection | false {
	const source = node.getText(sourceFile);
	const withExport = isExport(node, sourceFile);
	const api = ("/" + sourceFile.fileName.replace("src/", "").replace("pages/", "").replace(".ts", "")).replace("//", "/");

	console.info(`=== Checking Endpoint Node ===\n${source}`);

	if (!withExport) {
		console.info("- not exported\n");
		return false;
	}

	const variableDeclarationNode = pickNode(["VariableDeclarationList", "SyntaxList", "VariableDeclaration"], node, sourceFile);

	if (!variableDeclarationNode) {
		console.info("- variable declaration node not found\n");
		return false;
	}

	const nodes = [
		pickNode(["Identifier"], variableDeclarationNode, sourceFile),
		pickNode(["TypeReference", "Identifier"], variableDeclarationNode, sourceFile),
		pickNode(["TypeReference", "SyntaxList"], variableDeclarationNode, sourceFile),
	].filter(node => node);

	if (nodes.length !== 3) {
		console.info("- some of syntax nodes missing\n");
		return false;
	}

	const type = toNode(nodes[1] as ts.Node, sourceFile).source;
	if (!Object.keys(generators).includes(type)) {
		console.info(`- unknown endpoint type [${type}]\n`);
		return false;
	}

	console.info("- success\n");

	return {
		name: toNode(nodes[0] as ts.Node, sourceFile).source,
		api,
		type,
		generics: pickNodes(["+(TypeReference|UnionType|VoidKeyword|UndefinedKeyword|TypeLiteral)"], nodes[2] as ts.Node, sourceFile).map(node => toNode(node, sourceFile).source),
	};
}
