import {isString} from "@leight-core/leight";
import {FC} from "react";
import {ITemplateProps, Template} from "./Template";

export interface ICreateTemplateProps extends ITemplateProps {
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({title, ...props}) => {
	return <Template
		title={(props.translation && isString(title)) ? title + ".create" : title}
		{...props}
	/>;
};
