import {AntDesignOutlined} from "@ant-design/icons";
import {Centered} from "@leight-core/leight";
import {Card, Col, Divider, Layout, LayoutProps, Row} from "antd";
import {FC, ReactNode} from "react";

export interface ILoaderLayoutProps extends Partial<LayoutProps> {
	icon?: ReactNode;
}

export const LoaderLayout: FC<ILoaderLayoutProps> = ({icon, children, ...props}) => {
	return <Layout style={{height: "100vh"}} {...props}>
		<Row justify={"center"} align={"middle"}>
			<Col span={24}>
				<Card
					title={icon || <AntDesignOutlined/>}
					headStyle={{textAlign: "center", padding: "2em 0"}}
				>
					<Centered>
						{children}
					</Centered>
					<Divider/>
					<Centered>
						v[{process.env.NEXT_PUBLIC_VERSION}]
					</Centered>
				</Card>
			</Col>
		</Row>
	</Layout>;
};
