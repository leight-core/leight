import {ArrowDownOutlined, ArrowUpOutlined, DashOutlined} from "@ant-design/icons";
import {useDataSourceContext} from "@leight-core/leight";
import {Button, Space, Tooltip} from "antd";
import {useTranslation} from "react-i18next";

export interface IOrderButtonProps<TOrderBy> {
	orderBy: keyof TOrderBy;
}

export const OrderButton = <TOrderBy, >({orderBy}: IOrderButtonProps<TOrderBy>) => {
	const dataSourceContext = useDataSourceContext<any, any>();
	const order = dataSourceContext.orderBy ? dataSourceContext.orderBy[orderBy] : undefined;
	const {t} = useTranslation();
	return <Space size={"small"}>
		<Button
			icon={
				(order === undefined && <Tooltip title={t("common.order.undefined.tooltip")}><DashOutlined/></Tooltip>) ||
				(order === true && <Tooltip title={t("common.order.ascending.tooltip")}><ArrowUpOutlined/></Tooltip>) ||
				(order === false && <Tooltip title={t("common.order.descending.tooltip")}><ArrowDownOutlined/></Tooltip>)
			}
			type={"link"}
			onClick={() => dataSourceContext.setOrderBy({[orderBy]: !order})}
		>
			{(order === undefined && <Tooltip title={t("common.order.undefined.tooltip")}>{t("order-by.label." + orderBy)}</Tooltip>) ||
			(order === true && <Tooltip title={t("common.order.ascending.tooltip")}>{t("order-by.label." + orderBy)}</Tooltip>) ||
			(order === false && <Tooltip title={t("common.order.descending.tooltip")}>{t("order-by.label." + orderBy)}</Tooltip>)}
		</Button>
	</Space>;
};
