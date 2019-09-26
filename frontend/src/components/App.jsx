import React from 'react';
import GreetingContainer from './greeting/greeting_container'
import HomePageContainer from "./home_page/home_page_container";
import QuestionPageContainer from "./question_page/question_page_container";
import ResultPageContainer from "./result_page/result_page_container";
import Footer from './greeting/footer'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="test">
        <GreetingContainer />
      </header>
      <Switch>
        <Route exact path="/question" component={QuestionPageContainer} />
        <Route exact path="/results" component={ResultPageContainer} />
        <Route exact path="/" component={HomePageContainer}/>
      </Switch>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
