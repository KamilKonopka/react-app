import React, { PureComponent } from 'react';
import styling from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        {id: '1', name: 'Max', age: 28},
        {id: '2', name: 'Manu', age: 29},
        {id: '3', name: 'Stephanie', age: 26}
      ],
        toggleClicked: 0,
        authenticated: false
    };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Update App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //   nextState.showPersons !== this.state.persons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[Update App.js] Inside componentWillUpdate()', nextProps, nextState);
}

  componentDidUpdate() {
    console.log('[Update App.js] Inside componentDidUpdate()'); 
}

  switchNameHandler = (newName) => {
    // console.log('clicked');
    this.setState({
      persons: [
      {name: newName, age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
      ]
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState((prevState, props) => {
          return {
              showPersons: !doesShow,
              toggleClicked: prevState.toggleClicked + 1
          }
      });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
      // const person = Object.assign({}, this.state.persons[personIndex]);
    };

    person.name = event.target.value;

    const persons =[...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
      />;
    }

    return (
      <WithClass classes={styling.App}>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
            login={this.loginHandler}
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
          <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
      </WithClass>
    );
  }
}

export default App;
