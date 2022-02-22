import {toNodePaths} from "@leight-core/leight";
import minimatch from "minimatch";
import ts from "typescript";

export function pickNodes(path: string[], root: ts.Node, sourceFile: ts.SourceFile): ts.Node[] {
	const request = ["*", ...path].join("/");
	return toNodePaths(root, sourceFile).filter(node => minimatch(node.path, request)).map(node => node.node);
}

export function pickNode(path: string[], root: ts.Node, sourceFile: ts.SourceFile): ts.Node | undefined {
	return pickNodes(path, root, sourceFile)?.[0];
}
