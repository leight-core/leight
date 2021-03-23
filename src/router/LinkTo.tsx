import {FC} from "react";
import {Link} from "react-router-dom";
import {IParams} from "../interface/interface";
import {useRouterContext} from "./RouterContext";

export interface ILinkToProps {
	/**
	 * Link ID in the router context.
	 */
	link: string
	/**
	 * Optional params to generate a link.
	 */
	params?: IParams
}

export const LinkTo: FC<ILinkToProps> = ({link, params, children}) => {
	const routerContext = useRouterContext();
	return (
		<Link to={routerContext.generate(link, params)} children={children}/>
	);
};
