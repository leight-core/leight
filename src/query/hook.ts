import {IMutationHookCallback, IQueryHookCallback, IQueryParams, useDeletePromise, useGetPromise, usePatchPromise, usePostPromise, usePutPromise, wrapMutation, wrapQuery} from "@leight-core/leight";

export function createPutQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IQueryHookCallback<TQuery, TRequest, TResponse> {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, query, request?: TRequest) => usePutPromise<TQuery, TRequest, TResponse>(link, query, request));
}

export function createPutMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IMutationHookCallback<TQuery, TRequest, TResponse> {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, query) => usePutPromise<TQuery, TRequest, TResponse>(link, query));
}

export function createPatchQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IQueryHookCallback<TQuery, TRequest, TResponse> {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, query, request?: TRequest) => usePatchPromise<TQuery, TRequest, TResponse>(link, query, request));
}

export function createPatchMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IMutationHookCallback<TQuery, TRequest, TResponse> {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, query) => usePatchPromise<TQuery, TRequest, TResponse>(link, query));
}

export function createPostQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IQueryHookCallback<TQuery, TRequest, TResponse> {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, query, request?: TRequest) => usePostPromise<TQuery, TRequest, TResponse>(link, query, request));
}

export function createPostMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IMutationHookCallback<TQuery, TRequest, TResponse> {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, query) => usePostPromise<TQuery, TRequest, TResponse>(link, query));
}

export function createGetQuery<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IQueryHookCallback<TQuery, void, TResponse> {
	return wrapQuery<TQuery, void, TResponse>(link, (link, query) => useGetPromise<TQuery, TResponse>(link, query));
}

export function createGetMutation<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IMutationHookCallback<TQuery, void, TResponse> {
	return wrapMutation<TQuery, void, TResponse>(link, (link, query) => useGetPromise<TQuery, TResponse>(link, query));
}

export function createDeleteQuery<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IQueryHookCallback<TQuery, void, TResponse> {
	return wrapQuery<TQuery, void, TResponse>(link, (link, query) => useDeletePromise<TQuery, TResponse>(link, query));
}

export function createDeleteMutation<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IMutationHookCallback<TQuery, void, TResponse> {
	return wrapMutation<TQuery, void, TResponse>(link, (link, query) => useDeletePromise<TQuery, TResponse>(link, query));
}
