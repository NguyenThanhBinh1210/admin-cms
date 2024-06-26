/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'

import { BurguerButton } from './BurguerButton'
import { UserDropdown } from './UserDropdown'

interface Props {
  children: React.ReactNode
  showSidebar: any
  setShowSidebar: any
  showSidebarMobile: any
  setShowSidebarMobile: any
}

export const NavbarWrapper = ({
  showSidebar,
  showSidebarMobile,
  setShowSidebarMobile,
  setShowSidebar,
  children
}: Props) => {
  return (
    <div className='relative flex transition-all flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Navbar
        isBordered
        className='w-full'
        classNames={{
          wrapper: 'w-full max-w-full'
        }}
      >
        <NavbarContent className='hidden md:flex'>
          <BurguerButton onShow={() => setShowSidebar(!showSidebar)} />
        </NavbarContent>
        <NavbarContent className='md:hidden'>
          <BurguerButton onShow={() => setShowSidebarMobile(!showSidebarMobile)} />
        </NavbarContent>

        <NavbarContent justify='end' className='w-fit data-[justify=end]:flex-grow-0'>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <div className='p-2 md:p-6'>{children}</div>
    </div>
  )
}
