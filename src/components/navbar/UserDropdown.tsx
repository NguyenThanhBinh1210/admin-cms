import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from '@nextui-org/react'

export const UserDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as='button' color='secondary' size='md' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label='User menu actions' onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem key='profile' className='flex flex-col justify-start w-full items-start'>
          <p className='font-bold'>Admin</p>
          <p>Online</p>
        </DropdownItem>
        <DropdownItem key='settings'>Trang cá nhân</DropdownItem>

        <DropdownItem key='logout' color='danger' className='text-danger '>
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
