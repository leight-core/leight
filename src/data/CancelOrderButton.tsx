import {RollbackOutlined} from "@ant-design/icons";
import {useDataContext} from "@leight-core/leight";
import {Button, ButtonProps, Tooltip} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ICancelOrderButtonProps extends Partial<ButtonProps> {
}

export const CancelOrderButton: FC<ICancelOrderButtonProps> = props => {
	const dataContext = useDataContext();
	const {t} = useTranslation();
	return <Button
		type={"link"}
		icon={<Tooltip title={t("common.order.clear.tooltip")}><RollbackOutlined/></Tooltip>}
		onClick={() => dataContext.setOrderBy(null)}
		{...props}
	/>;
};
