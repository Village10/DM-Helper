import Typography from "@mui/material/Typography";
import * as React from "react";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import AxiosCall from "./AxiosCall";
import Storage from "../../util/Storage"
import SearchWiki from "./SearchWiki";

export default function Search(props) {
    const [search, setSearch] = React.useState(props.search ? props.search : "");
    const [loading, setLoading] = React.useState(!!props.search);
    const [wikiData, setWikiData] = React.useState([{name: "loading..."}]);
    props.setSearch("")

    React.useEffect(() => {
        const fetchWikiData = async () => {
            if (!Storage("get", "", "wikiData")) {
                Storage("set", [{name: "loading..."}], "wikiData");
                setLoading(true);
                const data = await SearchWiki();
                Storage("set", data, "wikiData");
                setWikiData(data);
                setLoading(false);
            } else {
                setWikiData(Storage("get", "", "wikiData"))
            }
        };

        fetchWikiData();
    }, [])

    return (
        <>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Search</Typography>
            <Stack spacing={2} sx={{ width: "75%" }}>
                <Autocomplete
                    id="search-bar"
                    freeSolo
                    defaultValue={search}
                    autoFocus
                    options={wikiData.map((item) => item["name"])}
                    renderInput={(params) =>
                        <TextField
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    document.getElementById("search-bar").blur()
                                    setLoading(true)
                                    setSearch(event.target.value)
                                }
                            }}
                            {...params}
                            label="Search..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps?.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />}
                />
            </Stack>
            <AxiosCall search={search} setLoading={setLoading} />
        </>
    )
}