import {useEffect, useRef} from "react";

export type IIntervalCallback = () => any

export function useInterval(callback: IIntervalCallback, delay: number | null, deps: any[] = []) {
	const ref = useRef<IIntervalCallback>(() => null);

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	useEffect(() => delay && callback(), []);

	useEffect(() => {
		function tick() {
			return ref.current();
		}

		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay].concat(deps));
}
