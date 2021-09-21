import axios from "axios";

/**
 * Constant used to set default server request timeout.
 */
export const RequestTimeout = 1000 * 10;

axios.defaults.timeout = RequestTimeout;

export * from "./interface";
export * from "./LinkContext";
export * from "./LinkContextProvider";
export * from "./LinkTo";
