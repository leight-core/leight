import {QuestionCircleFilled} from "@ant-design/icons";
import {Card, Result} from "antd";
import {useTranslation} from "react-i18next";
import BackLink from "../component/BackLink";
import SessionCloseButton from "../component/SessionCloseButton";
import {useLayoutContext} from "../layout/LayoutContext";

const SignOutView = () => {
	const layoutContext = useLayoutContext();
	const {t} = useTranslation();
	layoutContext.useEnableFullscreen();
	return (
		<Card>
			<Result
				icon={<QuestionCircleFilled/>}
				title={t(`common.sign-out.title`)}
				subTitle={t(`common.sign-out.subtitle`)}
				extra={[
					<SessionCloseButton key="sign-out" text={"common.sign-out.button.sign-out"}/>,
					<BackLink key="back" text={"common.sign-out.button.back"}/>
				]}
			/>
		</Card>
	);
};

export default SignOutView;
