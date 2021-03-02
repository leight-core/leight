import {IEvent, IEventHandler, IEvents} from "./interface";

/**
 * Simple EventBus implementation intended to be used locally on call site near to the execution site (thus not application-wise).
 */
export function Events<TEventTypes extends string, TEventHandlers extends IEventHandler<TEventTypes>>(): IEvents<TEventTypes, TEventHandlers> {
	return {
		events: {} as unknown as any,
		chains: [],
		requires: [],
		on: function (event, callback, priority = 100) {
			(this.events[event] = this.events[event] || []).push({
				priority,
				callback,
			});
			return this;
		},
		handler: function (event) {
			const handlers = [this].concat(this.chains)
				.reduce((array, item) => array.concat(item.events[event] || []), [] as IEvent[])
				.sort((a, b) => a.priority - b.priority);
			if (this.requires.filter(name => event === name).length > 0 && !handlers.length) {
				throw new Error(`Missing required Event handler [${event}].`);
			}
			return ((...args) => {
				handlers.find(item => item.callback(...args) === false);
			}) as unknown as any;
		},
		required: function (...events) {
			this.requires.push(...events);
			return this;
		},
		chain: function (events) {
			this.chains.push(events);
			return this;
		}
	};
}
