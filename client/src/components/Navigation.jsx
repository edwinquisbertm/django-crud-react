import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <div>
        <h1>Task App</h1>
        <Link to="/tasks">Home </Link>
        <Link to="/tasks-create">Create task</Link>
    </div>
  )
}
