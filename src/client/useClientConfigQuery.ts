import {createGetHook, IClient} from "@leight-core/leight";

export const useClientConfigQuery = (link: string) => createGetHook<undefined, IClient>(link)();
