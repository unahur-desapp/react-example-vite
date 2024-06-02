export function FilmsAndPhrases() {
  return <>
    <Title version={4-1} />
    {/* Vamos hacia un componente genérico que muestre la data de una peli o serie.
        Por ahora probamos solamente con chapulín.
        Pasamos título y URL de la imagen, después vemos la parte de las frases */}
    <FilmBlock 
      title='Chapulín colorado 3' 
      imageURL='https://res.cloudinary.com/remezcla/images/f_auto,q_auto/v1639757764/production/El_Chapulin_Colorado_Film/El_Chapulin_Colorado_Film.jpeg?_i=AA' 
      phrases={[
        "¡No contaban con mi astucia!", "Se aprovechan de mi nobleza",
        "Síganme los buenos", "Que no panda el cúnico", "Todos mis movimientos están fríamente calculados"
      ]}
    />
    <TerminatorPhrases />
    <StarWarsPhrases />
  </>;
}

function Title(props) {
  const headerBuilder = (ver) => <h1>Frases de pelis/series - versión {ver}</h1>;
  return (
    <div>
      {headerBuilder(props.version)}
    </div>
  );
}

function FilmBlock(props) {
  const { title, imageURL, phrases } = props;  // ejemplo de JS destructuring
  return <div className="phraseAuthorBlock">
    <div className="phraseAuthorInfoFrame">
      <h2>{title}</h2>
      <div>
        <img className="image" src={imageURL} alt='' />
      </div>
    </div>
    <div className="phraseGroupFrame">
      { phrases.map(phrase => <p key={phrase} className="phrase">{phrase}</p>) }
    </div>
  </div>
}

function TerminatorPhrases() {
  return <div className="phraseAuthorBlock">
    <div className="phraseAuthorInfoFrame">
      <h2>Terminator</h2>
      <div>
        <img className="image" src="https://www.cinematographe.it/wp-content/uploads/2019/11/16hVhjMagAdrMG44A86c3YQ.jpeg" alt="" />
      </div>
    </div>
    <div className="phraseGroupFrame">
      <p className="phrase">I'll be back</p>
      <p className="phrase">Hasta la vista, baby</p>
      <p className="phrase">I need your clothes, your boots, and your motorcycle</p>
      <p className="phrase">You're terminated</p>
    </div>
  </div>
}

function StarWarsPhrases() {
  return <div className="phraseAuthorBlock">
    <div className="phraseAuthorInfoFrame">
      <h2>Star Wars</h2>
      <div>
        <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1920px-Star_Wars_Logo.svg.png" alt="" />
      </div>
    </div>
    <div className="phraseGroupFrame">
      <p className="phrase">May the Force be with you</p>
      <p className="phrase">I am your father</p>
      <p className="phrase">A long time ago in a galaxy far, far away…</p>
      <p className="phrase">The dark side is in our blood</p>
    </div>
  </div>
}