import {FC} from "react";
import {isString} from "../utils";
import {ITemplateProps, Template} from "./Template";

export interface IEditTemplateProps extends ITemplateProps {
}

export const EditTemplate: FC<IEditTemplateProps> = ({title, subTitle, translation = true, ...props}) => {
	return <Template
		title={(translation && isString(title)) ? title + ".edit" : title}
		subTitle={(translation && isString(subTitle)) ? subTitle + ".edit" : subTitle}
		translation={translation}
		{...props}
	/>;
};
