import Typography from "@mui/material/Typography";
import * as React from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import { db } from "../../util/firebase.js"
import { toStorable } from "../../util/misc.js"
import storage from "../../util/storage"
import { getDoc, doc } from "firebase/firestore"

export default function Search(props) {
    const [searchResult, setSearchResult] = React.useState(null);

    // TODO: Make search work on enter from another tab

    return (
        <>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Search</Typography>
            <Stack spacing={2} sx={{ width: "75%" }}>
                <Autocomplete
                    id="search-bar"
                    value={props.search}
                    freeSolo
                    onChange={(event, newValue) => {
                        if (newValue) {
                            document.getElementById("search-bar").blur();
                            const storableValue = toStorable(newValue);
                            let cache = storage("get", "", "search-cache") || {}
                            if (cache[storableValue]) {
                                setSearchResult(cache[storableValue])
                            } else {
                                getDoc(doc(db, "wiki-data", storableValue)).then(res => {
                                    if (res.exists()) {
                                        const data = res.data().html
                                        setSearchResult(data);
                                        cache[storableValue] = data;
                                        if (Object.keys(cache).length > 10) {
                                            delete cache[Object.keys(cache)[0]]
                                        }
                                        storage("set", cache, "search-cache");
                                    } else {
                                        console.error('Could not find ', storableValue)
                                    }
                                })
                            }
                        }
                    }}
                    autoFocus
                    options={props.wikiData ? props.wikiData.map((item) =>
                        item.tags.includes("Monster") ? item.name + " (Monster)" : item.name
                    ) : ["Loading..."]}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Search..."
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {!props.wikiData ? <CircularProgress color="inherit" size={20}/> : null}
                                            {params.InputProps?.endAdornment}
                                        </React.Fragment>
                                    ),
                                }
                            }}
                        />}
                />
            </Stack>
            <div
                className="custom-style"
                dangerouslySetInnerHTML={{__html: searchResult}}
                style={{width: "75%"}}
            ></div>
        </>
    )
}