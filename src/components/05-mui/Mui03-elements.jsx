import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { addPhrase, deletePhrase, getAllPhrases } from "../../services/phrases";
import { customStyles } from "../../styles/phrases-custom-styles-mui";

function Title() {
  const theme = useTheme();
  const isVeryNarrowViewpoint = useMediaQuery(theme.breakpoints.only('xs'));
  const isNarrowViewpoint = useMediaQuery(theme.breakpoints.down('md'));
  const title = 'Lista de frases desde BE con MUI - versión 3';

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

function ListOfPhrases() {
  const theme = useTheme();
  const isVeryNarrowViewpoint = useMediaQuery(theme.breakpoints.only('xs'));

  const [renderedPhrases, setRenderedPhrases] = useState();
  const indexAddedPhrase = useRef(0);
  const [colorForPhrases, setColorForPhrases] = useState('black');

  const fetchPhrases = useCallback(async () => {
    const obtainedData = await getAllPhrases();
    setRenderedPhrases(obtainedData);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      fetchPhrases();
    }, 500);
  }, []);

  const deletePhraseHandler = useCallback(async (phrase) => {
    await deletePhrase(phrase);
    await fetchPhrases();
  }, []);

  const addFixedPhrase = useCallback(async () => {
    indexAddedPhrase.current = indexAddedPhrase.current + 1;
    await addPhrase(`Frase agregada ${indexAddedPhrase.current}`);
    await fetchPhrases();
  }, []);

  return (
    <Stack flexDirection='column' sx={{ mx: { xs: '5%', sm: '8%', md: '15%' } }}>
      <Stack flexDirection='row' justifyContent='flex-end' sx={{ mr: 2 }}>
        <button style={{ color: '#d32f2f', borderColor: '#d32f2f', backgroundColor: '#ffcdd2' }} onClick={() => addFixedPhrase()}>
          Agregar
        </button>
      </Stack>
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
        {!renderedPhrases && <div>Cargando frases ...</div>}
        {renderedPhrases && colorForPhrases &&
          renderedPhrases.map(phrase => (
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
        {renderedPhrases && !colorForPhrases &&
          <div>Elegir un color para ver las frases ...</div>
        }
      </Stack>
    </Stack>
  );
}

export function Phrases() {
  return <>
    <Title />
    <ListOfPhrases />
  </>;
}
