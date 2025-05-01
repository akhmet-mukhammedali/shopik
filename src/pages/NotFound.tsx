import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='max-container text-center py-20'>
        <h1 className='text-7xl font-bold mt-20'>404 Not Found</h1>
        <p className='mt-2.5'>Your visited page not found. <Link className='underline' to="/">You may go home page.</Link></p>
    </div>
  )
}

export default NotFound