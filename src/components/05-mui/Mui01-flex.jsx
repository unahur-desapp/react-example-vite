import { useCallback, useEffect, useRef, useState } from "react";
import { customStyles } from "../../styles/phrases-custom-styles";
import { addPhrase, deletePhrase, getAllPhrases } from "../../services/phrases";
import { Box, Stack } from "@mui/material";

function Title() {
  return <div>
    <h1>Lista de frases desde BE con MUI - versión 1</h1>
  </div>;
}

function ListOfPhrases() {
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

  return renderedPhrases ? 
    <Stack flexDirection='column' sx={{ mx: '15%' }}>
      <Stack flexDirection='row' justifyContent='flex-end' sx={{ mr: 2 }}>
        <button style={{ color: '#d32f2f', borderColor: '#d32f2f', backgroundColor: '#ffcdd2' }} onClick={() => addFixedPhrase()}>
          Agregar
        </button>
      </Stack>
      <Stack flexDirection='column' sx={{ px: 6, py: 2, mt: 4, mb: 6 }} style={customStyles.phraseList}>
        <Stack flexDirection='row' justifyContent='space-between' sx={{ my: 3, mx: 4 }}>
          {["crimson", "slateblue", "mediumseagreen", "black"].map(color => (
            <button key={color} onClick={() => setColorForPhrases(color)} style={{ color }}>{color}</button>
          ))}
          <button onClick={() => setColorForPhrases(null)} style={{ color: '#5d4037', backgroundColor: '#d7ccc8' }}>
            No mostrar
          </button>
        </Stack>
        {colorForPhrases &&
          renderedPhrases.map(phrase => (
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center' key={phrase} style={{ color: colorForPhrases }}>
              <Box sx={{ my: 2, ...customStyles.phrase, color: colorForPhrases }}>
                {phrase}
              </Box>
              <div style={{ height: 'fit-content' }}>
                <button style={{ color: colorForPhrases }} onClick={() => deletePhraseHandler(phrase)}>
                  Eliminar
                </button>
              </div>
            </Stack>
          ))
        }
        {!colorForPhrases &&
          <div>Elegir un color para ver las frases ...</div>
        }
      </Stack>
    </Stack>
  : <div>Cargando frases ...</div>;
}

export function Phrases() {
  return <>
    <Title />
    <ListOfPhrases />
  </>;
}
