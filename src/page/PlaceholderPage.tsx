import {EmptyPage, ITemplateProps, LoaderIcon, Template} from "@leight-core/leight";
import {Card} from "antd";
import {FC} from "react";

export interface IPlaceholderPageProps extends Partial<ITemplateProps> {
}

/**
 * Placeholder view is useful when there are views loaded lazily (by a suspense), thus it's necessary
 * to show at least "something".
 */
export const PlaceholderPage: FC<IPlaceholderPageProps> = props => {
	return <EmptyPage title={"common.placeholder"}>
		<Card style={{minHeight: "65vh"}}>
			<Template
				icon={<LoaderIcon/>}
				label={"common.placeholder"}
				{...props}
			/>
		</Card>
	</EmptyPage>;
};
