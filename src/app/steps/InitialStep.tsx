import {LoginOutlined} from "@ant-design/icons";
import {FC} from "react";
import {ILoaderStepProps, LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {Random} from "../../utils/Random";

export interface IInitialStepProps extends Partial<ILoaderStepProps> {
}

export const InitialStep: FC<IInitialStepProps> = props => {
	const stepLoaderContext = useStepLoaderContext();
	return <LoaderStep
		icon={<LoginOutlined/>}
		onStep={() => {
			setTimeout(() => stepLoaderContext.next(), Random(100, 200));
		}}
		{...props}
	/>;
};
