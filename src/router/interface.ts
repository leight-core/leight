import {Params} from "react-router";

export interface IRouterContext {
	params: Params

	/**
	 * Set current params to be available through whole Router Context.
	 *
	 * @param params
	 */
	setParams(params: Params)

	routes(callback: (route: (id: string, match: string, href: string) => void) => void): void

	/**
	 * Register a new route with the given id matching "match" and making href to "href".
	 *
	 * @param id id of the route
	 * @param match match rule for the router (react router or whatever)
	 * @param href template for generating links
	 */
	route(id: string, match: string, href: string): void

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

	generate(href: string, params?: Params): string

	/**
	 * Execute navigation to the given target.
	 */
	useNavigate(): INavigate
}

export type INavigate = (href: string, params?: Params) => void
