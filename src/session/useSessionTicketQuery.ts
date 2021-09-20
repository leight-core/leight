import {createGetHook} from "@leight-core/leight";

export const useSessionTicketQuery = (link: string) => createGetHook(link)();
