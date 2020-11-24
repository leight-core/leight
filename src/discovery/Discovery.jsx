import { useState } from "react";
import { useClientContext } from "../client";
import { Events } from "../utils";
import {
	DiscoveryErrorView,
	LoaderView
} from "../view";
import DiscoveryContext from "./DiscoveryContext";
import useDiscovery from "./useDiscovery";

const Discovery = ({children}) => {
	const [status, setStatus]       = useState();
	const [discovery, setDiscovery] = useState();
	const client                    = useClientContext();

	if (!client) {
		throw new Error(`Missing ClientContext (use Client component).`);
	}

	function link(id) {
		if (!discovery[id]) {
			throw new Error(`Cannot resolve link from Discovery for linkId [${id}]`);
		}
		return discovery[id].link;
	}

	useDiscovery(
		client.discovery,
		Events()
			.on("success", discovery => {
				setDiscovery(discovery);
				setStatus(true);
			})
			.on("catch", () => {
				setStatus(false);
			})
	);

	switch (status) {
		case true:
			return (
				<DiscoveryContext.Provider
					value={{
						discovery,
						link,
						fetch: (id, uuid, replace) => link(id).replace(replace, uuid),
						page:  (id, page, name = null, param = null) => name ? link(id).replace("{" + name + "}", param).replace("{page}", page) : link(id).replace("{page}", page),
					}}
					children={children}
				/>
			);
		case false:
			return <DiscoveryErrorView/>;
		default:
			return <LoaderView/>;
	}
};

export default Discovery;
