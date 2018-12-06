import React from 'react';
import Henkilo from './Henkilo'
import personService from './personService'
import Notification from './Notification'
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      ilmoitus: ''
    }
  }

  componentDidMount(){
   personService.getAll()
    .then(response => {
      const persons = response.data
      console.log(persons)
      this.setState({ persons: response.data})
    })
  }

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  deletePerson = (personId) => {
    console.log(personId)
    personService.remove(personId)
      .then(response => {
        this.setState({
          persons: this.state.persons.filter( person => person.id !== personId),
          ilmoitus: `Poistettiin henkilö jonka id '${personId}'`
        })
        setTimeout(() => {
          this.setState({ilmoitus: null})
        }, 5000)
      })
  }

  addPerson = (event) => {
    event.preventDefault() 
    const name = this.state.newName
    const number = this.state.newNumber
    const names = this.state.persons.map(person => person.name)
    if(names.includes(name) === false)
    {
      console.log('meni läpi')
      const personObject = {name: this.state.newName, number: this.state.newNumber}

        personService.create(personObject)
          .then(response => {
          this.setState({
          persons: this.state.persons.concat(response.data),
          newNote: '', 
          ilmoitus: `Lisättiin henkilö ${personObject.name}`
          })
          setTimeout(() => {
            this.setState({ilmoitus: null})
          }, 5000) 
        })
    }
  }


  render() {
  const persons = this.state.persons 
  console.log(persons)
    return (
      <div>

        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value ={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value ={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <Notification ilmoitus={this.state.ilmoitus} />
          {persons.map( 
          person => <div key={person.id}>
          <Henkilo name={person.name} number={person.number} /> 
          <button key={person.id} onClick={() => {this.deletePerson(person.id)}}>x</button>
          </div>
          )} 


      </div>
    );
  }
}

export default App
