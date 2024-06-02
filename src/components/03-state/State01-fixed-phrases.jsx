import { customStyles } from "../../styles/phrases-custom-styles";

const ALL_PHRASES = ["¡No contaban con mi astucia!", "Se aprovechan de mi nobleza",
  "Síganme los buenos", "Que no panda el cúnico", "Todos mis movimientos están fríamente calculados",
  "I'll be back", "Hasta la vista, baby",
  "I need your clothes, your boots, and your motorcycle", "You're terminated",
  "May the Force be with you", "I am your father",
  "A long time ago in a galaxy far, far away...", "The dark side is in our blood"];


function Title() {
  return <div>
    <h1>Lista de frases - versión 1</h1>
  </div>;
}

export function ListOfPhrases() {
  return <div style={customStyles.allPhrasesFrame}>
    <div style={customStyles.phraseList}>
      {ALL_PHRASES.map(phrase => (
        <div key={phrase} style={customStyles.phraseRow}>
          <div style={{...customStyles.phrase, ...customStyles.phraseTall, ...customStyles.colorForPhrase}}>
            {phrase}
          </div>
          <div style={{ height: 'fit-content' }}>
            <button onClick={() => console.log(`Debería eliminar ${phrase}`)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
}

export function Phrases() {
  return <>
    <Title />
    <ListOfPhrases />
  </>;
}
