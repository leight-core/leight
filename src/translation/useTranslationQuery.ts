import {createGetQuery, ITranslations} from "@leight-core/leight";

export const useTranslationQuery = (link: string) => createGetQuery<undefined, ITranslations>(link)();
