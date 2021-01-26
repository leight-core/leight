import {useEffect, useState} from "react";
import {Placeholder} from "./Placeholder";

export default {
	title: "Leight/Component/Placeholder",
	component: Placeholder,
};

interface ISomeData {
	item: string
	foo?: string | null
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
		<Placeholder data={data} placeholder={() => <span>Thinking...</span>}>
			{data => <h1>{data.item}</h1>}
		</Placeholder>
	);
};

export const EmbeddedPlaceholder = () => {
	const [data, setData] = useState<ISomeData>();
	useEffect(() => {
		const id = setTimeout(() => {
			setData({item: "tadaaa!!", foo: null});
		}, 1000);
		return () => clearTimeout(id);
	});
	return (
		<Placeholder data={data}>
			{data => (
				<>
					<h1>{data.item}</h1>
					<Placeholder data={data.foo} placeholder={() => "nothing here"}/>
				</>
			)}
		</Placeholder>
	);
};

export const CustomSkeletonPlaceholder = () => {
	const [data, setData] = useState<ISomeData>();
	useEffect(() => {
		const id = setTimeout(() => {
			setData({item: "tadaaa!!", foo: null});
		}, 1000);
		return () => clearTimeout(id);
	});
	return (
		<Placeholder data={data} skeleton={{size: "small"}}>
			{data => <h1>{data.item}</h1>}
		</Placeholder>
	);
};
