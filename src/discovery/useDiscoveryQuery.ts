import {createGetQuery, IDiscovery} from "@leight-core/leight";

export const useDiscoveryQuery = (link: string) => createGetQuery<undefined, IDiscovery>(link)(undefined, undefined, {
	/**
	 * Should be fresh for 60 minutes
	 */
	staleTime: 1000 * 60 * 60 * 60,
});
