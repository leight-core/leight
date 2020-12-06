export interface IEventCallback<TData = any> {
	(data: TData): boolean | any
}

export interface IEvent<TData = any> {
	priority: number
	callback: IEventCallback<TData>
}

export interface IEvents {
	/**
	 * Internal map of current event handlers, should not be touched directly in any way!
	 */
	events: { [key: string]: IEvent[] }
	/**
	 * Internal array of chained event handlers.
	 */
	chains: IEvents[],
	/**
	 * Registers a handler of the given event name.
	 */
	on: <TData extends Object = any>(event: string, callback: IEventCallback<TData>, priority?: number) => IEvents
	/**
	 * Call handlers of the given event name.
	 */
	call: <TData extends Object = any>(event: string, data?: TData) => IEvents
	/**
	 * Chain with the given events (events still respects event handler priority).
	 *
	 * @param events
	 *
	 * @return Events instance chain method was called on.
	 */
	chain: (events: IEvents) => IEvents
}

/**
 * Simple EventBus implementation intended to be used locally on call site near to the execution site (thus not application-wise).
 */
export function Events(): IEvents {
	return {
		events: {},
		chains: [],
		on: function (event, callback, priority = 100) {
			(this.events[event] = this.events[event] || []).push({
				priority,
				callback,
			});
			return this;
		},
		call: function (event, data) {
			[this].concat(this.chains)
				.reduce((array, item) => array.concat(item.events[event] || []), [] as IEvent[])
				.sort((a, b) => a.priority - b.priority)
				.find(item => item.callback(data) === false);
			return this;
		},
		chain: function (events) {
			this.chains.push(events);
			return this;
		}
	};
}
