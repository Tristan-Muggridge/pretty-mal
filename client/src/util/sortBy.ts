export default function sortBy <T>(arr: T[], category: keyof T, desc: boolean = true): T[] {
	return arr.sort( (a, b) => {
		if (a[category] > b[category]) return desc ? 1 : -1
		if (a[category] < b[category]) return desc ? -1 : 1
		return 0
	})
}