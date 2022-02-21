import {NextApiRequest, NextApiResponse} from "next";

export type IQueryParams = { [key: string]: string | string[] } | void;

export interface INextApiRequest<TQuery extends IQueryParams, TRequest> extends Omit<NextApiRequest, "query"> {
	query: TQuery;
	body: TRequest;
}

export type IEndpoint<TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;
