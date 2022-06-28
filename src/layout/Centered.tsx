import {Col, Row} from "antd";
import React, {FC, PropsWithChildren} from "react";

export type ICenteredProps = PropsWithChildren<{
	span?: number;
}>;

export const Centered: FC<ICenteredProps> = (
	{
		children,
		span
	}) => {
	return <Row justify={"center"}>
		<Col span={span}>
			{children}
		</Col>
	</Row>;
};
