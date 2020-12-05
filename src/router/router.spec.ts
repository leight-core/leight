import {link} from "./router";

test("Request unknown Link ID", () => {
	expect(() => link("foo")).toThrow("Requested unknown link with id [foo]. Did you register it?");
});
