import { createTheme } from "@mui/material";

export const customMuiTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
            fontStyle: 'italic',
        },
        subtitle1: {
            fontSize: '1.3rem'
        }
    },
    palette: {
        relaxed: {
            main: "#eeeeee",
            dark: "#e0e0e0",
        }
    },
});
