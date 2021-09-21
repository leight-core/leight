import {createGetQuery, IClient} from "@leight-core/leight";

export const useClientConfigQuery = (link: string) => createGetQuery<undefined, IClient>(link)(undefined);
