import {QuestionCircleFilled} from "@ant-design/icons";
import {Card, Result} from "antd";
import {useTranslation} from "react-i18next";
import BackLink from "../component/BackLink";
import SessionCloseButton from "../component/SessionCloseButton";
import {useLayoutContext} from "../layout/LayoutContext";

const SignOutView = ({id}) => {
	const layoutContext = useLayoutContext();
	const {t} = useTranslation();
	layoutContext.useMenuSelect(`${id}.sign-out`);
	layoutContext.useEnableFullscreen();
	return (
		<Card>
			<Result
				icon={<QuestionCircleFilled/>}
				title={t(`${id}.sign-out.title`)}
				subTitle={t(`${id}.sign-out.subtitle`)}
				extra={[
					<SessionCloseButton key="sign-out" text={id + ".sign-out.button.sign-out"}/>,
					<BackLink key="back" text={id + ".sign-out.button.back"}/>
				]}
			/>
		</Card>
	);
};

export default SignOutView;
