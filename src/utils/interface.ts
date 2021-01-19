export interface IEventCallback<TData = any> {
	(data: TData): boolean | any
}

export interface IEvent<TData = any> {
	priority: number
	callback: IEventCallback<TData>
}

export interface IEvents<TEvents extends string = any> {
	/**
	 * Internal map of current event handlers, should not be touched directly in any way!
	 */
	events: { [key: string]: IEvent[] }
	/**
	 * Internal array of chained event handlers.
	 */
	chains: IEvents[],
	requires: string[],
	/**
	 * Registers a handler of the given event name.
	 */
	on: <TData extends Object = any>(event: TEvents, callback: IEventCallback<TData>, priority?: number) => IEvents<TEvents>
	/**
	 * Call handlers of the given event name.
	 */
	call: <TData extends Object = any>(event: TEvents, data?: TData) => IEvents<TEvents>
	/**
	 * Set required event handlers; when required event is called, but handler not present, an error is thrown.
	 *
	 * @param events
	 */
	required: (...events: string[]) => IEvents<TEvents>
	/**
	 * Chain with the given events (events still respects event handler priority).
	 *
	 * @param events
	 *
	 * @return Events instance chain method was called on.
	 */
	chain: <U extends TEvents>(events: IEvents<U>) => IEvents<U>
}
