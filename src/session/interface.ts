export interface ISessionContext<TSession extends ISession = ISession> {
	/**
	 * Directly access current session data.
	 */
	readonly session: TSession;
}

export interface IRole {
	readonly id: string;
	readonly name: string;
}

/**
 * A very bare user without any irrelevant information for the library:
 * just roles to enable automagic checks on Pages
 */
export interface IUser {
	readonly id: string | null;
	readonly roles: IRole[];
	/**
	 * Current site an user is logged in (even public).
	 */
	readonly site: string;
}

export type ICurrentUser = Omit<IUser, "id"> & { id: string };

export interface ISession {
	/**
	 * Default simple user with a bare minimum needed to run the library.
	 */
	user: IUser;
}
