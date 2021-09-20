import {DeleteItemIcon, IDeleteCallback, IQueryParams, ITemplateProps, Template, useBlockContext, useDiscoveryContext, useNavigate} from "@leight-core/leight";
import {Button, Divider, message} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface IDeleteTemplateProps extends ITemplateProps {
	onDelete: IDeleteCallback;
	deleteQuery?: IQueryParams;
	/**
	 * Where to navigate on successful delete.
	 */
	navigateTo: string;
	navigateQuery?: IQueryParams;
}

export const DeleteTemplate: FC<IDeleteTemplateProps> = ({label, navigateTo, navigateQuery, onDelete, deleteQuery, ...props}) => {
	const blockContext = useBlockContext();
	const discoveryContext = useDiscoveryContext();
	const navigate = useNavigate();
	const {t} = useTranslation();
	return <Template
		label={label ? label + ".delete" : label}
		status={"error"}
		extra={<>
			<Button
				danger
				size={"large"}
				icon={<DeleteItemIcon/>}
				onClick={() => {
					blockContext.block();
					onDelete(discoveryContext, deleteQuery)
						.on("response", data => {
							navigate(navigateTo, navigateQuery);
							message.success(t(label + ".delete.success", {data}));
						})
						.on("catch", () => {
							message.error(t(label + ".delete.error"));
						});
				}}
			>
				{t(label + ".delete.submit")}
			</Button>
			{props.children ? <Divider/> : null}
		</>}
		{...props}
	/>;
};
