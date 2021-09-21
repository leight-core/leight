import {createGetQuery, IDiscovery} from "@leight-core/leight";

export const useDiscoveryQuery = (link: string) => createGetQuery<undefined, IDiscovery>(link)();
