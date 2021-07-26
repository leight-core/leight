export interface IParams {
}

export interface ILinkContext {
	generate(href: string, params?: IParams): string;
}
