import axios from "axios";

/**
 * Constant used to set default server request timeout.
 */
export const RequestTimeout = 1000 * 10;

axios.defaults.timeout = RequestTimeout;
