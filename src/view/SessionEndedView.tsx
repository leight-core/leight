import {useEffect} from "react";
import {useSessionContext} from "../session/SessionContext";

export const SessionEndedView = () => {
	const sessionContext = useSessionContext();
	useEffect(() => {
		sessionContext.events.handler("logout")();
		// eslint-disable-next-line
	}, []);
	return null;
};
