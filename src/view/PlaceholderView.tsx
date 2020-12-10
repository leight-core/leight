import {Card, Result} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {LoaderIcon} from "../icon/LoaderIcon";

export interface IPlaceholderViewProps {
}

/**
 * Placeholder view is useful when there are views loaded lazily (by a suspense), thus it's necessary
 * to show at least "something".
 */
export const PlaceholderView: FC<IPlaceholderViewProps> = () => {
	useAppContext().useTitle("common.placeholder.title");
	const {t} = useTranslation();
	return (
		<Card title={<BackLink title={t("common.placeholder.back") as string}/>} style={{minHeight: "65vh"}}>
			<Result
				icon={<LoaderIcon spin/>}
				title={t("common.placeholder.title")}
				subTitle={t("common.placeholder.subtitle")}
			/>
		</Card>
	);
};
