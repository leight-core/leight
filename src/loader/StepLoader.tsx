import {Steps, StepsProps} from "antd";
import {FC, ReactNode, useState} from "react";
import {IStepStatus} from "./interface";
import {StepLoaderContext} from "./StepLoaderContext";

export interface IStepLoaderProps extends Partial<StepsProps> {
	steps: ReactNode[];
	children?: ReactNode;
}

export const StepLoader: FC<IStepLoaderProps> = ({steps, children, ...props}) => {
	const [current, setCurrent] = useState<number>(0);
	const [status, setStatus] = useState<IStepStatus>("process");
	return <>
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
	</>;
};
