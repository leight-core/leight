import {IQueryParams} from "@leight-core/leight";
import Link from "next/link";
import {FC, PropsWithChildren} from "react";

export type ILinkToProps = PropsWithChildren<{
	/**
	 * Target href; could be template path, will be expanded by a LinkContext.
	 */
	href: string;
	/**
	 * Optional params used to generate a link.
	 */
	query?: IQueryParams;
}>

/**
 * Wrapper component over Next Link with underlying <a> with children passed through.
 */
export const LinkTo: FC<ILinkToProps> = ({href, query, children}) => {
	return <Link href={{pathname: href, query: query || undefined}}>
		<a>{children}</a>
	</Link>;
};
