import {Steps} from "antd";
import {StepsProps} from "antd/lib/steps";
import {FC, useState} from "react";
import {IStepStatus, StepLoaderContext} from "./StepLoaderContext";

export interface IStepLoader extends Partial<StepsProps> {
	steps: JSX.Element[]
	children?: JSX.Element
}

export const StepLoader: FC<IStepLoader> = ({steps, children = <></>, ...props}) => {
	const [current, setCurrent] = useState<number>(0);
	const [status, setStatus] = useState<IStepStatus>("process");
	return (
		current === steps.length ?
			children :
			<StepLoaderContext.Provider value={{
				current,
				setCurrent,
				next: () => setCurrent(current => current + 1),
				status,
				setStatus,
			}}>
				<Steps
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "50vh",
						width: "75vw",
					}}
					current={current}
					status={status}
					children={steps.map(step => step)}
					{...props}
				/>
			</StepLoaderContext.Provider>
	);
};
