import {IQueryParams, useDeletePromise, useGetPromise, usePatchPromise, usePostPromise, usePutPromise, wrapMutation, wrapQuery} from "@leight-core/leight";

export function createPutQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, config) => usePutPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPutMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, config) => usePutPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPatchQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, config) => usePatchPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPatchMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, config) => usePatchPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPostQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, config) => usePostPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPostMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, config) => usePostPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createGetQuery<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapQuery<TQuery, void, TResponse>(link, (link, request = undefined, query, config) => useGetPromise<TQuery, void, TResponse>(link, query, config));
}

export function createGetMutation<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapMutation<TQuery, void, TResponse>(link, (link, request = undefined, query, config) => useGetPromise<TQuery, void, TResponse>(link, query, config));
}

export function createDeleteQuery<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapQuery<TQuery, void, TResponse>(link, (link, request = undefined, query, config) => useDeletePromise<TQuery, void, TResponse>(link, query, config));
}

export function createDeleteMutation<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapMutation<TQuery, void, TResponse>(link, (link, request = undefined, query, config) => useDeletePromise<TQuery, void, TResponse>(link, query, config));
}
