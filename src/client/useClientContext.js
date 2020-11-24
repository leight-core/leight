import { useContext } from "react";
import ClientContext from "./ClientContext";

const useClientContext = () => {
	return useContext(ClientContext);
};

export default useClientContext;
