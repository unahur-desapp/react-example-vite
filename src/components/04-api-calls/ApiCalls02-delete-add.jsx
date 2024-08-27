import { useCallback, useEffect, useRef, useState } from "react";
import { customStyles } from "../../styles/phrases-custom-styles";
import { addPhrase, deletePhrase, getAllPhrases } from "../../services/phrases";

function Title() {
  return <div>
    <h1>Lista de frases desde BE - versión 2</h1>
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
    <div style={customStyles.allPhrasesFrame}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '1rem' }}>
        <button style={{ color: '#d32f2f', borderColor: '#d32f2f', backgroundColor: '#ffcdd2' }} onClick={() => addFixedPhrase()}>
          Agregar
        </button>
      </div>
      <div style={customStyles.phraseList}>
        <div style={{ ...customStyles.colorSelectionBar, justifyContent: 'space-between', marginLeft: '2rem', marginRight: '2rem' }}>
          {["crimson", "slateblue", "mediumseagreen", "black"].map(color => (
            <button key={color} onClick={() => setColorForPhrases(color)} style={{ color }}>{color}</button>
          ))}
          <button onClick={() => setColorForPhrases(null)} style={{ color: '#5d4037', backgroundColor: '#d7ccc8' }}>
            No mostrar
          </button>
        </div>
        {colorForPhrases &&
          renderedPhrases.map(phrase => (
            <div key={phrase} style={{ ...customStyles.phraseRow, color: colorForPhrases }}>
              <div style={{ ...customStyles.phrase, ...customStyles.phraseTall, color: colorForPhrases }}>
                {phrase}
              </div>
              <div style={{ height: 'fit-content' }}>
                <button style={{ color: colorForPhrases }} onClick={() => deletePhraseHandler(phrase)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        }
        {!colorForPhrases &&
          <div>Elegir un color para ver las frases ...</div>
        }
      </div>
    </div>
  : <div>Cargando frases ...</div> 
  ;
}

export function Phrases() {
  return <>
    <Title />
    <ListOfPhrases />
  </>;
}
