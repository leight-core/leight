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

/**
 * A very bare user without any irrelevant information for the library:
 * just roles to enable automagic checks on Pages
 */
export interface IUser {
	roles: string[];
	/**
	 * Current site an user is logged in (even public).
	 */
	site: string;
}

export interface ISession {
	/**
	 * Default simple user with a bare minimum needed to run the library.
	 */
	user: IUser;
}
