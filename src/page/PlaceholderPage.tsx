import {Card, Result} from "antd";
import {Head} from "next/document";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {LoaderIcon} from "../icon/LoaderIcon";
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
		<Head>
			<title key={"title"}>{t("common.placeholder.title")}</title>
		</Head>
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
