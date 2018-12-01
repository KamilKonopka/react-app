import React, { Component } from 'react';
import styling from './App.css';
import Person from '../components/Persons/Person/Person';
import ErrorBoundry from '../components/ErrorBoundry/ErrorBoundry';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'Max', age: 28},
      {id: '2', name: 'Manu', age: 29},
      {id: '3', name: 'Stephanie', age: 26}
    ]
  };

  switchNameHandler = (newName) => {
    // console.log('clicked');
    this.setState({
      persons: [
      {name: newName, age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
      ]
    });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

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
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundry key={person.name} ><Person 
            name={person.name} 
            age={person.age} 
            click={() => this.deletePersonHandler(index)}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
            </ErrorBoundry>
          })}
        </div>
      );
      btnClass = styling.red;
    }


    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(styling.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(styling.bold);
    }
    return (
      <div className={styling.App}>
        <h1>Hi, I'm React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
        className={btnClass}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
