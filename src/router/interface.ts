import {State} from "history";
import {IParams} from "../interface/interface";

export interface INavigateOptions {
	replace?: boolean
	state?: State
}

export interface IRouteCallback {
	/**
	 * @param id id of the route
	 * @param match match rule for the router (react router or whatever)
	 * @param href template for generating links
	 */
	(id: string, match: string, href: string): void
}

export interface IRouterContext {
	routes(callback: (route: IRouteCallback) => void): void

	/**
	 * Register a new route with the given id matching "match" and making href to "href".
	 */
	route: IRouteCallback

	/**
	 * Return match string for the given id or throws an error if unknown.
	 *
	 * @param id
	 */
	match(id: string): string

	/**
	 * Return registered link for the given id; this should not be usually used; better is
	 * {@see self::generate} for generating links with evaluated parameters.
	 *
	 * @param id
	 */
	link(id: string): string

	generate(href: string, params?: IParams): string

	/**
	 * Execute navigation to the given target; internally uses generate method (thus using named routes).
	 */
	useNavigate(options?: INavigateOptions): INavigate
}

export type INavigate = (href: string, params?: IParams) => void
