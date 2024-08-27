import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";

const unknownLanguageImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg";

const allLanguages = [{ id: 1, name: 'JavaScript' }, { id: 2, name: 'Go' }];

function LanguageCard({ language }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'row' }} elevation={2}>
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>{language.name}</Box>
    </Stack>
    <CardMedia
      component="img"
      image={language.image || unknownLanguageImage}
      alt={language.name}
      sx={{ width: { xs: 100, sm: 140 }, height: 200 }}
    />
  </Card>;
}

export function LanguagesPage() {
  return <Stack direction='column'  sx={{ mx: 2 }}>
    <Stack direction='row' justifyContent='center'>
      <Typography variant='h3' sx={{ my: 2, color: blue[800] }}>Lenguajes</Typography>
    </Stack>
    <Grid container direction='row'>
      { allLanguages.map(languageData => (
        <Grid item key={languageData.id} xs={12} md={6} sx={{ px: 4, py: 2 }}><LanguageCard language={languageData} /></Grid>
      )) }
    </Grid>
  </Stack>;    

}