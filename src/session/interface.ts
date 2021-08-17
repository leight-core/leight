export interface ISessionContext<TSession extends ISession = ISession> {
	/**
	 * Directly access current session data.
	 */
	readonly session: TSession;
	/**
	 * Set current session.
	 */
	setSession: (session: TSession) => void;
}

export interface ISession {
	/**
	 * Current site an user is logged in (even public).
	 */
	site: string;
}
