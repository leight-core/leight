import {HomeIcon} from "../../icon/HomeIcon";
import {LoaderStep} from "../../loader/LoaderStep";
import {Random} from "../../utils/Random";
import {useAppContext} from "../AppContext";

export const FinishStep = props => {
	const appContext = useAppContext();
	return (
		<LoaderStep icon={<HomeIcon/>} {...props} onStep={() => {
			setTimeout(() => appContext.ready(), Random(200, 350));
		}}/>
	);
};
