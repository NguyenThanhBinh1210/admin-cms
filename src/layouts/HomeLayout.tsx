import { useState } from 'react'
import { NavbarWrapper } from '~/components/navbar/NavbarWrapper'
import { SidebarWrapper } from '~/components/sidebar/SidebarWrapper'
import { LayoutPropsInterface } from '~/types/base.type'

const HomeLayout = ({ children }: LayoutPropsInterface) => {
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div className='flex'>
      <div className='h-screen overflow-y-scroll py-4 sticky top-0 hide-scroll border-r dark:border-[#1b1b1b]'>
        <SidebarWrapper showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <NavbarWrapper showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        {children}
      </NavbarWrapper>
    </div>
  )
}

export default HomeLayout
