import {TFunction} from "i18next";
import {createContext} from "react";
import {IRouterContext} from "../router/interface";
import {useContext} from "../utils/useContext";
import {ICommonModule, IModuleContext} from "./interface";

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
 * @param routerContext
 * @param module
 * @param t
 */
export const createModule = <TModule = ICommonModule>(id: string, icon: JSX.Element, t: TFunction, routerContext: IRouterContext, module: TModule): IModuleContext<TModule> => ({
	id,
	icon,
	module,
	generate: (link, params) => routerContext.generate(id + "." + link, params),
	t: (key, options) => t(id + "." + key, options),
	tid: key => id + "." + key,
});
