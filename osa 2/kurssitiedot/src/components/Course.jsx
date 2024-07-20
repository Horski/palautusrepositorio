const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p><strong>total of {totalExercises} exercises</strong></p>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map(part =>
        <Part key={part.id} part={part}/>
      )
    )
  }
  
  
  const Header = ({ courseName }) => {
    return (
      <h2>{courseName}</h2>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

export default Course