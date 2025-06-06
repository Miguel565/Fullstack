import { useState } from 'react'
import './App.css'

const Header = ({text}) => <h1>{text}</h1>

const StatsLine = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({feeds}) => {
  let average = 0
  let positive = 0
  const sum = feeds.reduce((acc, feed) => acc + feed.value, 0)
  const stats = feeds.map(feed => <StatsLine key={feed.name} name={feed.name} value={feed.value} />)
  if (sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const good = feeds.find(feed => feed.name.toLowerCase() === 'good')?.value || 0
  const neutral = feeds.find(feed => feed.name.toLowerCase() === 'neutral')?.value || 0
  const bad = feeds.find(feed => feed.name.toLowerCase() === 'bad')?.value || 0
  average = (good - bad) / (good + neutral + bad)
  positive = (good / (good + neutral + bad)) * 100
  return (
    <table>
      <tbody>
        {stats}
        <StatsLine name={'Total: '} value={sum} />
        <StatsLine name={'Average: '} value={average.toFixed(2)} />
        <StatsLine name={'Positive: '} value={`${positive.toFixed(2)} %`} />
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
      <Statistics feeds={[
        { name: 'Good', value: good },
        { name: 'Neutral', value: neutral },
        { name: 'Bad', value: bad }
      ]} />
    </div>
  )
}

export default App
