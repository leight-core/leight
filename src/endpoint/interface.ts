import {IQueryResult} from "@leight-core/leight";
import {NextApiRequest, NextApiResponse} from "next";

export type IQueryParams = { [key: string]: string | string[] } | void;

export interface INextApiRequest<TQuery extends IQueryParams, TRequest> extends Omit<NextApiRequest, "query"> {
	query: TQuery;
	body: TRequest;
}

export type IEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Mutation endpoint is a general endpoint used to do some server-side effect (some updated data or so).
 */
export type IMutationEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TRequest, TResponse, TQuery>;
/**
 * Good old creation endpoint.
 */
export type ICreateEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TRequest, TResponse, TQuery>;
/**
 * Endpoint used to partially update data
 */
export type IPatchEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TRequest, TResponse, TQuery>;
/**
 * Endpoint used to query data on a server
 */
export type IQueryEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TRequest, IQueryResult<TResponse>, TQuery>;
