import {createGetQuery, ISession} from "@leight-core/leight";

export const useSessionTicketQuery = (link: string) => createGetQuery<undefined, ISession>(link)(undefined);
