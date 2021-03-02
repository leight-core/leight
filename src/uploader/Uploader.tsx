import {message, Progress, Typography, Upload} from "antd";
import {RcFile, UploadChangeParam} from "antd/lib/upload";
import fileSize from "filesize";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {IUploaderEvents} from "./interface";

export interface IUploaderProps {
	/**
	 * File size limit (in MB).
	 */
	limit: number
	/**
	 * Uploader events.
	 */
	events: IUploaderEvents
	/**
	 * Translation base for this uploader.
	 */
	translation: string
	/**
	 * Where a file will be uploaded (goes through AppContext.link).
	 */
	action: string
	/**
	 * Optional params for the action.
	 */
	params?: Params
}

export const Uploader = ({limit, events, translation, action, params, ...props}: IUploaderProps) => {
	const appContext = useAppContext();
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const {t} = useTranslation();
	const onBeforeUpload = (file: RcFile, FileList: RcFile[]): boolean => {
		const hasValidSize = file.size / 1024 / 1024 < limit;
		if (!hasValidSize) {
			message.error(t([translation + ".file-too-large", "common.error.file-too-large"], {size: fileSize(file.size), limit: fileSize(limit * 1024 * 1024)}));
		}
		return hasValidSize;
	};
	const onChange = (info: UploadChangeParam) => {
		const current = info.fileList.length - 1;
		switch (info.fileList[current].status) {
			case "uploading":
				setProgress(info.fileList[current].percent || 0);
				setLoading(true);
				events.handler("uploading")(info.fileList[current]);
				break;
			case "error":
				setLoading(false);
				setProgress(0);
				events.handler("error")(info.fileList[current]);
				break;
			case "done":
				events.handler("done")(info.fileList[current]);
				break;
		}
	};
	return (
		<>
			<Upload.Dragger
				name={"vendor"}
				listType={"text"}
				action={appContext.link(action, params)}
				beforeUpload={onBeforeUpload}
				onChange={onChange}
				showUploadList={false}
				style={{padding: "0 1em"}}
				disabled={loading}
				{...props}
			>
				<Progress size={"default"} type={"circle"} percent={progress} format={item => (item?.toFixed(1) ?? 0) + "%"} status={"active"} {...props}/>
				<Typography.Text>{t(translation + ".upload")}</Typography.Text>
				<Typography.Text>{t(translation + ".upload.hint")}</Typography.Text>
			</Upload.Dragger>
		</>
	);
};
