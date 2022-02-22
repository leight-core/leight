import {INodePath} from "@leight-core/leight";
import ts from "typescript";

export function toNodePaths(root: ts.Node, sourceFile: ts.SourceFile, path: string[] = []): INodePath[] {
	let paths = [
		{
			path: [...path, ts.SyntaxKind[root.kind]].join("/"),
			node: root,
		}
	];
	root.getChildren(sourceFile).forEach(node => paths.push(...toNodePaths(node, sourceFile, [...path, ts.SyntaxKind[root.kind]])));
	return paths;
}
