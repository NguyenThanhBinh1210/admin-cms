import { Accordion, AccordionItem } from '@nextui-org/react'

interface Props {
  icon: React.ReactNode
  title: string
  items: string[]
  showSidebar: true
}

export const CollapseItems = ({ icon, items, title, showSidebar }: Props) => {
  return (
    <div className='flex gap-4 h-full  items-center cursor-pointer'>
      <Accordion className='px-0'>
        <AccordionItem
          isDisabled={!showSidebar}
          hideIndicator={!showSidebar}
          classNames={{
            indicator: 'data-[open=true]:-rotate-90',
            trigger:
              'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5',

            title: `px-0 flex disabled:opacity-100 text-base gap-2  ${
              showSidebar ? '' : 'justify-center'
            }  h-full items-center cursor-pointer`
          }}
          aria-label='Accordion 1'
          title={
            <div className={`flex flex-row  ${showSidebar ? 'gap-2' : ''}`}>
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className='pl-12'>
            {items.map((item, index) => (
              <span key={index} className='w-full flex py-2 text-default-500 hover:text-default-900 transition-colors'>
                {item}
              </span>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}