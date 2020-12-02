import {Steps} from "antd";
import React, {useState} from "react";
import {IStepStatus, StepLoaderContext} from "./StepLoaderContext";

export const StepLoader = ({steps, children = null, ...props}) => {
	const [current, setCurrent] = useState<number>(0);
	const [status, setStatus] = useState<IStepStatus>("process");
	return (
		current === steps.length ?
			(children || null) :
			<StepLoaderContext.Provider value={{
				current,
				setCurrent,
				next: () => setCurrent(current => current + 1),
				status,
				setStatus,
			}}>
				<Steps
					{...props}
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
				/>
			</StepLoaderContext.Provider>
	);
};
