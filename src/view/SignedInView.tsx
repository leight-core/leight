import {Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {ButtonLink} from "../component/ButtonLink";
import {ScrollToTop} from "../component/ScrollToTop";
import {ContinueIcon} from "../icon/ContinueIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {generate} from "../router/router";

export interface ISignedInViewProps {
	/**
	 * Target href (on continue); internally uses {@see generate}.
	 */
	href: string
	/**
	 * Base title used for translation; it will be used as `title + ".title"` for title and `title + ".subtitle"` for subtitle.
	 */
	title?: string
}

export const SignedInView: FC<ISignedInViewProps> = ({href, title = ""}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<ScrollToTop/>
			<Result
				status={"success"}
				title={t([title + ".title", "common.sign-in.succeed.title"])}
				subTitle={t([title + ".subtitle", "common.sign-in.succeed.subtitle"])}
				extra={
					<ButtonLink href={href} icon={<ContinueIcon/>} title={"common.sign-in.continue"}/>
				}
			/>
		</Card>
	);
};
