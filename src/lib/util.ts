export const hashCode = (input: string): number => {
	let hash = 0;
	for (let i = 0, len = input.length; i < len; i++) {
		const chr = input.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return hash;
};
