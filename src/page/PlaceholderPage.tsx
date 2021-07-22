import {Card, Result} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {LoaderIcon} from "../icon/LoaderIcon";
import {Title} from "../layout/Title";
import {Page} from "./Page";

export interface IPlaceholderPageProps {
}

/**
 * Placeholder view is useful when there are views loaded lazily (by a suspense), thus it's necessary
 * to show at least "something".
 */
export const PlaceholderPage: FC<IPlaceholderPageProps> = ({children}) => {
	const {t} = useTranslation();
	return <Page>
		<Title title={"common.placeholder.title"}/>
		<Card style={{minHeight: "65vh"}}>
			<Result
				icon={<LoaderIcon spin/>}
				title={t("common.placeholder.title")}
				subTitle={t("common.placeholder.subtitle")}
				children={children}
			/>
		</Card>
	</Page>;
};