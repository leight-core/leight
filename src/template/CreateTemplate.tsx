import {isString} from "@leight-core/leight";
import {FC} from "react";
import {ITemplateProps, Template} from "./Template";

export interface ICreateTemplateProps extends ITemplateProps {
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({title, translation = true, ...props}) => {
	return <Template
		title={(translation && isString(title)) ? title + ".create" : title}
		translation={translation}
		{...props}
	/>;
};
