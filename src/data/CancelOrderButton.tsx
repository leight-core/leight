import {RollbackOutlined} from "@ant-design/icons";
import {usePageContext} from "@leight-core/leight";
import {Button, ButtonProps, Tooltip} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ICancelOrderButtonProps extends Partial<ButtonProps> {
}

export const CancelOrderButton: FC<ICancelOrderButtonProps> = props => {
	const dataSourceContext = usePageContext<any, any>();
	const {t} = useTranslation();
	return <Button
		type={"link"}
		icon={<Tooltip title={t("common.order.clear.tooltip")}><RollbackOutlined/></Tooltip>}
		onClick={() => dataSourceContext.setOrderBy(null)}
		{...props}
	/>;
};
