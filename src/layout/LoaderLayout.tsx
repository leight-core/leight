import {AntDesignOutlined} from "@ant-design/icons";
import {Centered, LoaderIcon} from "@leight-core/leight";
import {Card, Col, Divider, Layout, LayoutProps, Result, Row} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ILoaderLayoutProps extends Partial<LayoutProps> {
	logo?: ReactNode;
	icon: ReactNode;
	loading: boolean;
	error: boolean;
	errorText?: string;
}

export const LoaderLayout: FC<ILoaderLayoutProps> = ({logo, icon, loading, error, errorText, children, ...props}) => {
	const {t} = useTranslation();
	return <>
		{(loading || error) && <Layout style={{height: "100vh"}} {...props}>
			<Row justify={"center"} align={"middle"}>
				<Col span={24}>
					<Card
						title={logo || <AntDesignOutlined/>}
						headStyle={{textAlign: "center", padding: "2em 0"}}
					>
						<Centered>
							{loading && !error && <Result
								icon={<LoaderIcon/>}
							/>}
							{error && <Result
								icon={icon}
								status={"error"}
								title={errorText ? t(errorText) : null}
							/>}
						</Centered>
						<Divider/>
						<Centered>
							v[{process.env.NEXT_PUBLIC_VERSION}]
						</Centered>
					</Card>
				</Col>
			</Row>
		</Layout>}
		{!loading && !error && children}
	</>;
};
