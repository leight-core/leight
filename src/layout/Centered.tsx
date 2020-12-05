import {Col, Row} from "antd";
import React, {FC} from "react";

export interface ICentered {
	span?: number
}

export const Centered: FC<ICentered> = (
	{
		children,
		span
	}) => {
	return (
		<Row justify={"center"}>
			<Col span={span}>
				{children}
			</Col>
		</Row>
	);
};
