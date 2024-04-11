import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import InfoVay from '~/modules/Home/InfoVay'

const Home = () => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs variant='underlined' aria-label='Options'>
        <Tab key='thong-tin-khoan-vay' title='Thông tin khoản vay'>
          <Card className='rounded'>
            <CardBody>
              <InfoVay />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='nap-tien' title='Nạp tiền'>
          <Card className='rounded'>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key='quan-ly-tai-khoan' title='Quản lý tài khoản'>
          <Card className='rounded'>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </CardBody>
          </Card>
        </Tab>
        <Tab key='thong-bao-nap-tien' title='Thông báo nạp tiền'>
          <Card className='rounded'>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Home
