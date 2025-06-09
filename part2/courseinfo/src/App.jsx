import './App.css'

const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li>
  )
}

const Content = ({ parts }) => {
  console.log("Parts value: ", parts)
  return (
    <div>
      <ul>
        {parts.map(part => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </ul>
    </div>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total of {totalExercises} exercises</p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
          name: 'Redux',
          exercises: 11,
          id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
