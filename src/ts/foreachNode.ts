import {IForeachNodeCallback, toNode} from "@leight-core/leight";
import ts from "typescript";

export function foreachNode(node: ts.Node, sourceFile: ts.SourceFile, callback: IForeachNodeCallback) {
	node.forEachChild(node => callback(toNode(node, sourceFile)));
}
