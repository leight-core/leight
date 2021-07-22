import {compile} from "path-to-regexp";
import {FC, useRef} from "react";
import {IParams} from "./interface";
import {LinkContext} from "./LinkContext";

export interface ILinkContextProviderProps {
}

export const LinkContextProvider: FC<ILinkContextProviderProps> = ({children}) => {
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

	return <LinkContext.Provider
		value={{
			generate(path: string, params?: IParams): string {
				return path === "/" ? path : generator(path)(params, {pretty: true});
			}
		}}
		children={children}
	/>;
};
