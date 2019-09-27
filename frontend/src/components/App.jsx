import React from 'react';
import QuestionsContainer from "./containers/questions_container";
import GameContainer from "./game_view/game_view_container"

function App() {
  return (
    <div className="App">
      <QuestionsContainer />
      <GameContainer/>
    </div>
  );
}

export default App;
