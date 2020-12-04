import {LoginOutlined} from "@ant-design/icons";
import {LoaderStep} from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {Random} from "../../utils/Random";

export const InitialStep = props => {
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<LoginOutlined/>} {...props} onStep={() => setTimeout(() => stepLoaderContext.next(), Random(100, 200))}/>
	);
}
