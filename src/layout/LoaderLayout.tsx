import {AntDesignOutlined} from "@ant-design/icons";
import {Centered, LoaderIcon} from "@leight-core/leight";
import {Card, Col, Divider, Layout, LayoutProps, Result, Row} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {UseQueryResult} from "react-query";

export interface ILoaderLayoutProps extends Partial<LayoutProps> {
	logo?: ReactNode;
	icon: ReactNode;
	queryResult?: UseQueryResult;
	errorText?: string;
}

export const LoaderLayout: FC<ILoaderLayoutProps> = ({logo, icon, queryResult, errorText, children, ...props}) => {
	const {t} = useTranslation();
	return <>
		{queryResult && (queryResult.isLoading || queryResult.isError) && <Layout style={{height: "100vh"}} {...props}>
			<Row justify={"center"} align={"middle"}>
				<Col span={24}>
					<Card
						title={logo || <AntDesignOutlined/>}
						headStyle={{textAlign: "center", padding: "2em 0"}}
					>
						<Centered>
							{queryResult.isLoading && !queryResult.isError && <Result
								icon={<LoaderIcon/>}
							/>}
							{queryResult.isError && <Result
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
		{queryResult && queryResult.isSuccess && children}
	</>;
};
