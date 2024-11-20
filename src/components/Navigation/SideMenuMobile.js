import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import titleimage from "../../images/favicon.ico";

export default function SideMenuMobile({ open, toggleDrawer }) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                [`& .${drawerClasses.paper}`]: {
                    backgroundImage: 'none',
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Stack
                sx={{
                    maxWidth: '70dvw',
                    height: '100%',
                }}
            >
                <Stack
                    sx={{
                        maxWidth: '70dvw',
                        height: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img src={titleimage} alt="Logo" style={{width: '60%', padding: '20px'}}/>
                </Stack>
                <Stack sx={{flexGrow: 1}}>
                    <MenuContent/>
                    <Divider/>
                </Stack>
            </Stack>
        </Drawer>
    );
}
