import {Params} from "react-router";
import {IOnFetchPage} from "../server/interface";

/**
 * Common module uses basic CRUD operations and similar stuff; it expects operation one exactly one
 * entity type (for example module for an User, an Invoice and so on, not mixed ones).
 */
export interface ICommonModule {
	/**
	 * Callback used for fetching page of items (usually used in tables/lists).
	 */
	page: IOnFetchPage
}

/**
 * This is a marker interface for modules not using CRUD or other stuff.
 */
export interface ISimpleModule {
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
