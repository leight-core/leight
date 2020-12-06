import {TFunction} from "i18next";
import {createContext} from "react";
import {Params} from "react-router";
import {generate} from "../router/router";
import {OnFetchPageType} from "../server/createFetchPage";
import {useContext} from "../utils/useContext";

/**
 * Common module uses basic CRUD operations and similar stuff; it expects operation one exactly one
 * entity type (for example module for an User, an Invoice and so on, not mixed ones).
 */
export interface ICommonModule {
	/**
	 * Callback used for fetching page of items (usually used in tables/lists).
	 */
	page: OnFetchPageType
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

/**
 * Access to individual context of an application's module (if used).
 */
export const ModuleContext = createContext<IModuleContext<any>>(null as unknown as IModuleContext<any>);

/**
 * Returns current application module context. What could be hidden inside of a module context very depends
 * on the implementing module as this cannot have clear interface.
 *
 * The reason for common ModuleContext is the ability to consolidate some common functions under one interface
 * (for example providing effect to fetch data, paging, ...).
 *
 * Module in general expects one covered Entity or functionality, for example Users, Invoices and so.
 */
export const useModuleContext = <TModule = ICommonModule>() => useContext<IModuleContext<TModule>>(ModuleContext, "ModuleContext");

/**
 * Create a new module context for Providers.
 *
 * @param id
 * @param icon
 * @param module
 * @param t
 */
export const createModule = <TModule = ICommonModule>(id: string, icon: JSX.Element, t: TFunction, module: TModule): IModuleContext<TModule> => ({
	id,
	icon,
	module,
	generate: (link, params) => generate(id + "." + link, params),
	t: (key, options) => t(id + "." + key, options),
	tid: key => id + "." + key,
});
