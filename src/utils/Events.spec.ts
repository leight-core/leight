import {Events} from "./Events";

test("Event order", () => {
	const events = Events<"test">();
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
	const events = Events<"test">();
	const globals = Events<"test">();
	const stack: string[] = [];
	events.chain(globals);
	events.on("test", () => stack.push("first"), 10);
	globals.on("test", () => stack.push("second"), 20);
	events.on("test", () => stack.push("third"), 30);
	events.call("test");
	expect(stack).toEqual(["first", "second", "third"]);
});

test("Breaking events", () => {
	const events = Events<"test">();
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

test("Missing required handler", () => {
	const events = Events<"this-is-required" | "another-required">();
	events.required("this-is-required", "another-required");
	expect(() => events.call("another-required")).toThrow("Missing required Event handler [another-required].");
});

test("Required handler", () => {
	const events = Events<"this-is-required" | "another-required">();
	const stack: string[] = [];
	events.required("this-is-required", "another-required");
	events.on("this-is-required", () => stack.push("yaay!"));
	events.call("this-is-required");
	expect(stack).toEqual(["yaay!"]);
});
