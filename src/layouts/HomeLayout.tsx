import { useState } from 'react'
import { NavbarWrapper } from '~/components/navbar/NavbarWrapper'
import { SidebarWrapper } from '~/components/sidebar/SidebarWrapper'
import { LayoutPropsInterface } from '~/types/base.type'

const HomeLayout = ({ children }: LayoutPropsInterface) => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [showSidebarMobile, setShowSidebarMobile] = useState(false)
  return (
    <div className='flex'>
      <div
        onClick={() => setShowSidebarMobile(false)}
        className={`fixed ${
          showSidebarMobile ? 'opacity-100 visible' : 'invisible opacity-0'
        } duration-500 transition-all md:hidden top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] z-50`}
      ></div>
      <div
        className={`h-screen overflow-y-scroll transition-all py-4 ${
          !showSidebarMobile ? '-translate-x-full' : '  -translate-x-0'
        }  md:-translate-x-0 fixed z-50 md:z-10 bg-white md:sticky top-0 hide-scroll border-r dark:border-[#1b1b1b]`}
      >
        <SidebarWrapper showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <NavbarWrapper
        showSidebarMobile={showSidebarMobile}
        setShowSidebarMobile={setShowSidebarMobile}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      >
        {children}
      </NavbarWrapper>
    </div>
  )
}

export default HomeLayout
