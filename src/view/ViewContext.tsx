import {createContext, useContext} from "react";

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
}

export const ViewContext = createContext<IViewContext>(null as unknown as IViewContext);

export const useViewContext = () => {
	const context = useContext<IViewContext>(ViewContext);
	if (!context) {
		throw new Error("You requested [ViewContext] but non is available. Please use CommonView or create context provider!");
	}
	return context;
};
