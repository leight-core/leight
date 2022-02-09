import {ButtonLink, IButtonLinkProps} from "@leight-core/leight";
import {FC} from "react";

export interface IBreadcrumbButtonProps extends IButtonLinkProps {
}

export const BreadcrumbButton: FC<IBreadcrumbButtonProps> = props => {
	return <ButtonLink
		style={{padding: 0}}
		type={"link"}
		size={"small"}
		{...props}
	/>;
};
