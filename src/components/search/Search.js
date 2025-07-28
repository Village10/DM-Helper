import Typography from "@mui/material/Typography";
import * as React from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import { db } from "../../util/Firebase.js"
import { toStorable } from "../../util/misc.js"
import Storage from "../../util/Storage"
import { getDoc, doc } from "firebase/firestore"

export default function Search(props) {
    const [loading, setLoading] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState(null);

    // ToDo: Make autocomplete not error on empty
    return (
        <>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Search</Typography>
            <Stack spacing={2} sx={{ width: "75%" }}>
                <Autocomplete
                    id="search-bar"
                    value={props.search}
                    freeSolo
                    onChange={(event, newValue) => {
                        document.getElementById("search-bar").blur();
                        const storableValue = toStorable(newValue);
                        let cache = Storage("get", "", "search-cache") || {}
                        if (cache[storableValue]) {
                            setSearchResult(cache[storableValue])
                        } else {
                            getDoc(doc(db, "wiki-data", storableValue)).then(res => {
                                if (res.exists()) {
                                    const data = res.data()["html"]
                                    console.log(data)
                                    setSearchResult(data);
                                    cache[storableValue] = data;
                                    if (Object.keys(cache).length > 10) {
                                        delete cache[Object.keys(cache)[0]]
                                    }
                                    Storage("set", cache, "search-cache");
                                } else {
                                    console.error('Could not find ', storableValue)
                                }
                            })
                        }
                    }}
                    autoFocus
                    options={props.wikiData ? props.wikiData.map((item) => item["name"]) : ["Loading..."]}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Search..."
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading || !props.wikiData ? <CircularProgress color="inherit" size={20}/> : null}
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
            ></div>
        </>
    )
}