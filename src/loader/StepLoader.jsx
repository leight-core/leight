import {Steps} from "antd";
import React, {useState} from "react";
import {StepLoaderContext} from "./StepLoaderContext";

const StepLoader = props => {
		const [current, setCurrent] = useState(0);
		const [status, setStatus] = useState("process");
		const next = () => setCurrent(current => current + 1);
		return (
			<StepLoaderContext.Provider value={{
				current,
				setCurrent,
				next,
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
				/>
			</StepLoaderContext.Provider>
		);
	}
;

export default StepLoader;
