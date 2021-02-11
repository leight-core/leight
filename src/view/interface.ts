import {IBlockContext} from "../block/interface";
import {INavigate} from "../router/interface";

export interface IViewContext {
	/**
	 * Because there could be more blocking contexts, this one is bound to the
	 * current view.
	 */
	blockContext: IBlockContext
}

export type IDeleteOnSuccess<TData extends Object> = (navigate: INavigate, data: TData) => void
