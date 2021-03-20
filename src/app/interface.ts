/**
 * General stuff related to the application.
 */
export interface IAppContext<TSession = any> {
	isReady: boolean
	/**
	 * When called, application is switched to ready state (should be called once per full page load); everything needed for proper application run must be... ready!
	 */
	ready: () => void
}

export type ISites = { [key: string]: () => JSX.Element }
