import { Button, Checkbox, Input } from '@nextui-org/react'
import { LockIcon } from '~/assets/icons/LockIcon'
import { MailIcon } from '~/assets/icons/MailIcon'
import '~/styles/header.scss'
const Login = () => {
  return (
    <div className='h-screen flex items-center flex-col justify-center px-3 md:px-0'>
      <div className='text-center font-bold text-3xl mb-6'>
        <h1>Đăng nhập</h1>
      </div>
      <div className='max-w-[450px] w-full mx-auto grid gap-y-4 shadow-md p-6 rounded-md'>
        <Input
          autoFocus
          endContent={<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
          label='Email'
          placeholder='Nhập email'
          variant='bordered'
          labelPlacement='outside'
        />
        <Input
          endContent={<LockIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
          label='Password'
          placeholder='Nhập mật khẩu'
          type='password'
          variant='bordered'
          labelPlacement='outside'
        />
        <div className='flex py-2 px-1 justify-between'>
          <Checkbox
            classNames={{
              label: 'text-small'
            }}
          >
            Ghi nhớ đăng nhập
          </Checkbox>
        </div>
        <Button color='primary'>Đăng nhập</Button>
      </div>
    </div>
  )
}

export default Login
