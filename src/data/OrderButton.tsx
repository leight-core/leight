import {ArrowDownOutlined, ArrowUpOutlined, DashOutlined} from "@ant-design/icons";
import {useDataSourceContext} from "@leight-core/leight";
import {Button, Space, Tooltip} from "antd";
import {useTranslation} from "react-i18next";

export interface IOrderButtonProps<TOrderBy> {
	orderBy: keyof TOrderBy;
	prefix: string;
}

export const OrderButton = <TOrderBy, >({orderBy, prefix}: IOrderButtonProps<TOrderBy>) => {
	const dataSourceContext = useDataSourceContext<any, any>();
	const order = dataSourceContext.orderBy ? dataSourceContext.orderBy[orderBy] : undefined;
	const {t} = useTranslation();
	const label = t("order-by.label." + prefix + "." + orderBy);
	return <Space size={"small"}>
		<Button
			icon={
				(order === undefined && <Tooltip title={t("common.order.undefined.tooltip")}><DashOutlined/></Tooltip>) ||
				(order === true && <Tooltip title={t("common.order.ascending.tooltip")}><ArrowUpOutlined/></Tooltip>) ||
				(order === false && <Tooltip title={t("common.order.descending.tooltip")}><ArrowDownOutlined/></Tooltip>)
			}
			type={"link"}
			size={"small"}
			onClick={() => dataSourceContext.setOrderBy({[orderBy]: !order})}
		>
			{(order === undefined && <Tooltip title={t("common.order.undefined.tooltip")}>{label}</Tooltip>) ||
			(order === true && <Tooltip title={t("common.order.ascending.tooltip")}>{label}</Tooltip>) ||
			(order === false && <Tooltip title={t("common.order.descending.tooltip")}>{label}</Tooltip>)}
		</Button>
	</Space>;
};
