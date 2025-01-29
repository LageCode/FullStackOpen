import React from 'react'

const Header = ({ title }) => <h2>{title}</h2>

const Part = ({ name, exercises }) => <li><p>{name} <sub>{exercises} exercises</sub></p></li>

const Content = ({ parts }) => <ul>{parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}</ul>

const Total = ({ parts }) => <p>
    <b>Total of {parts.map(p => p.exercises).reduce((acc, curr) => acc + curr)} exercises</b>
</p>

const Course = ({ course, delimited }) => <div>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    {delimited && <hr />}
</div>

const CourseCollection = ({ courses }) => <div>
    {courses.map((course, i, arr) => <Course key={i} course={course} delimited={i !== arr.length - 1} />)}
</div>

export default CourseCollection