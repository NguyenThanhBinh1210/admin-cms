import { Accordion, AccordionItem } from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface Props {
  icon: React.ReactNode
  title: string
  items: {
    title: string
    path: string
  }[]
  isActive?: boolean
}

export const CollapseItems = ({ icon, items, title, isActive }: Props) => {
  return (
    <div className='flex gap-4 h-full  items-center cursor-pointer'>
      <Accordion className='px-0'>
        <AccordionItem
          classNames={{
            indicator: 'data-[open=true]:-rotate-90',
            trigger: `${isActive ? 'bg-primary-100 [&_svg_path]:fill-primary-500 !hover:bg-primary-100' : ' hover:bg-default-100'
              } transition-all py-0 min-h-[44px]  rounded-xl active:scale-[0.98] transition-transform px-3.5`,

            title: `px-0 flex disabled:opacity-100 text-base gap-2  h-full items-center cursor-pointer`
          }}
          aria-label='Accordion 1'
          title={
            <div className={`flex flex-row gap-2`}>
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className='pl-12'>
            {items.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className='w-full flex py-2 text-default-500 hover:text-default-900 transition-colors'
              >
                {item.title}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
