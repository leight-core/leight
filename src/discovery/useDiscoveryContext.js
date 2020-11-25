import {useContext} from "react";
import DiscoveryContext from "./DiscoveryContext";

const useDiscoveryContext = () => {
	return useContext(DiscoveryContext);
};

export default useDiscoveryContext;
