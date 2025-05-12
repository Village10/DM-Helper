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

  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState("Combat");

  if (tab.slice(0, 6) === "Update") {
      setTab(tab.slice(6));
  }

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
            <SelectedTab search={search} setSearch={setSearch} setTab={setTab}/>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
