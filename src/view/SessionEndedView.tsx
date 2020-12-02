import {useEffect} from "react";
import {useAppContext} from "../app/AppContext";

export const SessionEndedView = () => {
	const appContext = useAppContext();
	useEffect(() => {
		appContext.logout();
		// eslint-disable-next-line
	}, []);
	return null;
};
