import {IQueryParams, useDeletePromise, useGetPromise, usePatchPromise, usePostPromise, usePutPromise, wrapMutation, wrapQuery} from "@leight-core/leight";

export function createPutQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query) => usePutPromise<TQuery, TRequest, TResponse>(link, request, query));
}

export function createPutMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query) => usePutPromise<TQuery, TRequest, TResponse>(link, request, query));
}

export function createPatchQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query) => usePatchPromise<TQuery, TRequest, TResponse>(link, request, query));
}

export function createPatchMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query) => usePatchPromise<TQuery, TRequest, TResponse>(link, request, query));
}

export function createPostQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapQuery<TQuery, TRequest, TResponse>(link, (link, request, query) => usePostPromise<TQuery, TRequest, TResponse>(link, request, query));
}

export function createPostMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string) {
	return wrapMutation<TQuery, TRequest, TResponse>(link, (link, request, query) => usePostPromise<TQuery, TRequest, TResponse>(link, request, query));
}

export function createGetQuery<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapQuery<TQuery, void, TResponse>(link, (link, request = undefined, query) => useGetPromise<TQuery, void, TResponse>(link, query));
}

export function createGetMutation<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapMutation<TQuery, void, TResponse>(link, (link, request = undefined, query) => useGetPromise<TQuery, void, TResponse>(link, query));
}

export function createDeleteQuery<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapQuery<TQuery, void, TResponse>(link, (link, request = undefined, query) => useDeletePromise<TQuery, void, TResponse>(link, query));
}

export function createDeleteMutation<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string) {
	return wrapMutation<TQuery, void, TResponse>(link, (link, request = undefined, query) => useDeletePromise<TQuery, void, TResponse>(link, query));
}
