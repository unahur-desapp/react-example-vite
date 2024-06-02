import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { addPhrase, deletePhrase, getAllPhrases } from "../../services/phrases";
import { customStyles } from "../../styles/phrases-custom-styles-mui";

function Title() {
  const theme = useTheme();
  const isVeryNarrowViewpoint = useMediaQuery(theme.breakpoints.only('xs'));
  const isNarrowViewpoint = useMediaQuery(theme.breakpoints.down('md'));
  const title = 'Lista de frases desde BE con MUI - versión 4';

  return <div>
    { !isNarrowViewpoint && <h1>{title}</h1> }
    { isNarrowViewpoint && !isVeryNarrowViewpoint && 
      <h2 style={{ color: '#1565c0', textAlign: 'center'}}>{title}</h2> }
    { isVeryNarrowViewpoint && 
      <h3 style={{ color: '#1565c0', textAlign: 'center'}}>{title}</h3> }
  </div>;
}

function ColorButtons({ setColorForPhrases }) {
  return <>
    {["crimson", "slateblue", "mediumseagreen", "black"].map(color => (
      <Button key={color} variant='outlined' onClick={() => setColorForPhrases(color)} style={{ color, borderColor: color, borderWidth: 2 }}>
        {color === 'mediumseagreen' ? 'green' : color}
      </Button>
    ))}
    <Button variant='outlined' onClick={() => setColorForPhrases(null)} style={{ color: '#5d4037', backgroundColor: '#d7ccc8' }}>
      No mostrar
    </Button>
  </>;
}

function AddPhrase({ fetchPhrases }) {
  const [newPhraseText, setNewPhraseText] = useState('');
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const doAddPhrase = useCallback(async (phraseToAdd) => {
    await addPhrase(phraseToAdd);
    setTouched(false);
    setNewPhraseText('');
    setErrorMessage(null);
    await fetchPhrases();
  }, [fetchPhrases]);

  return <Stack direction='row' alignItems='center' sx={{ mx: 6, my: 2 }}>
    <TextField label='Ingrese la nueva frase' variant='standard' fullWidth
      value={newPhraseText} onChange={event => {
        setTouched(true);
        setNewPhraseText(event.target.value);
        setErrorMessage(event.target.value.length < 5 ? 'Debe ingresar al menos 5 caracteres' : null)
      }} 
      error={touched && !!errorMessage}
      helperText={touched ? errorMessage : null}
    />
    <Button variant='contained' color='success' sx={{ ml: 4 }} onClick={() => {
      doAddPhrase(newPhraseText);
    }}>
      <Box sx={{ px: 2 }}>Agregar</Box>
    </Button>
    <Button variant='contained' color='secondary' sx={{ ml: 4 }} onClick={() => {
      setTouched(false);
      setNewPhraseText('');
      setErrorMessage(null);
    }}> 
      Limpiar
    </Button>
  </Stack>
}

function ListOfPhrases({ phrases, fetchPhrases }) {
  const theme = useTheme();
  const isVeryNarrowViewpoint = useMediaQuery(theme.breakpoints.only('xs'));

  const [colorForPhrases, setColorForPhrases] = useState('black');

  useEffect(() => {
    setTimeout(async () => {
      fetchPhrases();
    }, 500);
  }, []);

  const deletePhraseHandler = useCallback(async (phrase) => {
    await deletePhrase(phrase);
    await fetchPhrases();
  }, []);

  return (
    <Stack flexDirection='column' sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2, mt: 4, mb: 6 }} style={customStyles.phraseList}>
      { !isVeryNarrowViewpoint && 
        <Stack flexDirection='row' justifyContent='space-between' sx={{ mx: { xs: 0, md: 1, lg: 2, xl: 4 }, my: 3 }}>
          <ColorButtons setColorForPhrases={setColorForPhrases} />
        </Stack>
      }
      { isVeryNarrowViewpoint && 
        <Stack flexDirection='column' alignItems='center' sx={{ mb: 1 }}>
          <ColorButtons setColorForPhrases={setColorForPhrases} />
        </Stack>
      }
      {!phrases && <div>Cargando frases ...</div>}
      {phrases && colorForPhrases &&
        phrases.map(phrase => (
          <Stack flexDirection='row' justifyContent='space-between' alignItems='center' key={phrase} style={{ color: colorForPhrases }}>
            <Box sx={{ my: 2, ...customStyles.phrase, color: colorForPhrases }}>
              {phrase}
            </Box>
            <div style={{ height: 'fit-content' }}>
              <Button variant='contained' color='relaxed' size='small' endIcon={<DeleteIcon />}
                style={{ color: colorForPhrases }} onClick={() => deletePhraseHandler(phrase)}
              >
                Eliminar
              </Button>
            </div>
          </Stack>
        ))
      }
      {phrases && !colorForPhrases &&
        <div>Elegir un color para ver las frases ...</div>
      }
    </Stack>
  );
}

export function Phrases() {
  const [renderedPhrases, setRenderedPhrases] = useState();

  const fetchPhrases = useCallback(async () => {
    const obtainedData = await getAllPhrases();
    setRenderedPhrases(obtainedData);
  }, []);

  return <>
    <Title />
    <Stack flexDirection='column' sx={{ mx: { xs: '5%', sm: '8%', md: '15%' } }}>
      <AddPhrase fetchPhrases={fetchPhrases} />
      <ListOfPhrases phrases={renderedPhrases} fetchPhrases={fetchPhrases} />
    </Stack>
  </>;
}
