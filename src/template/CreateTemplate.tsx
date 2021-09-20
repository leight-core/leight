import {FC} from "react";
import {ITemplateProps, Template} from "./Template";

export interface ICreateTemplateProps extends ITemplateProps {
}

export const CreateTemplate: FC<ICreateTemplateProps> = ({label, ...props}) => {
	return <Template
		label={label ? label + ".create" : label}
		{...props}
	/>;
};
