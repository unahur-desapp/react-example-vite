import { Box, Card, CardMedia, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";

const unknownLanguageImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg";

const exampleJsFunction = `
function duplString(str) {
  return str.concat(str);
}
`;

const exampleGoFunction = `
func duplString(str string) string {
  return (str + str)
}
`;

const exampleJavaFunction = `
public class StringFunctions {
  public static String duplString(String str) {
    return str+str;
  }
}
`;

const allLanguages = [
  { id: 1, name: 'JavaScript', exampleCode: exampleJsFunction, image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' }, 
  { id: 2, name: 'Go', exampleCode: exampleGoFunction, image: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*vQUKiQ8tn16YGdYlO-B5fA.png' },
  { id: 3, name: 'Java', exampleCode: exampleJavaFunction, image: 'https://heise.cloudimg.io/width/610/q70.png-lossy-70.webp-lossy-70.foil1/_www-heise-de_/imgs/18/2/4/4/2/4/8/2/Bildschirmfoto_2018-05-30_um_08-6aae3c7af906438d.png' },
];

function formatLineOfCode(line) {
  let leadingSpaceCount = 0;
  while (line[leadingSpaceCount] === ' ') {
    leadingSpaceCount++;
  }
  if (leadingSpaceCount === line.length) {
    return '';
  } else if (leadingSpaceCount === 0) {
    return line;
  } else {
    return <span style={{ marginLeft: `${leadingSpaceCount*8}px`}}>{line}</span>;
  }
}

function CodeSnippet({ code }) {
  const theme = useTheme();
  const isLargeViewpoint = useMediaQuery(theme.breakpoints.up('lg'));
  const isVeryNarrowViewpoint = useMediaQuery(theme.breakpoints.only('xs'));

  const lines = code.split('\n').filter(line => line.length > 0);
  const maxLineLength = Math.max(...lines.map(line => line.length));
  const styles = {};
  if (isLargeViewpoint) {
    if (maxLineLength > 50) {
      styles.fontSize = '0.64rem';
    } else if (maxLineLength > 45) {
      styles.fontSize = '0.7rem';
    }
  } else if (isVeryNarrowViewpoint) {
    if (maxLineLength > 45) {
      styles.fontSize = '0.55rem';
    } else if (maxLineLength > 35) {
      styles.fontSize = '0.7rem';
    }
  }
  return <Stack direction='column'>
    { lines.map((line, ix) => <Box key={ix} typography='code' sx={styles}>
      {formatLineOfCode(line)}
    </Box>) }
  </Stack>;
}

function LargeLanguageCard({ language }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'row' }} elevation={2}>
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>{language.name}</Box>
      { language.exampleCode && <CodeSnippet code={language.exampleCode} /> }
    </Stack>
    <CardMedia
      component="img"
      image={language.image || unknownLanguageImage}
      alt={language.name}
      sx={{ width: { xs: 140, sm: 200 }, height: 200 }}
    />
  </Card>;
}

function NarrowLanguageCard({ language }) {
  return <Stack direction='row' justifyContent='center'>
    <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column', width: 300 }} elevation={2}>
      <CardMedia
        component="img"
        image={language.image || unknownLanguageImage}
        alt={language.name}
        sx={{ height: 240 }}
      />
      <Box sx={{ ml: 2, mt: 2, mb: 6 }}>
        <Box sx={{ typography: 'h5', mb: 2 }}>{language.name}</Box>
        { language.exampleCode && <CodeSnippet code={language.exampleCode} /> }
      </Box>
    </Card>
  </Stack>
  ;
}

function LanguageCard({ language }) {
  const theme = useTheme();
  const isVeryNarrowViewpoint = useMediaQuery(theme.breakpoints.only('xs'));

  return isVeryNarrowViewpoint ? <NarrowLanguageCard language={language} /> : <LargeLanguageCard language={language} />;
}

export function LanguagesPage() {
  return <Stack direction='column'  sx={{ mx: 2 }}>
    <Stack direction='row' justifyContent='center'>
      <Typography variant='h3' sx={{ my: 2, color: blue[800] }}>Lenguajes</Typography>
    </Stack>
    <Grid container direction='row'>
      { allLanguages.map(languageData => (
        <Grid item key={languageData.id} xs={12} lg={6} sx={{ px: 4, py: 2 }}><LanguageCard language={languageData} /></Grid>
      )) }
    </Grid>
  </Stack>;    
}