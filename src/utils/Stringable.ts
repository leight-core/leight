export type IStringIndex = { [key: string]: string };

export class Stringable<TItem extends IStringIndex> {
	private readonly item: TItem;
	private readonly value: string;

	constructor(item: TItem, value = "id") {
		this.item = item;
		this.value = value;
	}

	toString() {
		return this.item[this.value];
	}
}
