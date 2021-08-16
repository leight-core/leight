import {Result, ResultProps} from "antd";
import {FC} from "react";
import {LoaderIcon} from "../icon/LoaderIcon";

export interface IResultSpinnerProps extends Partial<ResultProps> {
}

export const ResultSpinner: FC<IResultSpinnerProps> = props => {
	return <Result
		icon={<LoaderIcon/>}
		{...props}
	/>;
};
