import {createGetQuery, IClient} from "@leight-core/leight";

export const useClientConfigQuery = (link: string) => createGetQuery<undefined, IClient>(link)(undefined, undefined, {
	/**
	 * Should be fresh for 60 minutes
	 */
	staleTime: 1000 * 60 * 60 * 60,
});
