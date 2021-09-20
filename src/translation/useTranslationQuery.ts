import {createGetHook} from "@leight-core/leight";

export const useTranslationQuery = (link: string) => createGetHook(link)();
