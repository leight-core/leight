import {GlobalOutlined} from "@ant-design/icons";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {FingerprintContext, LoaderLayout} from "@leight-core/leight";
import {FC, ReactNode, useEffect, useState} from "react";

export interface IFingerprintContextProviderProps {
	logo?: ReactNode;
}

export const FingerprintContextProvider: FC<IFingerprintContextProviderProps> = ({logo, children}) => {
	const [fingerprint, setFingerprint] = useState<string>();

	useEffect(() => {
		FingerprintJS.load()
			.then(agent => agent.get()
				.then(result => setFingerprint(result.visitorId))
				.catch(() => setFingerprint("unknown")))
			.catch(() => setFingerprint("unknown"));
	}, []);

	return <FingerprintContext.Provider
		value={{
			fingerprint,
			setFingerprint,
		}}
	>
		<LoaderLayout
			logo={logo}
			icon={<GlobalOutlined/>}
			loading={!fingerprint}
			error={false}
			errorText={"Fingerprint detection failed."}
		>
			{children}
		</LoaderLayout>
	</FingerprintContext.Provider>;
};
