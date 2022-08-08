import {IMutationHookCallback, IMutationOptions, IPromiseMutationCallback, IPromiseQueryCallback, IQueryHookCallback, IQueryOptions, IQueryParams} from "@leight-core/leight";
import {createSyncStoragePersister} from "@tanstack/query-sync-storage-persister";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {persistQueryClient} from "@tanstack/react-query-persist-client";
import {useEffect} from "react";

/**
 * @param cacheTime cache time in hours
 */
export function createQueryClient(cacheTime = 24): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: 1000 * 60 * 60 * cacheTime,
			}
		}
	});
}

export function useQueryPersistence(queryClient: QueryClient, name: string, buster?: string, enable: boolean = process.env.NEXT_PUBLIC_CACHE === "true"): boolean {
	if (!enable) {
		return enable;
	}
	useEffect(() => {
		persistQueryClient({
			queryClient,
			persister: createSyncStoragePersister({storage: window.sessionStorage}),
			buster: buster || process.env.BUILD_ID,
		});
	}, []);
	return enable;
}

export function wrapQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, promise: IPromiseQueryCallback<TQuery, TRequest, TResponse>): IQueryHookCallback<TQuery, TRequest, TResponse> {
	return (request?: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>) => {
		return useQuery([link, {query, request}], promise(link, query, request), options);
	};
}

export function wrapMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, promise: IPromiseMutationCallback<TQuery, TRequest, TResponse>): IMutationHookCallback<TQuery, TRequest, TResponse> {
	return (query?: TQuery, options?: IMutationOptions<TResponse, any, TRequest, undefined>) => {
		return useMutation(["mutation", link, {query}], promise(link, query), options);
	};
}
