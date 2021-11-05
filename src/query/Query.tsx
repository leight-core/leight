import {PropsWithChildren, ReactNode, useEffect} from "react";
import {ResultSpinner} from "../component";
import {IEntityContext} from "../entity";
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
	context?: IEntityContext<TResponse> | null;
}

export const Query = <TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(
	{
		useQuery,
		request,
		query,
		options,
		children = () => null,
		context,
		placeholder = () => <ResultSpinner/>,
	}: PropsWithChildren<IQueryProps<TQuery, TRequest, TResponse>>) => {
	const result = useQuery(request, query, options);
	useEffect(() => {
		context && result.data && context.update(result.data);
	}, [result.data]);
	return <>
		{context ?
			(context.entity ? children(context.entity) : placeholder()) :
			(result.isSuccess ? children(result.data) : placeholder())
		}
	</>;
};
