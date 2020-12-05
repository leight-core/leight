import {BrowserRouter} from "react-router-dom";
import {AppContext, IAppContext} from "../app/AppContext";
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
