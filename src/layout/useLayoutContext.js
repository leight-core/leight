import {useContext} from "react";
import LayoutContext from "./LayoutContext";

const useLayoutContext = () => {
	return useContext(LayoutContext);
};

export default useLayoutContext;
