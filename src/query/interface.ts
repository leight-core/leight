import {UseQueryOptions} from "react-query/types/react/types";
import {IPageRequest, IPageResponse} from "../data";
import {IRequestCallback} from "../request";

export type IQueryParams = NodeJS.Dict<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null> | undefined;

export interface IQueryCallback<TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = void, TFilter = void> extends IRequestCallback<TQuery, IPageRequest<TOrderBy, TFilter>, IPageResponse<TItem>> {
}

export type IQueryOptions<TResponse> = Omit<UseQueryOptions<TResponse, any, TResponse, any>, "queryKey" | "queryFn">
