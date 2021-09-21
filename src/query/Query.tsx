import {PropsWithChildren, ReactNode} from "react";
import {ResultSpinner} from "../component";
import {IQueryHookCallback, IQueryOptions, IQueryParams} from "./interface";

export interface IQueryProps<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	useQuery: IQueryHookCallback<TQuery, TRequest, TResponse>;
	request: TRequest;
	query?: TQuery;
	options?: IQueryOptions<TResponse>;
	/**
	 * Actual children rendered when data are available.
	 */
	children?: (data: TResponse) => ReactNode;
	/**
	 * Placeholder rendered when data are not available.
	 */
	placeholder?: () => ReactNode;
}

export const Query = <TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(
	{
		useQuery,
		request,
		query,
		options,
		children = () => null,
		placeholder = () => <ResultSpinner/>,
	}: PropsWithChildren<IQueryProps<TQuery, TRequest, TResponse>>) => {
	const result = useQuery(request, query, options);
	return <>
		{result.isSuccess ? children(result.data) : placeholder()}
	</>;
};
