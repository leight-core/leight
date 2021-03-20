export interface IClientContext {
	/**
	 * Access to current client data.
	 */
	readonly client: IClient
	/**
	 * Change current client data.
	 *
	 * @param client
	 */
	setClient: (client: IClient) => void
}

/**
 * Client configuration.
 */
export interface IClient {
	/**
	 * An URL where to download Discovery Index.
	 */
	discovery: string
}
