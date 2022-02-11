export interface IFingerprintContext {
	readonly fingerprint: string;
}

export interface IBrowserDetectionContext {
	isBrowser(): boolean;

	isMobile(): boolean;

	isTablet(): boolean;
}
