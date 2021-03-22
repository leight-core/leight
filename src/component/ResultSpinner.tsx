import {Result, ResultProps} from "antd";
import {Spinner} from "../icon/Spinner";

export interface IResultSpinnerProps extends Partial<ResultProps> {
}

export const ResultSpinner = (props) => {
	return (
		<Result
			icon={<Spinner/>}
			{...props}
		/>
	);
};
