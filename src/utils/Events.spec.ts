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

test("Events chaining", () => {
	const events = Events();
	const globals = Events();
	const stack: string[] = [];
	events.chain(globals);
	events.on("test", () => stack.push("first"), 10);
	globals.on("test", () => stack.push("second"), 20);
	events.on("test", () => stack.push("third"), 30);
	events.call("test");
	expect(stack).toEqual(["first", "second", "third"]);
});

test("Breaking events", () => {
	const events = Events();
	const stack: string[] = [];
	events.on("test", () => stack.push("nope!"), 100);
	events.on("test", () => stack.push("another nope!"), 101);
	events.on("test", () => {
		stack.push("yep!");
		return false;
	}, 50);
	events.on("test", () => stack.push("wanna this!"), 30);
	events.call("test");
	expect(stack).toEqual(["wanna this!", "yep!"]);
});
