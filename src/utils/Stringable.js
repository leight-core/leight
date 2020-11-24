class Stringable {
	constructor(item, value = "id") {
		this.item  = item;
		this.value = value;
	}

	toString() {
		return this.item[this.value];
	}
}

export default Stringable;
