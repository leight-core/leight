import React, { useContext } from "react";

/**
 * @typedef {Object} ModuleContextType
 * @property {string} id Module id, usually could be used for translating stuff.
 * @property {Object} icon Default module icon.
 * @property {FetchHookType} [fetch] Default module's data fetch method (assumes module covers just one piece of the application).
 */

/**
 * Access to individual context of an application's module (if used).
 *
 * @type {React.Context<ModuleContextType>}
 */
export const ModuleContext = React.createContext(null);

/**
 * Returns current application module context. What could be hidden inside of a module context very depends
 * on the implementing module as this cannot have clear interface.
 *
 * The reason for common ModuleContext is the ability to consolidate some common functions under one interface
 * (for example providing effect to fetch data, paging, ...).
 *
 * Module in general expects one covered Entity or functionality, for example Users, Invoices and so.
 *
 * @return {ModuleContextType}
 */
export const useModuleContext = () => useContext(ModuleContext);
