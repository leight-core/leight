import {Checkbox} from "antd";
import {FC} from "react";

export interface IPreviewBoolProps {
	bool?: boolean | null;
}

export const PreviewBool: FC<IPreviewBoolProps> = ({bool}) => {
	return <>{(bool !== undefined && bool !== null) ? <Checkbox disabled checked={bool}/> : "-"}</>;
};
