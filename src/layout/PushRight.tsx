import {Col, Row} from "antd";
import React, {FC} from "react";

export interface IPushRight {
	span?: number
}

export const PushRight: FC<IPushRight> = (
	{
		children,
		span
	}) => {
	return (
		<Row justify={"end"}>
			<Col span={span}>
				{children}
			</Col>
		</Row>
	);
};
