import {GlobalOutlined} from "@ant-design/icons";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {FingerprintContext, LoaderLayout} from "@leight-core/leight";
import axios from "axios";
import {FC, ReactNode, useEffect, useState} from "react";

export interface IFingerprintContextProviderProps {
	logo?: ReactNode;
}

export const FingerprintContextProvider: FC<IFingerprintContextProviderProps> = ({logo, children}) => {
	const [fingerprint, setFingerprint] = useState<string>("unknown");

	function updateFingerprint(fingerprint: string) {
		axios.defaults.headers["X-Client-Hash"] = fingerprint;
		setFingerprint(fingerprint);
	}

	useEffect(() => {
		FingerprintJS.load()
			.then(agent => agent.get()
				.then(result => updateFingerprint(result.visitorId))
				.catch(() => updateFingerprint("unknown")))
			.catch(() => updateFingerprint("unknown"));
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
