export interface IParams extends Partial<Object> {
}

export interface ILinkContext {
	generate(href: string, params?: IParams): string;
}
