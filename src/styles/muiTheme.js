import { createTheme } from "@mui/material";

export const customMuiTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
            fontStyle: 'italic',
        },
    },
    palette: {
        relaxed: {
            main: "#eeeeee",
            dark: "#e0e0e0",
        }
    },
});
