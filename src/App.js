import usePopup from './hooks/usePopup';
import Popup from './components/Popup';

const App = () => {
  const { popupMode, popupData, openQuestion, handleAnswer, closePopup } = usePopup();

  return (
    <div className="App">
      <h1>Demo de Pop-up</h1>
      <button onClick={openQuestion}>Abrir pregunta</button>

      {popupMode && (
        <Popup
          mode={popupMode}
          data={popupData}
          onClose={closePopup}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};
export default App;