import { doc, getDoc } from 'firebase/firestore'

import { db } from './firebase'
import storage from './storage'

export default function getWikiData(setWikiData) {
	const wikiData = storage('get', '', 'wiki-data')
	if (wikiData) {
		setWikiData(wikiData)
	} else {
		getDoc(doc(db, 'wiki-data', 'index')).then((res) => {
			if (res.exists()) {
				storage('set', res.data().index, 'wiki-data')
				setWikiData(res.data().index)
			} else {
				console.error('wiki-data not found!')
			}
		})
	}
}
