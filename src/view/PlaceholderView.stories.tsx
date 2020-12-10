import {BrowserRouter} from "react-router-dom";
import {AppContext} from "../app/AppContext";
import {IAppContext} from "../app/interface";
import {PlaceholderView} from "./PlaceholderView";

export default {
	title: "Leight/View/Placeholder",
	component: PlaceholderView,
};

export const Default = () => {
	return (
		<AppContext.Provider value={{
			useTitle: () => null,
		} as unknown as IAppContext}>
			<BrowserRouter>
				<PlaceholderView/>
			</BrowserRouter>
		</AppContext.Provider>
	);
};
