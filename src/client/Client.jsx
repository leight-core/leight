import {useState} from "react";
import Events from "../utils/Events";
import {ClientErrorView, LoaderView} from "../view";
import ClientContext from "./ClientContext";
import useClient from "./useClient";

const Client = (
	{
		href = "/client.json",
		children
	}) => {
	const [status, setStatus] = useState();
	const [client, setClient] = useState();
	useClient(
		Events()
			.on("success", client => {
				setClient(client);
				setStatus(true);
			})
			.on("error", () => {
				setStatus(false);
			}),
		href,
	);
	switch (status) {
		case true:
			return <ClientContext.Provider value={client} children={children}/>;
		case false:
			return <ClientErrorView/>;
		default:
			return <LoaderView/>;
	}
};

export default Client;
