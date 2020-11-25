import {useState} from "react";
import useDiscoveryContext from "../discovery/useDiscoveryContext";
import Server from "../server/Server";
import Events from "../utils/Events";
import ResolveSession from "./ResolveSession";
import SessionContext from "./SessionContext";

const DefaultState = {
	site: "common",
};

const Session = (
	{
		sites,
		link = "common.user.login"
	}) => {
	const [session, setSession] = useState(DefaultState);
	const discoveryContext = useDiscoveryContext();
	return (
		<SessionContext.Provider
			value={{
				session,
				open: session => setSession(session),
				close: () => {
					setSession(DefaultState);
					Server.httpDelete(
						discoveryContext.link(link),
						// if we're already logged out, do nothing (as internal stuff could handle 401 errors)
						Events()
							.on("http-401", () => false),
					);
				},
			}}
			children={<ResolveSession link={link} sites={sites}/>}
		/>
	);
};

export default Session;
