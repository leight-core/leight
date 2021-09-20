import {GlobalOutlined} from "@ant-design/icons";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {FingerprintContext, LoaderLayout} from "@leight-core/leight";
import axios from "axios";
import {FC, ReactNode} from "react";
import {useQuery} from "react-query";

export interface IFingerprintContextProviderProps {
	logo?: ReactNode;
}

export const FingerprintContextProvider: FC<IFingerprintContextProviderProps> = ({logo, children}) => {
	const fingerprint = useQuery("fingerprint", () => new Promise<string>((resolve) => {
		const done = (fingerprint: string) => {
			resolve(axios.defaults.headers["X-Client-Hash"] = fingerprint);
		};
		FingerprintJS.load()
			.then(agent => agent.get()
				.then(result => done(result.visitorId))
				.catch(() => done("unknown")))
			.catch(() => done("unknown"));
	}));

	return <FingerprintContext.Provider
		value={{
			fingerprint: fingerprint.data!!,
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<GlobalOutlined/>}
			queryResult={fingerprint}
			errorText={"Fingerprint detection failed."}
		>
			{children}
		</LoaderLayout>
	</FingerprintContext.Provider>;
};
