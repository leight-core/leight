import {Events} from "./Events";

test("Event order", () => {
	const events = Events();
	const stack: string[] = [];
	events.on("test", () => {
		stack.push("second");
	}, 50);
	events.on("test", () => {
		stack.push("first");
	}, 0);
	events.on("test", () => {
		stack.push("last");
	}, 1000);
	events.call("test");
	expect(stack).toEqual(["first", "second", "last"]);
});
