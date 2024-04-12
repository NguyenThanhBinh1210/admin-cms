// import NextLink from "next/link";
import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  icon: React.ReactNode
  isActive?: boolean
  href?: string
  showSidebar: boolean
}

export const SidebarItem = ({ icon, title, isActive, href = '', showSidebar }: Props) => {
  // const { collapsed, setCollapsed } = useSidebarContext();

  // const handleClick = () => {
  //   if (window.innerWidth < 768) {
  //     setCollapsed();
  //   }
  // };
  return (
    <Link to={href} className='text-default-900 active:bg-none max-w-full'>
      <div
        className={clsx(
          isActive ? 'bg-primary-100 [&_svg_path]:fill-primary-500' : 'hover:bg-default-100',
          `flex  ${showSidebar ? 'gap-2 ' : ''
          }  w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]`
        )}
      // onClick={handleClick}
      >
        {icon}
        <span
          className={`text-default-900  overflow-hidden  ${showSidebar ? 'w-[86px] opacity-100 transition-all' : 'w-0 opacity-0 text-[0px]'
            }`}
        >
          {title}
        </span>
      </div>
    </Link>
  )
}
