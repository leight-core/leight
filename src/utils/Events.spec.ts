import {Events} from "./Events";
import {IEventHandler, IEventResult} from "./interface";

interface ITestEvents extends IEventHandler {
	test: () => IEventResult
}

interface IRequiredEvents extends IEventHandler {
	thisIsRequired: () => IEventResult
	anotherRequired: () => IEventResult
}

test("Event order", () => {
	const events = Events<ITestEvents>();
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
	events.handler("test")();
	expect(stack).toEqual(["first", "second", "last"]);
});

test("Events chaining", () => {
	const events = Events<ITestEvents>();
	const globals = Events<ITestEvents>();
	const stack: string[] = [];
	events.chain(globals);
	events.on("test", () => stack.push("first"), 10);
	globals.on("test", () => stack.push("second"), 20);
	events.on("test", () => stack.push("third"), 30);
	events.handler("test")();
	expect(stack).toEqual(["first", "second", "third"]);
});

test("Breaking events", () => {
	const events = Events<ITestEvents>();
	const stack: string[] = [];
	events.on("test", () => stack.push("nope!"), 100);
	events.on("test", () => stack.push("another nope!"), 101);
	events.on("test", () => {
		stack.push("yep!");
		return false;
	}, 50);
	events.on("test", () => stack.push("wanna this!"), 30);
	events.handler("test")();
	expect(stack).toEqual(["wanna this!", "yep!"]);
});

test("Missing required handler", () => {
	const events = Events<IRequiredEvents>();
	events.required("thisIsRequired", "anotherRequired");
	expect(() => events.handler("anotherRequired")()).toThrow("Missing required Event handler [anotherRequired].");
});

test("Required handler", () => {
	const events = Events<IRequiredEvents>();
	const stack: string[] = [];
	events.required("thisIsRequired", "anotherRequired");
	events.on("thisIsRequired", () => stack.push("yaay!"));
	events.handler("thisIsRequired")();
	expect(stack).toEqual(["yaay!"]);
});
