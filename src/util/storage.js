export default function storage(action, value, main, secondary) {
	const item = localStorage.getItem(main)
	switch (action) {
	case 'set':
		if (secondary) {
			const original = JSON.parse(item)
			original[secondary] = value
			localStorage.setItem(main, JSON.stringify(original))
		} else {
			localStorage.setItem(main, JSON.stringify(value))
		}
		break

	case 'get':
		if (item) {
			if (secondary) {
				return JSON.parse(item)[secondary]
			} else {
				return JSON.parse(item)
			}
		}
		break

	case 'push':
		if (secondary) {
			if (item) {
				const original = JSON.parse(item)
				original[secondary].push(value)
				localStorage.setItem(main, JSON.stringify(original))
			}
		} else {
			const original = JSON.parse(item)
			original.push(value)
			localStorage.setItem(main, JSON.stringify(original))
		}
		break

	case 'delete':
		if (secondary) {
			if (item) {
				const original = JSON.parse(item)
				delete original[secondary]
				localStorage.setItem(main, JSON.stringify(original))
			}
		} else {
			localStorage.removeItem(main)
		}
		break

	case 'createIfNeeded':
		if (item) {
			if (secondary) {
				if (!Object.keys(JSON.parse(item)).includes(secondary)) {
					const original = JSON.parse(item)
					original[secondary] = value
					localStorage.setItem(main, JSON.stringify(original))
				}
			}
		} else {
			if (secondary) {
				localStorage.setItem(main, JSON.stringify({
					[secondary]: value
				}))
			} else {
				localStorage.setItem(main, JSON.stringify(value))
			}
		}
		break

	default:
		console.warn(`Unknown Storage action: ${action}`)
		break
	}
}