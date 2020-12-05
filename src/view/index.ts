import {CommonView} from "./CommonView";
import {CreateView} from "./CreateView";
import {DashboardView} from "./DashboardView";
import {EditView} from "./EditView";
import {HomeView} from "./HomeView";
import {ListView} from "./ListView";

export * from "./CommonView";
export * from "./CreateView";
export * from "./DashboardView";
export * from "./EditView";
export * from "./HomeView";
export * from "./ListView";
export * from "./LoaderView";
export * from "./LockedUserView";
export * from "./NotFoundView";
export * from "./PlaceholderView";
export * from "./SessionEndedView";
export * from "./SessionExpiredView";
export * from "./SignedInView";
export * from "./SignedOutView";
export * from "./SignOutView";
export * from "./ViewContext";

/**
 * Some views have clashing names (like CreateView), so to keep stuff simple on
 * consumer side, here are some shortcuts to prevent import aliases.
 */
export const View = {
	Common: CommonView,
	Create: CreateView,
	Edit: EditView,
	List: ListView,
	Home: HomeView,
	Dashboard: DashboardView,
};
