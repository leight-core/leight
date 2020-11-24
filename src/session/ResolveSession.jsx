import { useState } from "react";
import { Events } from "../utils";
import LoaderView from "../view/LoaderView";
import LockedUserView from "../view/LockedUserView";
import useSessionCheck from "./useSessionCheck";
import useSessionContext from "./useSessionContext";

const ResolveSession = (
	{
		sites,
		link = "common.user.login"
	}) => {
	const [state, setState] = useState();
	const sessionContext    = useSessionContext();
	useSessionCheck(
		Events()
			.on("success", user => {
				sessionContext.open(user);
				/**
				 * we're done, everything looks good
				 */
				setState(true);
			})
			.on("error", () => {
				/**
				 * there is some (unhandled) error
				 */
				setState(false);
			})
			.on("http-401", () => {
				/**
				 * 401 is OK here, because if we're on public, we'll get one when session is checked.
				 */
				setState(true);
				return false;
			}),
		link
	);
	switch (state) {
		case true: {
			return sites[sessionContext.session.site] || <LockedUserView/>;
		}
		default: {
			return <LoaderView/>;
		}
	}
};

export default ResolveSession;
