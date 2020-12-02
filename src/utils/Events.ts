export interface IEventCallback {
	(...data: any): boolean
}

export interface IEvent {
	priority: number
	callback: IEventCallback
}

export interface IEvents {
	/**
	 * Internal map of current event handlers, should not be touched directly in any way!
	 */
	events: { [key: string]: IEvent[] }
	/**
	 * Registers a handler of the given event name.
	 */
	on: (event: string, callback: IEventCallback, priority: number) => IEvents
	/**
	 * Call handlers of the given event name.
	 */
	call: (event: string, ...data: any) => IEvents
}

/**
 * Simple EventBus implementation intended to be used locally on call site near to the execution site (thus not application-wise).
 */
const Events = (): IEvents => {
	return {
		events: {},
		on: function (event, callback, priority): IEvents {
			(this.events[event] = this.events[event] || []).push({
				priority,
				callback,
			});
			return this;
		},
		call: function (event, ...data): IEvents {
			for (const item of (this.events[event] || []).sort((a, b) => a.priority - b.priority)) {
				if (item.callback(...data) === false) {
					break;
				}
			}
			return this;
		},
	};
};

export default Events;
