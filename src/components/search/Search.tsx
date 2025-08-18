import Typography from '@mui/material/Typography'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
import { getDoc, doc } from 'firebase/firestore'

import { db } from '../../util/firebase'
import toStorable from '../../util/toStorable'
import storage from '../../util/storage'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'

interface SearchProps {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    wikiData: { name: string, tags: string[] }[] | null
}

export default function Search({search, setSearch, wikiData}: SearchProps) {

	const [searchResult, setSearchResult] = useState<string |null>(null)

	useEffect(() => {
		if (search) {
			executeSearch(search)
			setSearch('')
		}
	})

	function executeSearch(newValue: string) {
		const storableValue = toStorable(newValue)
		const cache = storage('get', '', 'search-cache') || {}
		if (cache[storableValue]) {
			setSearchResult(cache[storableValue])
		} else {
			getDoc(doc(db, 'wiki-data', storableValue)).then((res) => {
				if (res.exists()) {
					const data = res.data().html
					setSearchResult(data)
					cache[storableValue] = data
					if (Object.keys(cache).length > 10) {
						delete cache[Object.keys(cache)[0]]
					}
					storage('set', cache, 'search-cache')
				} else {
					console.error('Could not find ', storableValue)
				}
			})
		}
	}

	return (
		<>
			<Typography
				variant='h1'
				align='center'
				style={{ marginBottom: 20 }}
			>
				Search
			</Typography>
			<Stack
				spacing={2}
				sx={{ width: '75%' }}
			>
				<Autocomplete
					id='search-bar'
					value={search}
					freeSolo
					onChange={(_event, newValue) => {
						if (newValue) {
							document.getElementById('search-bar')?.blur()
							executeSearch(newValue)
						}
					}}
					autoFocus
					options={wikiData ? wikiData.map((item) =>
						item.tags.includes('monster') ? item.name + ' (Monster)' : item.name) : ['Loading...']}
					renderInput={(params) =>
						<TextField
							{...params}
							label='Search...'
							slotProps={{
								input: {
									...params.InputProps,
									endAdornment: (
										<>
											{!wikiData ? <CircularProgress
												color='inherit'
												size={20}
											/> : null}
											{params.InputProps?.endAdornment}
										</>
									)
								}
							}}
						/>}
				/>
			</Stack>
			<div
				className='custom-style'
				dangerouslySetInnerHTML={{ __html: searchResult ?? '' }}
				style={{ width: '75%' }}
			/>
		</>
	)
}