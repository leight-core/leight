import {Params} from "react-router";

export interface IModuleContext {
	/**
	 * Module id, usually could be used for translating stuff.
	 */
	readonly id: string
	/**
	 * Default module icon.
	 */
	readonly icon: JSX.Element
	/**
	 * Generate module link using module ID as a prefix
	 */
	generate: (link: string, params?: Params) => string
	/**
	 * Do a translation using module ID as a prefix
	 */
	t: (key: string, options?: Object | string) => string
	/**
	 * Return just translation key (module ID as a prefix)
	 *
	 * @param key
	 */
	tid: (key: string) => string
}
