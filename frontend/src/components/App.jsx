import React from 'react';
import GreetingContainer from './greeting/greeting_container'
import HomePageContainer from "./home_page/home_page_container";
import QuestionPageContainer from "./question_page/question_page_container";
import ResultPageContainer from "./result_page/result_page_container";
import QuestionsContainer from "./containers/questions_container";
import GameContainer from "./game/game_container";
import Footer from './greeting/footer'
import { Route, Switch } from 'react-router-dom';
import GameViewContainer from "./game_view/game_view_container"

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route exact path="/question" component={QuestionPageContainer} />
        <Route exact path="/results" component={ResultPageContainer} />
        <Route exact path="/game" component={GameContainer} />
        <Route exact path="/game_view" component={GameViewContainer} />
        <Route exact path="/" component={HomePageContainer}/>
      </Switch>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
