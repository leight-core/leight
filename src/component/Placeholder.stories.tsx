import {useEffect, useState} from "react";
import {Placeholder} from "./Placeholder";

export default {
	title: "Leight/Component/Placeholder",
	component: Placeholder,
};

interface ISomeData {
	item: string
}

export const Default = () => {
	const [data, setData] = useState<ISomeData>();
	useEffect(() => {
		const id = setTimeout(() => {
			setData({item: "tadaaa!!"});
		}, 1000);
		return () => clearTimeout(id);
	});
	return (
		<Placeholder data={data}>
			{data => <h1>{data.item}</h1>}
		</Placeholder>
	);
};

export const CustomPlaceholder = () => {
	const [data, setData] = useState<ISomeData>();
	useEffect(() => {
		const id = setTimeout(() => {
			setData({item: "tadaaa!!"});
		}, 1000);
		return () => clearTimeout(id);
	});
	return (
		<Placeholder data={data} placeholder={<span>Thinking...</span>}>
			{data => <h1>{data.item}</h1>}
		</Placeholder>
	);
};
