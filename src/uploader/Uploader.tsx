import {message, Progress, Typography, Upload} from "antd";
import {DraggerProps, RcFile, UploadChangeParam} from "antd/lib/upload";
import fileSize from "filesize";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {Centered} from "../layout/Centered";
import {IUploaderEvents} from "./interface";

export interface IUploaderProps extends Partial<DraggerProps> {
	/**
	 * File field name on the server side.
	 */
	name: string
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

export const Uploader = ({name, limit, events, translation, action, params, ...props}: IUploaderProps) => {
	const appContext = useAppContext();
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<any>("active");
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
				setStatus("active");
				events.handler("uploading")(info.fileList[current]);
				break;
			case "error":
				setLoading(false);
				setStatus("exception");
				setTimeout(() => setProgress(0), 1500);
				events.handler("error")(info.fileList[current]);
				break;
			case "done":
				setLoading(false);
				setStatus("success");
				setTimeout(() => setProgress(0), 1500);
				/**
				 * Any because typing is forced by the Upload component, thus user exactly
				 * types, what he expects as a result, including null/undefined.
				 */
				events.handler("done")(info.fileList[current] as any);
				break;
		}
	};
	return (
		<>
			<Upload.Dragger
				name={name}
				listType={"text"}
				action={appContext.link(action, params)}
				beforeUpload={onBeforeUpload}
				onChange={onChange}
				showUploadList={false}
				disabled={loading}
				{...props}
			>
				<Centered span={22}>
					<Progress size={"default"} type={"line"} percent={progress} showInfo={false} status={status}/>
				</Centered>
				<Typography.Title level={3}>{t(translation + ".upload")}</Typography.Title>
				<Typography.Paragraph>{t(translation + ".upload.hint")}</Typography.Paragraph>
			</Upload.Dragger>
		</>
	);
};
