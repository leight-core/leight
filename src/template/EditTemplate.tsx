import {FC} from "react";
import {isString} from "../utils";
import {ITemplateProps, Template} from "./Template";

export interface IEditTemplateProps extends ITemplateProps {
}

export const EditTemplate: FC<IEditTemplateProps> = ({title, ...props}) => {
	return <Template
		title={(props.translation && isString(title)) ? title + ".edit" : title}
		{...props}
	/>;
};
