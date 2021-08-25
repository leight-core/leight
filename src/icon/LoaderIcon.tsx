import {SyncOutlined} from "@ant-design/icons";
import React, {FC} from "react";
import {IIconProps} from "./interface";

export const LoaderIcon: FC<IIconProps> = props => <SyncOutlined spin {...props}/>;
