const Header = (props) => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const Part = (props) => {
  const { name, exercises } = props.part
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={{ name: props.parts[0].name, exercises: props.parts[0].exercises}} />
      <Part part={{ name: props.parts[1].name, exercises: props.parts[1].exercises}} />
      <Part part={{ name: props.parts[2].name, exercises: props.parts[2].exercises}} />
    </div>
  )
}

const Total = (props) => {
  const sum = props.parts.map(part => part.exercises).reduce((acc, curr) => acc + curr)

  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App