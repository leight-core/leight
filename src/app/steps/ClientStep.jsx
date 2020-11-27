import {CloudDownloadOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";
import httpGet from "../../server/httpGet";
import Events from "../../utils/Events";

const ClientStep = props => {
	return (
		<LoaderStep icon={<CloudDownloadOutlined/>} {...props} onStep={stepLoaderContext => {
			return httpGet(
				props.href || "/client.json",
				Events()
					.on("success", data => {
						console.log(data);
					})
					.on("catch", () => {
						stepLoaderContext.setStatus("error");
					})
			);
		}}/>
	);
};

export default ClientStep;
