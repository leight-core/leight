export interface IClientContext {
	/**
	 * Access to current client data.
	 */
	readonly client: IClient;
}

/**
 * Client configuration.
 */
export interface IClient {
	/**
	 * An URL where to download Discovery Index.
	 */
	readonly discovery: string;
}
