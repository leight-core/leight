import {CloseCircleOutlined, DownOutlined, MinusCircleOutlined, UpOutlined} from "@ant-design/icons";
import {useDataSourceContext} from "@leight-core/leight";
import {Button, Space, Tooltip} from "antd";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export interface IOrderButtonProps<T> {
	orderBy: keyof T;
}

export const OrderButton = <T, >({orderBy}: IOrderButtonProps<T>) => {
	const dataSourceContext = useDataSourceContext<any, any>();
	const [order, setOrder] = useState<boolean | undefined>();
	const {t} = useTranslation();
	return <Space>
		<Button
			icon={
				(order === undefined && <Tooltip title={t("common.order.undefined.tooltip")}><MinusCircleOutlined/></Tooltip>) ||
				(order === true && <Tooltip title={t("common.order.ascending.tooltip")}><UpOutlined/></Tooltip>) ||
				(order === false && <Tooltip title={t("common.order.descending.tooltip")}><DownOutlined/></Tooltip>)
			}
			type={"link"}
			onClick={() => {
				setOrder(order => !order);
				dataSourceContext.setOrderBy({[orderBy]: !order});
			}}
		>
			{t("order-by.label." + orderBy)}
		</Button>
		<Button
			type={"link"}
			icon={<Tooltip title={t("common.order.clear.tooltip")}><CloseCircleOutlined/></Tooltip>}
			onClick={() => {
				setOrder(undefined);
				dataSourceContext.setOrderBy(null);
			}}
		/>
	</Space>;
};
