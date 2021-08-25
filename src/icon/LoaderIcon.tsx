import {Spin, SpinProps} from "antd";
import React, {FC} from "react";

export const LoaderIcon: FC<SpinProps> = props => <Spin size={"large"} {...props}/>;
