import ts from "typescript";

export interface INode {
	node: ts.Node;
	sourceFile: ts.SourceFile;
	syntaxKind: string;
	source: string;
}

export type INodePath = {
	path: string;
	node: ts.Node;
};

export type IForeachNodeCallback = (node: INode) => void;
