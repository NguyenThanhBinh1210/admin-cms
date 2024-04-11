/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar } from './sidebar.styles'
import { User } from '@nextui-org/react'

import { CollapseItems } from './CollapseItems'
import { SidebarItem } from './SidebarItem'
import { SidebarMenu } from './SidebarMenu'

import { useLocation } from 'react-router-dom'
import { HomeIcon } from '../icons/sidebar/HomeIcon'
import { BalanceIcon } from '../icons/sidebar/BalanceIcon'

export const SidebarWrapper = ({ showSidebar }: any) => {
  const pathname = useLocation().pathname

  return (
    <aside className={`z-10   ${showSidebar ? 'w-[250px]' : 'w-[70px]'}  transition-all`}>
      <div>
        <div className={`px-2  ${!showSidebar ? 'flex justify-center' : ''}`}>
          <User
            name={<div className={`${showSidebar ? 'block' : 'hidden'}  transition-all`}>Admin</div>}
            description={<div className={`${showSidebar ? 'block' : 'hidden'}  transition-all`}>Online</div>}
            avatarProps={{
              src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
            }}
          />
        </div>
        <div className='flex flex-col justify-between h-full'>
          <div className={Sidebar.Body()}>
            <SidebarItem
              showSidebar={showSidebar}
              title={showSidebar ? 'Thống kê' : ''}
              icon={<HomeIcon />}
              isActive={pathname === '/'}
              href='/'
            />
            <SidebarMenu title={showSidebar ? 'Chức năng' : ''}>
              <CollapseItems
                showSidebar={showSidebar}
                icon={<BalanceIcon />}
                items={['Danh sách nhân viên', 'Danh sách CSKH']}
                title={showSidebar ? 'Nhân viên' : ''}
              />
              <CollapseItems
                showSidebar={showSidebar}
                icon={<BalanceIcon />}
                items={['Khoản vay đang chờ']}
                title={showSidebar ? 'Tài khoản' : ''}
              />
              <CollapseItems
                showSidebar={showSidebar}
                icon={<BalanceIcon />}
                items={['Quản lý tài khoản', 'Quản lý vai trò', 'Quản lý quyền hạn']}
                title={showSidebar ? 'Tài khoản Admin' : ''}
              />
              <CollapseItems
                showSidebar={showSidebar}
                icon={<BalanceIcon />}
                items={['Quản lý thông báo', 'Cấu hình Website']}
                title={showSidebar ? 'Cấu hình' : ''}
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  )
}
