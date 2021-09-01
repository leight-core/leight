export type IQuery = NodeJS.Dict<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null> | undefined;

export interface ILinkContext {
	generate(href: string, query?: IQuery): string;
}
