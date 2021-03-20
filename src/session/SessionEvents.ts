import {Events} from "../event/Events";
import {ISession, ISessionEventHandlers, ISessionEventTypes} from "./interface";

export const SessionEvents = <TSession extends ISession = ISession>() => Events<ISessionEventTypes, ISessionEventHandlers<TSession>>();
