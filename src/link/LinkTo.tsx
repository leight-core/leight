import Link from "next/link";
import {FC} from "react";
import {IParams} from "./interface";
import {useLinkContext} from "./LinkContext";

export interface ILinkToProps {
	/**
	 * Target href; could be template path, will be expanded by a LinkContext.
	 */
	href: string;
	/**
	 * Optional params used to generate a link.
	 */
	params?: IParams;
}

/**
 * Wrapper component over Next.js Link with underlying <a> with children passed through.
 */
export const LinkTo: FC<ILinkToProps> = ({href, params, children}) => {
	const linkContext = useLinkContext();
	return <Link href={linkContext.generate(href, params)}>
		<a>{children}</a>
	</Link>;
};
