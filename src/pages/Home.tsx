import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import Account from '~/modules/Home/Account'
import InfoNap from '~/modules/Home/NotifyNap'
import InfoVay from '~/modules/Home/InfoVay'
import NapTru from '~/modules/Home/NapTru'

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
              <NapTru />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='quan-ly-tai-khoan' title='Quản lý tài khoản'>
          <Card className='rounded'>
            <CardBody>
              <Account />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='thong-bao-nap-tien' title='Thông báo nạp tiền'>
          <Card className='rounded'>
            <CardBody>
              <InfoNap />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Home
