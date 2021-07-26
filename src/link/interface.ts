export interface IParams extends NodeJS.Dict<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null> {
}

export interface ILinkContext {
	generate(href: string, params?: IParams): string;
}
