import Grid from './components/Grid';
import usePopup from './hooks/usePopup';
import Popup from './components/Popup';

const App = () => {
  const {
    popupMode, popupData,
    openQuestion, handleAnswer,
    closePopup, timeLeft
  } = usePopup();

  // Si además de un número necesitas saber el ID de la pregunta,
  // puedes llevar un mapa número → pregunta desde tu backend o estado.
  const handleCellClick = (num) => {
    console.log(`Casilla ${num} clicada`);
    openQuestion(num);  // por ejemplo, pasar el ID al hook
  };

  return (
    <>
      <h1>Cuadrícula + Pop-up</h1>
      <Grid
        onItemClick={handleCellClick}
        bgImage="/workspaces/Equipo3-Prototipo/src/assets/imagenes/hqdefault.jpg"
        size={600}
        side={15}
      />

      {popupMode && (
        <Popup
          mode={popupMode}
          data={{ ...popupData, timeLeft }}
          onClose={closePopup}
          onAnswer={handleAnswer}
        />
      )}
    </>
  );
};

export default App;
