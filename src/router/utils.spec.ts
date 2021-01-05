import {link} from "./utils";

test("Request unknown Link ID", () => {
	expect(() => link("foo")).toThrow("Requested unknown link with id [foo]. Did you register it?");
});

test("Relative link ID", () => {
	link("prefix", "/the/root");
	link("foo", "prefix:/bar");
	expect(link("foo")).toBe("/the/root/bar");
});
