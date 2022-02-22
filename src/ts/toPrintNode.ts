import ts from "typescript";

export function toPrintNode(node: ts.Node, sourceFile: ts.SourceFile, indentLevel: number = 0) {
	const indentation = "    ".repeat(indentLevel);
	const syntaxKind = ts.SyntaxKind[node.kind];
	const nodeText = node.getText(sourceFile);
	console.log(`${indentation}${syntaxKind}: ${nodeText}`);
	node.getChildren(sourceFile).forEach(child => toPrintNode(child, sourceFile, indentLevel + 1));
}
