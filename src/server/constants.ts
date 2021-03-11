/**
 * Constant used to set default server request timeout.
 */
export const ServerRequestTimeout = 10000;

/**
 * Priority of physical serve request in Events; this could be used to hook around it.
 */
export const ServerRequestPriority = 1000;
/**
 * Just a constant to hook before physical server request; could be used to block request
 * at all.
 */
export const ServerBeforeRequestPriority = ServerRequestPriority - 250;
/**
 * Lowest server priority called after physical server request.
 */
export const ServerAfterRequestPriority = ServerRequestPriority + 250;
