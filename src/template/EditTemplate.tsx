import {FC} from "react";
import {ITemplateProps, Template} from "./Template";

export interface IEditTemplateProps extends ITemplateProps {
}

export const EditTemplate: FC<IEditTemplateProps> = ({label, ...props}) => {
	return <Template
		label={label ? label + ".edit" : label}
		{...props}
	/>;
};
