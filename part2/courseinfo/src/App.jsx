const Header = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
}

const Part = ({ name, exercises }) => <li><p>{name} <sub>{exercises} exercises</sub></p></li>

const Content = ({ parts }) => <ul>{parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}</ul>

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
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
      }
    ]
  }

  return <Course course={course} />
}

export default App