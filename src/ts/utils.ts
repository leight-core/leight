import minimatch from "minimatch";
import ts from "typescript";
import {IForeachNodeCallback, INode, INodePath} from "./interface";

export function toNode(node: ts.Node, sourceFile: ts.SourceFile): INode {
	return {
		node,
		sourceFile,
		syntaxKind: ts.SyntaxKind[node.kind],
		source: node.getText(sourceFile),
	};
}

export function toNodePaths(root: ts.Node, sourceFile: ts.SourceFile, path: string[] = []): INodePath[] {
	const paths = [
		{
			path: [...path, ts.SyntaxKind[root.kind]].join("/"),
			node: root,
		}
	];
	root.getChildren(sourceFile).forEach(node => paths.push(...toNodePaths(node, sourceFile, [...path, ts.SyntaxKind[root.kind]])));
	return paths;
}


export function foreachNode(node: ts.Node, sourceFile: ts.SourceFile, callback: IForeachNodeCallback) {
	node.forEachChild(node => callback(toNode(node, sourceFile)));
}

export function pickNodes(path: string[], root: ts.Node, sourceFile: ts.SourceFile): ts.Node[] {
	const request = ["*", ...path].join("/");
	return toNodePaths(root, sourceFile).filter(node => minimatch(node.path, request)).map(node => node.node);
}

export function pickNode(path: string[], root: ts.Node, sourceFile: ts.SourceFile): ts.Node | undefined {
	return pickNodes(path, root, sourceFile)?.[0];
}

export function toPrintNode(node: ts.Node, sourceFile: ts.SourceFile, indentLevel = 0) {
	const indentation = "    ".repeat(indentLevel);
	const syntaxKind = ts.SyntaxKind[node.kind];
	const nodeText = node.getText(sourceFile);
	console.log(`${indentation}${syntaxKind}: ${nodeText}`);
	node.getChildren(sourceFile).forEach(child => toPrintNode(child, sourceFile, indentLevel + 1));
}
