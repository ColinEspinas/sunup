/**
 * Emit an event to a target
 * @param {Object} component
 * @param {String} event
 * @param {Object} [data]
 * @param {String} [selector]
 */
export function emit(event: string, { component, detail, selector }?: string): void;
