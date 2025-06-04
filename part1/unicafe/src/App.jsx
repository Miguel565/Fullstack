import { useState } from 'react'
import './App.css'

const Header = ({text}) => <h1>{text}</h1>

const Part = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Content = ({parts}) => {
  const stats = parts.map(part => <Part key={part.name} name={part.name} value={part.value} />)
  return (
    <table>
      <tbody>
        {stats}
      </tbody>
    </table>
  )
}

const Button = ({ onClick, text }) => <button type="button" onClick={onClick}> {text} </button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value, setterFunction) => {
    setterFunction(value + 1)
  }

  return (
    <div>
      <Header text={'Give Feedback'}/>
      <Button onClick={() => handleClick(good, setGood)} text='Good' />
      <Button onClick={() => handleClick(neutral, setNeutral)} text='Neutral' />
      <Button onClick={() => handleClick(bad, setBad)} text='Bad' />
      <Header text={'Statistics'}/>
      <Content parts={[{good: good}, {neutral: neutral}, {bad: bad}]} />
      {
      /*
      <p>Total: {good + neutral + bad}</p>
      <p>Average: {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive: {(good / (good + neutral + bad)) * 100} %</p>*/
      }
    </div>
  )
}

export default App
