/**
 * @typedef {function} EventsInstanceOnCallbackType
 * @param {...*} [data] If the call site sends some data, callback will get them.
 * @return {?boolean} If the event loop should be stopped, it's possible to return (boolean) `false`; any other values are ignored.
 */
/**
 * @typedef {function} EventsInstanceOnType
 * @param {string} event Handler will be executed when this event name occurs.
 * @param {EventsInstanceOnCallbackType} callback Handler itself; it receives data set by the calling site (for example data from API).
 * @param {number} [priority] It's possible to sort events by a priority; sorting is done in call-time.
 * @return {EventsInstanceType}
 */
/**
 * @callback EventsInstanceCallType
 * @param {string} event Execute events with the given name.
 * @param {...*} [data] Pass any data to event handlers.
 */
/**
 * @typedef {Object} EventType
 * @property {number} priority Event priority
 */
/**
 * @typedef {Object} EventsInstanceType
 * @property {Object.<String,EventType>} events Internal map of current event handlers, should not be touched directly in any way!
 * @property {EventsInstanceOnType} on Registers a handler of the given event name.
 * @property {EventsInstanceCallType} call Call handlers of the given event name.
 */

/**
 * Simple EventBus implementation intended to be used locally on call site near to the execution site (thus not application-wise).
 *
 * @return {EventsInstanceType}
 */
const Events = () => {
	return {
		events: {},
		on:     function (event, callback, priority) {
			(this.events[event] = this.events[event] || []).push({
				priority,
				callback
			});
			return this;
		},
		call:   function (event, ...data) {
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
