import {Params} from "react-router";

/**
 * Common module uses basic CRUD operations and similar stuff; it expects operation one exactly one
 * entity type (for example module for an User, an Invoice and so on, not mixed ones).
 */
export interface ICommonModule {
}

export interface IModuleContext<TModule> {
	/**
	 * Module id, usually could be used for translating stuff.
	 */
	id: string
	/**
	 * Default module icon.
	 */
	icon: JSX.Element
	/**
	 * Custom module stuff.
	 */
	module: TModule
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
