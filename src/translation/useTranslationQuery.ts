import {createGetQuery, ITranslations} from "@leight-core/leight";

export const useTranslationQuery = (link: string) => createGetQuery<undefined, ITranslations>(link)(undefined, undefined, {
	/**
	 * Should be fresh for 60 minutes
	 */
	staleTime: 1000 * 60 * 60 * 10,
});
