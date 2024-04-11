/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navbar, NavbarContent } from '@nextui-org/react'
import React from 'react'

import { BurguerButton } from './BurguerButton'
import { UserDropdown } from './UserDropdown'

interface Props {
  children: React.ReactNode
  showSidebar: any
  setShowSidebar: any
}

export const NavbarWrapper = ({ showSidebar, setShowSidebar, children }: Props) => {
  return (
    <div className='relative flex  flex-col flex-1 overflow-y-auto overflow-x-hidden'>
      <Navbar
        isBordered
        className='w-full'
        classNames={{
          wrapper: 'w-full max-w-full'
        }}
      >
        <NavbarContent className=''>
          <BurguerButton onShow={() => setShowSidebar(!showSidebar)} />
        </NavbarContent>

        <NavbarContent justify='end' className='w-fit data-[justify=end]:flex-grow-0'>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <div className='p-6'>{children}</div>
    </div>
  )
}
