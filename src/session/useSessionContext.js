import { useContext } from "react";
import SessionContext from "./SessionContext";

const useSessionContext = () => {
	return useContext(SessionContext);
};

export default useSessionContext;
