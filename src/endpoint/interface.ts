import {IQueryResult} from "@leight-core/leight";
import {NextApiRequest, NextApiResponse} from "next";

export type IQueryParams = { [key: string]: string | string[] } | void;

export interface INextApiRequest<TQuery extends IQueryParams, TRequest> extends Omit<NextApiRequest, "query"> {
	query: TQuery;
	body: TRequest;
}

/**
 * Generic endpoint; SDK generates as POST by default.
 */
export type IEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * When fetching an individual item, done by GET.
 */
export type IFetchEndpoint<TRequest, TResponse, TQuery extends IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;
/**
 * When fetching a list of items (arrayed by default), done by GET.
 */
export type IListEndpoint<TRequest, TResponse, TQuery extends IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse[]>) => void;

/**
 * Mutation endpoint is a general endpoint used to do some server-side effect (some updated data or so).
 *
 * Defaults to POST.
 */
export type IMutationEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TRequest, TResponse, TQuery>;
/**
 * Good old creation endpoint.
 *
 * Defaults by POST.
 */
export type ICreateEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TRequest, TResponse, TQuery>;
/**
 * Endpoint used to partially update data
 *
 * Defaults to PATCH.
 */
export type IPatchEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TRequest, TResponse, TQuery>;
/**
 * Endpoint used to query data on a server.
 *
 * Defaults to POST.
 */
export type IQueryEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TRequest, IQueryResult<TResponse>, TQuery>;

/**
 * Endpoint used to remove something.
 *
 * Defaults to DELETE.
 */
export type IDeleteEndpoint<TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<void, TResponse, TQuery>;
