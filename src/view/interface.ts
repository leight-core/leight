import {ReactNode} from "react";
import {IBlockContext} from "../block/interface";
import {INavigate} from "../router/interface";

export interface IViewContext {
	/**
	 * Because there could be more blocking contexts, this one is bound to the
	 * current view.
	 */
	readonly blockContext: IBlockContext
	readonly title?: ReactNode
	setTitle: (title?: ReactNode) => void
}

export interface IDeleteOnSuccess<TData = any> {
	(navigate: INavigate, data: TData): void
}
