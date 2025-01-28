const Header = (props) => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const Part = (props) => {
  const { title, exercises } = props.part
  return (
    <p>
      {title} {exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={{ title: props.parts[0], exercises: props.exercises[0]}} />
      <Part part={{ title: props.parts[1], exercises: props.exercises[1]}} />
      <Part part={{ title: props.parts[2], exercises: props.exercises[2]}} />
    </div>
  )
}

const Total = (props) => {
  console.log(props.list)

  const sum = props.list.reduce((acc, curr) => acc + curr)

  return (
    <p>
      Number of exercises {sum}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total list={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App