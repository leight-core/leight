export interface IOutputMapper {
	<T extends Object = any>(values: T): T
}

export interface IDeepMerge {
	<T1, T2>(x: Partial<T1>, y: Partial<T2>): T1 & T2
}
