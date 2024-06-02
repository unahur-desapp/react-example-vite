import { useState } from "react";
import { customStyles } from "../../styles/phrases-custom-styles";

const ALL_PHRASES = ["¡No contaban con mi astucia!", "Se aprovechan de mi nobleza",
  "Síganme los buenos", "Que no panda el cúnico", "Todos mis movimientos están fríamente calculados",
  "I'll be back", "Hasta la vista, baby",
  "I need your clothes, your boots, and your motorcycle", "You're terminated",
  "May the Force be with you", "I am your father",
  "A long time ago in a galaxy far, far away...", "The dark side is in our blood"];


function Title() {
  return <div>
    <h1>Lista de frases - versión 4</h1>
  </div>;
}

function ListOfPhrases() {
  const [renderedPhrases, setRenderedPhrases] = useState(ALL_PHRASES);
  const [indexAddedPhrase, setIndexAddedPhrase] = useState(1);
  const [colorForPhrases, setColorForPhrases] = useState('black');

  const deletePhrase = (phrase) => {
    setRenderedPhrases(current => current.filter(storedPhrase => storedPhrase !== phrase));
  }

  const addFixedPhrase = () => {
    setRenderedPhrases(current => [`Frase agregada ${indexAddedPhrase}`, ...current]);
    setIndexAddedPhrase(current => current + 1);
  }
    
  console.log('renderizando ListOfPhrases');
  
  return (
    <div style={customStyles.allPhrasesFrame}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '1rem'}}>
        <button style={{color: '#d32f2f', borderColor: '#d32f2f', backgroundColor: '#ffcdd2'}} onClick={() => addFixedPhrase()}>
          Agregar
        </button>
      </div>
      <div style={customStyles.phraseList}>
        <div style={customStyles.colorSelectionBar}>
            {["crimson", "slateblue", "mediumseagreen"].map(color => (
              <button key={color} onClick={() => setColorForPhrases(color)} style={{ color }}>{color}</button>
            ))}
        </div>
        {renderedPhrases.map(phrase => (
          <div key={phrase} style={{...customStyles.phraseRow}}>
            <div style={{...customStyles.phrase, ...customStyles.phraseTall, color: colorForPhrases}}>
              {phrase}
            </div>
            <div style={{ height: 'fit-content' }}>
              <button style={{ color: colorForPhrases }} onClick={() => deletePhrase(phrase)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Phrases() {
  return <>
    <Title />
    <ListOfPhrases />
  </>;
}
