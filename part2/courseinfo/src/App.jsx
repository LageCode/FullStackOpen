const Header = ({ title }) => <h2>{title}</h2>

const Part = ({ name, exercises }) => <li><p>{name} <sub>{exercises} exercises</sub></p></li>

const Content = ({ parts }) => <ul>{parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}</ul>

const Total = ({ parts }) => <p><b>Total of {parts.map(p => p.exercises).reduce((acc, curr) => acc + curr)} exercises</b></p>

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const CourseColl = ({ courses }) => {
  return (
    <div>
      {
        courses.map((course, i, arr) => {
          return (
            <>
              <Course course={course} />
              {
                i !== arr.length - 1 && <hr />
              }
            </>
          )
        })
      }
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <CourseColl courses={courses} />
}

export default App