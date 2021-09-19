import {isString, ITemplateProps, Template} from "@leight-core/leight";
import {FC} from "react";

export interface IDeleteTemplateProps extends ITemplateProps {
}

export const DeleteTemplate: FC<IDeleteTemplateProps> = ({title, translation = true, ...props}) => {
	return <Template
		title={(translation && isString(title)) ? title + ".delete" : title}
		translation={translation}
		status={"error"}
		{...props}
	/>;
};
