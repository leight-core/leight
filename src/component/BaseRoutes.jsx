import {
	Route,
	Routes
} from "react-router";

const BaseRoutes = (
	{
		routes,
		...props
	}
) => {
	return (
		<Routes {...props} children={routes.map(item => <Route key={item.path} path={item.path} element={item.element}/>)}/>
	);
};

export default BaseRoutes;
