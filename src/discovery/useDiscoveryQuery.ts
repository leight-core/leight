import {createGetHook} from "@leight-core/leight";

export const useDiscoveryQuery = (link: string) => createGetHook(link)();
