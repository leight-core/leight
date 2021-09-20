import {createGetHook, ITranslations} from "@leight-core/leight";

export const useTranslationQuery = (link: string) => createGetHook<undefined, ITranslations>(link)();
