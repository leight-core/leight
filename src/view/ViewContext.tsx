import {createContext} from "react";
import {useContext} from "../utils/useContext";

export interface IViewContext {
	/**
	 * Direct access to blocking state of the layout (**not a bool!**).
	 */
	blocking: number
	/**
	 * Tells if there is requested blocking state of the application.
	 */
	isBlocked: () => boolean
	/**
	 * Updates blocking state of the application; could be called more times as it maintains loader count.
	 */
	block: () => void
	/**
	 * Updates blocking state of the application; could be called more times as it maintains loader count.
	 */
	unblock: () => void
	/**
	 * Set one time block: regardless of number of calls, a view is unblocked just after one unblock() call.
	 *
	 * @param blocked
	 */
	blocked: (blocked?: boolean) => void
}

export const ViewContext = createContext<IViewContext>(null as unknown as IViewContext);

export const useViewContext = () => useContext<IViewContext>(ViewContext, "ViewContext", "Please use CommonView or create context provider!");
