import { menuItems } from '~/constants/renaral.const'
import MenuItemList from './MenuItemList'
const Navbar = () => {
  return (
    <nav>
      <ul className='flex items-center flex-wrap'>
        {menuItems.map((menu, index) => {
          const depthLevel = 0
          return <MenuItemList items={menu} key={index} depthLevel={depthLevel} />
        })}
      </ul>
    </nav>
  )
}

export default Navbar
