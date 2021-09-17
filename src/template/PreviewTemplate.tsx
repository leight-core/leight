import {FC} from "react";
import {isString} from "../utils";
import {ITemplateProps, Template} from "./Template";

export interface IPreviewTemplateProps extends ITemplateProps {
}

export const PreviewTemplate: FC<IPreviewTemplateProps> = ({title, ...props}) => {
	return <Template
		title={(props.translation && isString(title)) ? title + ".p[review" : title}
		{...props}
	/>;
};
