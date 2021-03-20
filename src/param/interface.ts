import {IParams} from "../interface/interface";

export interface IParamContext {
	/**
	 * An access to current params of the menu (read only).
	 */
	readonly params?: IParams
	/**
	 * When a menu needs generate a link, params are the way how to provide it
	 * to the menu items.
	 *
	 * If update is true, re-render will be forced. Default to false.
	 */
	setParams: (params?: IParams, update?: boolean) => void
	reload: () => void
}
