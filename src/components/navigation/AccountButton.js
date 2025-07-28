import * as React from "react";
import { Avatar, IconButton, Menu, Tooltip, Button } from "@mui/material";
import {doc, getDoc, setDoc} from "firebase/firestore"
import { auth, db, user } from "../../util/Firebase"
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
const provider = new GoogleAuthProvider();

export default function ProfileButton({setTab, tab}) {

    const [update, setUpdate] = React.useState(true);
    const [openMenu, setOpenMenu] = React.useState(false);
    const menuAnchor = React.useRef(React.createRef());

    // ToDo: Move to bottom of sidebar

    useEffect(() => {
        const auth = getAuth();

        // Set up the listener for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (_user) => {
            setUpdate((prev) => !prev);
        });
        setUpdate((prev) => !prev);

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => setTab("Update" + tab))
            .catch((error) => console.error(error));
        setOpenMenu(false)
    };

    if (!user) {
        return (
            <Button variant="outlined" onClick={() => {
                signInWithPopup(auth, provider).then(async (result) => {
                    const userDocRef = doc(db, "users", result.user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const savedData = docSnap.data().localStorageData;
                        Object.keys(savedData).forEach((key) => {
                            localStorage.setItem(key, savedData[key]);
                        });
                        setTab("Update" + tab)
                    } else {
                        // ToDo: Add popup confirmation message
                        const localStorageData = {...localStorage};
                        await setDoc(userDocRef, {localStorageData});
                        setTab("Update" + tab)
                    }
                }).catch((error) => {console.log(error)})}
            }>Login</Button>
        )
    }

    return (
        <>
            <Tooltip title="Profile">
                <IconButton ref={menuAnchor} onClick={() => setOpenMenu(true)} sx={{ ml: 2 }}>
                    <Avatar src={user.photoURL}>{!user.photoURL && user.displayName?.charAt(0)}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu anchorEl={menuAnchor.current} open={openMenu} onClose={() => setOpenMenu(false)}>
                <Typography variant={"h4"} >{user.displayName}</Typography>
                <Typography>{user.email}</Typography>
                <Button onClick={handleLogout}>Logout</Button>
            </Menu>
        </>
    );
};