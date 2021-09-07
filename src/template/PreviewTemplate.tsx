import {FC, ReactNode} from "react";
import {Template} from "./Template";

export interface IPreviewTemplateProps {
	title: string;
	icon: ReactNode;
	translation?: boolean;
}

export const PreviewTemplate: FC<IPreviewTemplateProps> = ({icon, title, translation = true, children}) => {
	return <Template
		title={title + ".preview"}
		icon={icon}
		translation={translation}
	>
		{children}
	</Template>;
};
