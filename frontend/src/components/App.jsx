import React from 'react';
import GreetingContainer from './greeting/greeting_container'
import HomePageContainer from "./home_page/home_page_container";

function App() {
  return (
    <div className="App">
      <header className="test">
        <GreetingContainer />
      </header>
      
      <HomePageContainer />
    </div>
  );
}

export default App;
