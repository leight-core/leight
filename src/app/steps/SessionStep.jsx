import {UserOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import httpGet from "../../server/httpGet";
import Events from "../../utils/Events";
import {useAppContext} from "../AppContext";

const SessionStep = ({link = "common.user.login", ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<UserOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				appContext.link(link),
				Events()
					.on("success", session => {
						appContext.login(session);
						stepLoaderContext.next();
					})
					.on("http-401", () => {
						/**
						 * 401 is OK here, because if we're on public, we'll get one when session is checked.
						 */
						stepLoaderContext.next();
					})
					.on("error", () => {
						stepLoaderContext.setStatus("error");
					})
			);
			return () => cancelToken.cancel();
		}}/>
	);
};

SessionStep.proptTypes = {
	/**
	 * Discovery Index link id to fetch session from.
	 */
	link: PropTypes.string,
};

export default SessionStep;
