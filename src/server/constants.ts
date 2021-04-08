/**
 * Constant used to set default server request timeout.
 */
export const ServerRequestTimeout = 1000 * 10;

export const ServerEventPriority = {
	Request: {
		before: 750,
		request: 1000,
		after: 1250,
	}
};
