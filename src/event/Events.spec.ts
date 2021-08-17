import {Events} from "./Events";
import {IEventHandlers, IEventResult} from "./interface";

interface ITestEventHandlers extends IEventHandlers {
	test: () => IEventResult;
}

interface IRequiredEventHandlers extends IEventHandlers {
	thisIsRequired: () => IEventResult;
	anotherRequired: () => IEventResult;
	junc: (junc: string) => void;
}

const TestEvents = () => Events<"test", ITestEventHandlers>();
const RequiredEvents = () => Events<"thisIsRequired" | "anotherRequired" | "junc", IRequiredEventHandlers>();

test("Event order", () => {
	const events = TestEvents();
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

test("Event dismiss", () => {
	const events = TestEvents();
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
	events.handler("test")();
	expect(stack).toEqual(["first", "second", "last", "first", "second", "last"]);
	events.cleaner()();
	events.handler("test")();
	expect(stack).toEqual(["first", "second", "last", "first", "second", "last"]);
});

test("Events chaining", () => {
	const events = TestEvents();
	const globals = TestEvents();
	const stack: string[] = [];
	events.chain(globals);
	events.on("test", () => stack.push("first"), 10);
	globals.on("test", () => stack.push("second"), 20);
	events.on("test", () => stack.push("third"), 30);
	events.handler("test")();
	expect(stack).toEqual(["first", "second", "third"]);
});

test("Breaking events", () => {
	const events = TestEvents();
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
	const events = RequiredEvents();
	events.required("thisIsRequired", "anotherRequired");
	expect(() => events.handler("anotherRequired")()).toThrow("Missing required Event handler [anotherRequired].");
});

test("Required handler", () => {
	const events = RequiredEvents();
	const stack: string[] = [];
	events.required("thisIsRequired", "anotherRequired");
	events.on("thisIsRequired", () => stack.push("yaay!"));
	events.handler("thisIsRequired")();
	expect(stack).toEqual(["yaay!"]);
});
