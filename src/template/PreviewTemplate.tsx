import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface IPreviewTemplateProps {
	title: string;
	icon: ReactNode;
}

export const PreviewTemplate: FC<IPreviewTemplateProps> = ({icon, title, children}) => {
	return <Template
		title={title + ".preview"}
		icon={icon}
	>
		{children}
	</Template>;
};
