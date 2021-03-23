import {Card, Result} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {LoaderIcon} from "../icon/LoaderIcon";

export interface IPlaceholderViewProps {
}

/**
 * Placeholder view is useful when there are views loaded lazily (by a suspense), thus it's necessary
 * to show at least "something".
 */
export const PlaceholderView: FC<IPlaceholderViewProps> = () => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t("common.placeholder.title")}/>
			<Card style={{minHeight: "65vh"}}>
				<Result
					icon={<LoaderIcon spin/>}
					title={t("common.placeholder.title")}
					subTitle={t("common.placeholder.subtitle")}
				/>
			</Card>
		</>
	);
};
