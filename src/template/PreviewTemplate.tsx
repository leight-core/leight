import {FC} from "react";
import {isString} from "../utils";
import {ITemplateProps, Template} from "./Template";

export interface IPreviewTemplateProps extends ITemplateProps {
}

export const PreviewTemplate: FC<IPreviewTemplateProps> = ({title, subTitle, translation = true, ...props}) => {
	return <Template
		title={(translation && isString(title)) ? title + ".preview" : title}
		subTitle={(translation && isString(subTitle)) ? subTitle + ".preview" : subTitle}
		translation={translation}
		{...props}
	/>;
};
