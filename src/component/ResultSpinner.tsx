import {Result, ResultProps} from "antd";
import {LoaderIcon} from "../icon/LoaderIcon";

export interface IResultSpinnerProps extends Partial<ResultProps> {
}

export const ResultSpinner = props => {
	return <Result
		icon={<LoaderIcon/>}
		{...props}
	/>;
};
