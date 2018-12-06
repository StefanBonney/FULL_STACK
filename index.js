const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require ('cors')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))


let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Martti Tienari',
        number: '040-123456',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id: 3
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = Date()

    res.send('<p>puhelinluettelossa on ' + persons.length + ' henkilön tiedot' + '</p>' + '<p>' + date + '</p>')
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        res.json(person)
    }else{
        res.status(404).end()
    }
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000))
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    
    if (body.name === undefined) {
        return response.status(400).json({ error:'name missing'})
    }
    
    if (body.number === undefined) {
        return response.status(400).json({ error:'number missing'})
    }
    
    const checkForName = () => {
        const x = persons.filter( person => {
            console.log('TEST', person)
            console.log('NAME1', person.name)
            return person.name === body.name})
            console.log('NAME2', body.name)
        console.log(x)
        return x
    }

    console.log(checkForName)
    
    if (checkForName().length > 0) {
        return response.status(400).json({ error:'Nimi on jo lisätty'})
    }    

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    
    console.log(person, '2')

    response.json(person)
}) 

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    
    res.status(204).end()
})

const PORT = process .env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})






























