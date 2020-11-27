import React, {useContext} from "react";

/**
 * @typedef {function} useEnableFullscreenType
 * @param {boolean} [enable=true] Enable or disable fullscreen mode.
 * @param {boolean} [restore=true] Says if original state should be restored when a component is unmounted.
 */
/**
 * @typedef {function} useMenuSelectType
 * @param {string} select Name of the selected menu key.
 */
/**
 * @typedef {function} setCollapsedType
 * @param {boolean} collapsed Switch collapsed state of the layout.
 */
/**
 * @typedef {function} setDataType
 * @param {*} data Set any king of data.
 */
/**
 * @typedef {Object} LayoutContextType
 * @property {boolean} fullscreen Is current layout switched to fullscreen mode (meant more like full-width mode).
 * @property {useEnableFullscreenType} useEnableFullscreen Switch current fullscreen flag by an Effect.
 * @property {string[]} selectMenu Current selected menu item(s).
 * @property {useMenuSelectType} useMenuSelect Select menu item using an Effect.
 * @property {boolean} collapsed Is the sider collapsed?
 * @property {setCollapsedType} setCollapsed Directly set collapsed state of the layout.
 * @property {number} loading Direct access to loading state of the layout (**not a bool!**)
 * @property {function(): boolean} isLoading Tells if there is requested loading state of the application.
 * @property {function} loadingStart Updates loading state of the application; could be called more times as it maintains loader count.
 * @property {function} loadingFinish Updates loading state of the application; could be called more times as it maintains loader count.
 * @property {*} data Access to current arbitrary data on the layout; this is the place where some loaded piece of something could be hidden.
 * @property {setDataType} setData Direct access to state function setting arbitrary data on the layout.
 */

/**
 * Common Layout context; you should **not** use this directly, see {@link useLayoutContext}.
 *
 * @type {React.Context<LayoutContextType>}
 */
export const LayoutContext = React.createContext(null);

/**
 * Access to the current Layout context.
 *
 * @return {LayoutContextType}
 */
export const useLayoutContext = () => useContext(LayoutContext);
