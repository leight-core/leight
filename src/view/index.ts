import {BareView} from "./BareView";
import {CommonView} from "./CommonView";
import {CreateView} from "./CreateView";
import {DashboardView} from "./DashboardView";
import {DeleteView} from "./DeleteView";
import {EditView} from "./EditView";
import {HomeView} from "./HomeView";
import {ListView} from "./ListView";
import {LoaderView} from "./LoaderView";
import {LockedUserView} from "./LockedUserView";
import {NotFoundView} from "./NotFoundView";
import {PlaceholderView} from "./PlaceholderView";
import {SessionEndedView} from "./SessionEndedView";
import {SessionExpiredView} from "./SessionExpiredView";
import {SignedInView} from "./SignedInView";
import {SignedOutView} from "./SignedOutView";
import {SignOutView} from "./SignOutView";

export * from "./interface";
export * from "./BareView";
export * from "./CommonView";
export * from "./CreateView";
export * from "./DashboardView";
export * from "./DeleteView";
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

export const View = {
	Bare: BareView,
	Common: CommonView,
	Create: CreateView,
	Dashboard: DashboardView,
	Delete: DeleteView,
	Edit: EditView,
	Home: HomeView,
	List: ListView,
	Loader: LoaderView,
	LockedUser: LockedUserView,
	NotFound: NotFoundView,
	Placeholder: PlaceholderView,
	SessionEnded: SessionEndedView,
	SessionExpired: SessionExpiredView,
	SignedIn: SignedInView,
	SignedOut: SignedOutView,
	SignOut: SignOutView,
};
