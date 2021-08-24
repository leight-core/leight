export interface IFingerprintContext {
	readonly fingerprint: string;
	setFingerprint: (fingerprint: string) => void;
}
