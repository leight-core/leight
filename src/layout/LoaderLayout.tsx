import {AntDesignOutlined} from "@ant-design/icons";
import {Centered, ILoaderProps, Loader} from "@leight-core/leight";
import {Card, Col, Divider, Layout, Row} from "antd";
import {FC, ReactNode} from "react";

export interface ILoaderLayoutProps extends ILoaderProps {
	logo?: ReactNode;
}

export const LoaderLayout: FC<ILoaderLayoutProps> = ({logo, ...props}) => {
	return <Layout style={{height: "100vh"}}>
		<Row justify={"center"} align={"middle"}>
			<Col span={24}>
				<Card
					title={logo || <AntDesignOutlined/>}
					headStyle={{textAlign: "center", padding: "2em 0"}}
				>
					<Centered>
						<Loader {...props}/>
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
