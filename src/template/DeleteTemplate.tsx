import {DeleteItemIcon, IDeleteCallback, IQuery, isString, ITemplateProps, Template, useBlockContext, useDiscoveryContext, useNavigate} from "@leight-core/leight";
import {Button, Divider, message} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface IDeleteTemplateProps extends ITemplateProps {
	onDelete: IDeleteCallback;
	deleteQuery?: IQuery;
	/**
	 * Where to navigate on successful delete.
	 */
	navigateTo: string;
	navigateQuery?: IQuery;
	/**
	 * Base translation for delete messages (.delete.success, .delete.submit, and .delete.error).
	 */
	deleteTranslation: string;
}

export const DeleteTemplate: FC<IDeleteTemplateProps> = ({title, subTitle, deleteTranslation, navigateTo, navigateQuery, onDelete, deleteQuery, translation = true, ...props}) => {
	const blockContext = useBlockContext();
	const discoveryContext = useDiscoveryContext();
	const navigate = useNavigate();
	const {t} = useTranslation();
	return <Template
		title={(translation && isString(title)) ? title + ".delete" : title}
		subTitle={(translation && isString(subTitle)) ? subTitle + ".delete" : subTitle}
		translation={translation}
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
							message.success(t(deleteTranslation + ".delete.success", {data}));
						})
						.on("catch", () => {
							message.error(t(deleteTranslation + ".delete.error"));
						});
				}}
			>
				{t(deleteTranslation + ".delete.submit")}
			</Button>
			{props.children ? <Divider/> : null}
		</>}
		{...props}
	/>;
};
