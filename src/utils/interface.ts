/**
 * Encapsulated event callback result to deduplicate all that stuff with the cost of lengthy type name.
 */
export type IEventResult = boolean | any;

/**
 * A shape of event handler - some arguments and optional boolean return.
 */
export interface IEventCallback {
	(...args): IEventResult
}

/**
 * Internal event structure.
 */
export interface IEvent {
	priority: number
	callback: IEventCallback
}

/**
 * Base interface for any event handlers - it's just marker interface
 * to keep types on track (aligned to what IEvents expects).
 */
export type IEventHandlers<T extends string> = {
	[index in T]: IEventCallback
} & { types: T }

/**
 * Simple EventBus nicely typed to keep all the things in the right way.
 */
export interface IEvents<TEventTypes extends string, TEventHandlers extends IEventHandlers<TEventTypes>> {
	/**
	 * Internal map of current event handlers, should not be touched directly in any way!
	 */
	events: any
	/**
	 * Internal array of chained event handlers.
	 */
	chains: any[],
	requires: any[],
	/**
	 * Registers a handler of the given event name.
	 */
	on: <T extends TEventHandlers, U extends TEventTypes>(event: U, callback: T[U], priority?: number) => IEvents<TEventTypes, TEventHandlers>
	/**
	 * Returns the handler of an event.
	 */
	handler: <T extends TEventTypes, U extends TEventHandlers, >(event: T) => U[T];
	/**
	 * Set required event handlers; when required event is called, but handler not present, an error is thrown.
	 *
	 * @param events
	 */
	required: (...events: TEventTypes[]) => IEvents<TEventTypes, TEventHandlers>
	/**
	 * Chain with the given events (events still respects event handler priority).
	 *
	 * @param events
	 *
	 * @return Events instance chain method was called on.
	 */
	chain: (events: IEvents<any, any>) => IEvents<TEventTypes, TEventHandlers>
}
