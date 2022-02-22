import {INode} from "@leight-core/leight";
import ts from "typescript";

export function toNode(node: ts.Node, sourceFile: ts.SourceFile): INode {
	return {
		node,
		sourceFile,
		syntaxKind: ts.SyntaxKind[node.kind],
		source: node.getText(sourceFile),
	};
}
