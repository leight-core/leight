import {IQueryParams, useDeletePromise, useGetPromise, usePatchPromise, usePostPromise, usePutPromise, wrapMutation, wrapQuery} from "@leight-core/leight";

export function createPutQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => usePutPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPutMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => usePutPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPatchQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => usePatchPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPatchMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => usePatchPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPostQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => usePostPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createPostMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => usePostPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createGetQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => useGetPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createGetMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => useGetPromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createDeleteQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => useDeletePromise<TQuery, TRequest, TResponse>(link, request, query, config));
}

export function createDeleteMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query, options, config) => useDeletePromise<TQuery, TRequest, TResponse>(link, request, query, config));
}
