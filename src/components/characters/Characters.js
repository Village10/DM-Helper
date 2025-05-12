import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import EditButton from "./buttons/EditButton";
import NewButton from "./buttons/NewButton";
import DeleteButton from "./buttons/DeleteButton";
import {CardActionArea} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Storage from "../../util/Storage";
import DetailsButton from "./buttons/DetailsButton";
import PersonIcon from "@mui/icons-material/Person";

export default function Characters({setSearch, setTab}) {

    let [selected, setSelected] = React.useState(null);

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Typography variant="h1" align="center" style={{marginBottom: 20}}>Characters</Typography>
            <Grid
                container
                spacing={2}
                sx={{mb: (theme) => theme.spacing(2)}}
                justifyContent="space-between"
            >
                <Grid container>
                    <DetailsButton selected={selected} setSelected={setSelected} setSearch={setSearch} setTab={setTab} ></DetailsButton>
                </Grid>
                <Grid container>
                    <EditButton selected={selected} setSelected={setSelected} ></EditButton>
                    <NewButton selected={selected} setSelected={setSelected} ></NewButton>
                    <DeleteButton selected={selected} setSelected={setSelected} ></DeleteButton>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {Storage("get", "", "Characters").map((item) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                        <CardActionArea onClick={() => {
                            if (!selected) {
                                setSelected(item)
                            } else if (selected.id !== item.id) {
                                setSelected(item)
                            }
                            else {
                                setSelected(null)
                            }
                        }}>
                            <Card sx={{ height: '100%', border: selected ? item.id === selected.id ? "1px solid red": "1px solid #2f2f2f" : "1px solid #2f2f2f" }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'right',
                                        justifyContent: 'right',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {item.level}
                                </Box>
                                <CardContent>
                                    <Typography
                                        component="h2"
                                        variant="subtitle2"
                                        gutterBottom
                                        sx={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}
                                    >
                                        <PersonIcon/>{item.name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                                        Max Health: {item.maxHealth}<br/>
                                        Armor Class: {item.armor}<br/>
                                        Class: {item.mainClass}<br/>
                                        Sub-Class: {item.subClass}<br/>
                                        Species: {item.species}<br/>
                                        Background: {item.background}<br/>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}