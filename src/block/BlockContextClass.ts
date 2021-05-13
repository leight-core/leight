import {Dispatch, SetStateAction} from "react";
import {IBlockContext} from "./interface";

export class BlockContextClass implements IBlockContext {
	lockState: [boolean, Dispatch<SetStateAction<boolean>>];
	countState: [number, Dispatch<SetStateAction<number>>];
	lock: boolean;

	constructor(lockState: [boolean, Dispatch<SetStateAction<boolean>>], countState: [number, Dispatch<SetStateAction<number>>], lock = false) {
		this.lockState = lockState;
		this.countState = countState;
		this.lock = lock;
	}

	public count(): number {
		return this.countState[0];
	}

	public block(temp: boolean = false): void {
		if (temp) {
			return this.lockState[1](true);
		}
		this.countState[1](prev => prev + 1);
	}

	public isBlocked(): boolean {
		return this.countState[0] > 0 || this.lock;
	}

	public unblock(unlock: boolean = false): void {
		this.lock && this.lockState[1](false);
		this.countState[1](unlock ? 0 : prev => Math.max(0, prev - 1));
	}
}
