import {Checkbox} from "antd";
import {FC} from "react";

export interface IPreviewBoolProps {
	bool?: boolean;
}

export const PreviewBool: FC<IPreviewBoolProps> = ({bool}) => {
	return <>{bool !== undefined ? <Checkbox disabled checked={bool}/> : "-"}</>;
};
