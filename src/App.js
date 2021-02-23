import React, { Component } from 'react';
import Left from './components/left/index';
import Right from './components/right/index';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';

const leftData = [{
  id: 0,
  text: '我是第零个'
}, {
  id: 1,
  text: '我是第1个'
}, {
  id: 2,
  text: '我是第2个'
}]

class App extends Component {
  constructor() {
    super();
    this.state = {
      rightTarget: [{
        id: 100,
        items: [
          {
            id: 1,
            text: '我是第1个'
          },
          {
            id: 2,
            text: '我是第2个'
          }
        ]
      },{
        id: 101,
      },{
        id: 102,
      }]
    }
  }
  handlePick = (target_id, source_id) => {
    if(typeof target_id === 'undefined' || typeof source_id === 'undefined'){
        return;
    }
    const array = this.state['pick'+target_id] || [];
    if(array.indexOf(source_id) === -1){
      array.push(source_id)
    }
    this.setState({
        ['pick'+target_id]: array
    })
  }
  render(){
    const {
      rightTarget=[]
    } = this.state;
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Left
            handlePick={this.handlePick}
            dataSource={leftData}
          />
          <Right 
            source={this.state}
            handlePick={this.handlePick}
            dataSource={rightTarget}
          />
        </div>
      </DndProvider>
    );
  }
}

export default App;
