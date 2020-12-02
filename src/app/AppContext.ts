export interface AppContext {
	client: any

	setClient: (client: any) => void

	setTitle: (title: string) => void

	useTitle: (title: string) => void
}

export declare function useAppContext(): AppContext
