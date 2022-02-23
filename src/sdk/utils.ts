import {pickNode} from "@leight-core/leight";
import type ts from "typescript";

export function isExport(node: ts.Node, sourceFile: ts.SourceFile): boolean {
	return !!pickNode(["SyntaxList", "ExportKeyword"], node, sourceFile);
}
