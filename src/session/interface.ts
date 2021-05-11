import {IEventHandlers, IEvents} from "../event/interface";

export interface ISessionContext<TSession extends ISession = ISession> {
	/**
	 * Directly access current session data.
	 */
	readonly session: TSession
	/**
	 * Access to current session events.
	 */
	events: ISessionEvents<TSession>
}

export interface ISession {
	/**
	 * Current site an user is logged in (even public).
	 */
	site: string
}

export type ISessionEventTypes = "ticket" | "logout";

export interface ISessionEventHandlers<TSession extends ISession = any> extends IEventHandlers {
	ticket: (session: TSession) => void
	logout: () => void
}

export interface ISessionEvents<TSession extends ISession> extends IEvents<ISessionEventTypes, ISessionEventHandlers<TSession>> {
}
