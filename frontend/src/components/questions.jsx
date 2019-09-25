import React from "react";

class Question extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchQuestions();
  }

  render(){
    let body = [];
    if (this.props.questions) {
      console.log(this.props.questions);
    }
    
    return (
      <div>he

      </div>
    );
  }
}

export default Question;