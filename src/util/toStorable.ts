
export default function toStorable(string: string) {
	if (string.slice(-10) === ' (Monster)') {
		return string
			.slice(0, -10)
			.trim()
			.toLowerCase()
			.replaceAll(' ', '-')
			.replaceAll('/', '_')
	} else {
		return string
			.trim()
			.toLowerCase()
			.replaceAll(' ', '-')
			.replaceAll('/', '_')
	}
}