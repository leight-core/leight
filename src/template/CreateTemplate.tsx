import {isString} from "@leight-core/leight";
import {FC} from "react";
import {ITemplateProps, Template} from "./Template";

export interface ICreateTemplateProps extends ITemplateProps {
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({title, subTitle, translation = true, ...props}) => {
	return <Template
		title={(translation && isString(title)) ? title + ".create" : title}
		subTitle={(translation && isString(subTitle)) ? subTitle + ".create" : subTitle}
		translation={translation}
		{...props}
	/>;
};
