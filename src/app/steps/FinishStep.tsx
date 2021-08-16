import {FC} from "react";
import {HomeIcon} from "../../icon/HomeIcon";
import {ILoaderStepProps, LoaderStep} from "../../loader/LoaderStep";
import {Random} from "../../utils/Random";
import {useAppContext} from "../AppContext";

export interface IFinishStepProps extends Partial<ILoaderStepProps> {
}

export const FinishStep: FC<IFinishStepProps> = props => {
	const appContext = useAppContext();
	return <LoaderStep
		icon={<HomeIcon/>}
		onStep={() => {
			setTimeout(() => appContext.ready(), Random(200, 350));
		}}
		{...props}
	/>;
};
