import localClasses from "./CSSBasic.module.css";
import localClasses2 from "./CSSBasic2.module.css";

const CHAPULIN_DATA = {
  title: 'Chapulín colorado',
  imageURL: "https://res.cloudinary.com/remezcla/images/f_auto,q_auto/v1639757764/production/El_Chapulin_Colorado_Film/El_Chapulin_Colorado_Film.jpeg?_i=AA",
  phrases: ["¡No contaban con mi astucia!", "Se aprovechan de mi nobleza",
    "Síganme los buenos", "Que no panda el cúnico", "Todos mis movimientos están fríamente calculados"],
}

const TERMINATOR_DATA = {
  title: 'Terminator',
  imageURL: "https://www.cinematographe.it/wp-content/uploads/2019/11/16hVhjMagAdrMG44A86c3YQ.jpeg",
  phrases: ["I'll be back", "Hasta la vista, baby",
    "I need your clothes, your boots, and your motorcycle", "You're terminated"],
}

const STAR_WARS_DATA = {
  title: 'Star Wars',
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1920px-Star_Wars_Logo.svg.png",
  phrases: ["May the Force be with you", "I am your father",
    "A long time ago in a galaxy far, far away...", "The dark side is in our blood"],
}


export function FilmsAndPhrases() {
  console.log(JSON.stringify(localClasses));
  console.log(localClasses2);
  return <>
    <Title />
    <FilmBlock title={CHAPULIN_DATA.title} imageURL={CHAPULIN_DATA.imageURL} phrases={CHAPULIN_DATA.phrases} />
    <FilmBlock title={TERMINATOR_DATA.title} imageURL={TERMINATOR_DATA.imageURL} phrases={TERMINATOR_DATA.phrases} />
    <FilmBlock title={STAR_WARS_DATA.title} imageURL={STAR_WARS_DATA.imageURL} phrases={STAR_WARS_DATA.phrases} />
  </>;
}

function Title() {
  return (
    <div>
      <h1 id={localClasses.titulo} className={localClasses2.phraseAuthorBlock}>Frases de pelis/series - CSS - versión 2</h1>
    </div>
  );
}

function FilmBlock(props) {
  const { title, imageURL, phrases } = props;

  return (
    <div className={localClasses.phraseAuthorBlock}>
      <div className={localClasses.phraseAuthorInfoFrame}>
        <h2>{title} - {phrases.length} frases</h2>
        <div>
          <img className={localClasses.image} src={imageURL} alt="" />
        </div>
      </div>
      <div className={localClasses.phraseGroupFrame}>
        {phrases.map(phrase => <p key={phrase} className={localClasses.phrase}>{phrase}</p>)}
      </div>
    </div>
  );
}
