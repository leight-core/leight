import {NextApiRequest, NextApiResponse} from "next";

export type IQueryParams = { [key: string]: string | string[] } | undefined;

export interface INextApiRequest<TQuery extends IQueryParams, TRequest> extends Omit<NextApiRequest, "query"> {
	query: TQuery;
	body: TRequest;
}

export type IEndpoint<TQuery extends IQueryParams, TRequest, TResponse> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;
