import Navbar from './Navbar'
// ...
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='shadow-md text-gray-700'>
      <div className='flex items-center max-w-[1200px] mx-auto px-[20px] py-[10px]'>
        <Link to='/' className='logo'>
          Logo
        </Link>
        <Navbar />
      </div>
    </header>
  )
}

export default Header
