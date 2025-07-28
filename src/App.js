import * as React from 'react';
import {alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/navigation/AppNavbar';
import Header from './components/navigation/Header';
import Combat from './components/combat/Combat';
import Characters from './components/characters/Characters';
import Maps from './components/maps/Maps';
import Notes from './components/notes/Notes';
import Search from './components/search/Search';
import Settings from './components/settings/Settings';
import About from './components/about/About';
import SideMenu from './components/navigation/SideMenu';
import AppTheme from './shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import Storage from "./util/Storage";
import SearchWiki from "./components/search/SearchWiki";
import { db } from "./util/Firebase.js"
import {doc, getDoc} from "firebase/firestore";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function App(props) {
    Storage("createIfNeeded", true, "Confirm", "deleting a combatant")
    Storage("createIfNeeded", true, "Confirm", "deleting a character")
    Storage("createIfNeeded", true, "Confirm", "deleting a note")
    const [wikiData, setWikiData] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [tab, setTab] = React.useState("Combat");

    React.useEffect(() => {
        const wikiData = Storage("get", "", "wiki-data")
        if (wikiData) {
            setWikiData(wikiData)
        } else {
            getDoc(doc(db, "wiki-data", "index")).then(res => {
                if (res.exists()) {
                    Storage("set", res.data()["index"], "wiki-data");
                    setWikiData(res.data()["index"]);
                } else {
                    console.error("wiki-data not found!");
                }
            })
        }
    }, [])

    if (tab.slice(0, 6) === "Update") {
        setTab(tab.slice(6));
    }

    // ToDo: Make tabs functionality cleaner
    // ToDo: Make feedback tab
    const tabs = {
        Combat: Combat,
        Characters: Characters,
        Maps: Maps,
        Notes: Notes,
        Search: Search,
        Settings: Settings,
        About: About
    };
    const SelectedTab = tabs[tab];

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
            <SideMenu setTab={setTab} tab={tab} />
            <AppNavbar setTab={setTab} tab={tab} />
            <Box
                component="main"
                sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
                overflow: 'auto',
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                    }}
                >
                    <Header tab={tab} setTab={setTab}/>
                    <SelectedTab search={search} setSearch={setSearch} setTab={setTab} wikiData={wikiData} setWikiData={setWikiData} />
                </Stack>
            </Box>
            </Box>
        </AppTheme>
    );
}
