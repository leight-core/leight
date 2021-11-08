import {SyncOutlined} from "@ant-design/icons";
import {IIconProps} from "@leight-core/leight";
import {FC} from "react";

export const LoaderIcon: FC<IIconProps> = props => <SyncOutlined spin {...props}/>;
