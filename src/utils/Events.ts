export interface IEventCallback<TData> {
	(data: TData): boolean | void
}

export interface IEvent<TData> {
	priority: number
	callback: IEventCallback<TData>
}

export interface IEvents {
	/**
	 * Internal map of current event handlers, should not be touched directly in any way!
	 */
	events: { [key: string]: IEvent<any>[] }
	/**
	 * Registers a handler of the given event name.
	 */
	on: <TData>(event: string, callback: IEventCallback<TData>, priority?: number) => IEvents
	/**
	 * Call handlers of the given event name.
	 */
	call: (event: string, ...data: any) => IEvents
}

/**
 * Simple EventBus implementation intended to be used locally on call site near to the execution site (thus not application-wise).
 */
export function Events(): IEvents {
	return {
		events: {},
		on: function (event, callback, priority = 100): IEvents {
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
}
