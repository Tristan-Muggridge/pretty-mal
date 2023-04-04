export default function sortBy <T>(arr: T[], category: keyof T, order: 'asc' | 'desc'): T[] {
	return arr.sort( (a, b) => {
		if (a[category] > b[category]) return order == 'desc' ? 1 : -1
		if (a[category] < b[category]) return order == 'desc' ? -1 : 1
		return 0
	})
}