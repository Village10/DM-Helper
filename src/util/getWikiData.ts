import { doc, getDoc } from 'firebase/firestore'

import { db } from './firebase'
import storage from './storage'
import {Dispatch, SetStateAction} from "react";

export default function getWikiData(
    setWikiData: Dispatch<SetStateAction<{ name: string, tags: string[] }[] | null>>
) {
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
