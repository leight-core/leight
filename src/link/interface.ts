export interface IParams extends Object {
}

export interface ILinkContext {
	generate(href: string, params?: IParams): string;
}
