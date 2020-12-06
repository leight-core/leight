export class Stringable<TItem extends Object, TValue extends keyof TItem> {
	private readonly item: TItem;
	private readonly value: TValue;

	constructor(item: TItem, value: TValue = "id" as unknown as TValue) {
		this.item = item;
		this.value = value;
	}

	toString() {
		return this.item[this.value as unknown as string];
	}
}
