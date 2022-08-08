import {GlobalOutlined} from "@ant-design/icons";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {FingerprintContext, LoaderLayout} from "@leight-core/leight";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {FC, PropsWithChildren, ReactNode} from "react";

export type IFingerprintProviderProps = PropsWithChildren<{
	logo?: ReactNode;
}>

export const FingerprintProvider: FC<IFingerprintProviderProps> = ({logo, ...props}) => {
	const fingerprint = useQuery(["fingerprint"], () => new Promise<string>((resolve) => {
		const done = (fingerprint: string) => {
			resolve((axios.defaults.headers as any)["X-Client-Hash"] = fingerprint);
		};
		FingerprintJS.load()
			.then(agent => agent.get()
				.then(result => done(result.visitorId))
				.catch(() => done("unknown")))
			.catch(() => done("unknown"));
	}), {
		/**
		 * Should be fresh for 60 minutes
		 */
		staleTime: 1000 * 60 * 60 * 60,
	});

	return <FingerprintContext.Provider
		value={{
			fingerprint: fingerprint.data!,
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<GlobalOutlined/>}
			queryResult={fingerprint}
			errorText={"Fingerprint detection failed."}
			{...props}
		/>
	</FingerprintContext.Provider>;
};
