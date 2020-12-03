import {createContext, useContext} from "react";

export interface IModuleContext<TModule = any> {
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
}

/**
 * Access to individual context of an application's module (if used).
 */
export const ModuleContext = createContext<IModuleContext>(null);

/**
 * Returns current application module context. What could be hidden inside of a module context very depends
 * on the implementing module as this cannot have clear interface.
 *
 * The reason for common ModuleContext is the ability to consolidate some common functions under one interface
 * (for example providing effect to fetch data, paging, ...).
 *
 * Module in general expects one covered Entity or functionality, for example Users, Invoices and so.
 */
export const useModuleContext = <TModule = any>() => useContext<IModuleContext<TModule>>(ModuleContext);
