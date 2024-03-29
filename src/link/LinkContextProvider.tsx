import {IQueryParams, LinkContext} from "@leight-core/leight";
import {compile} from "path-to-regexp";
import {FC, PropsWithChildren, useRef} from "react";

export type ILinkContextProviderProps = PropsWithChildren;

export const LinkContextProvider: FC<ILinkContextProviderProps> = props => {
	const cache = useRef<{ [index: string]: any }>({});
	const count = useRef<number>(0);
	const limit = 10000;

	function generator(path: string) {
		if (cache.current[path]) {
			return cache.current[path];
		}
		const generator = compile(path);
		if (++count.current >= limit) {
			cache.current = {};
		}
		return cache.current[path] = generator;
	}

	function generate<TQuery extends IQueryParams = IQueryParams>(path: string, query?: TQuery): string {
		return path === "/" ? path : generator(path)(query, {pretty: true});
	}

	return <LinkContext.Provider
		value={{
			generate,
			link<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string {
				href = href.replaceAll(/{(.*?)}/g, ":$1");
				return generate(href, query);
			}
		}}
	>
		{props.children}
	</LinkContext.Provider>;
};
