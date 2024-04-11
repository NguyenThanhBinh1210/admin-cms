import {
  Button,
  Chip,
  ChipProps,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import React from 'react'
import { DeleteDocumentIcon } from '~/assets/icons/DeleteDocumentIcon'
import { EditDocumentIcon } from '~/assets/icons/EditDocumentIcon'
import { EyeFilledIcon } from '~/assets/icons/EyeFilledIcon'
import { EyeSlashFilledIcon } from '~/assets/icons/EyeSlashFilledIcon'
import { SearchIcon } from '~/assets/icons/SearchIcon'
import { columnsThongBaoNap, thongbaonap } from '~/data/data'
import { formatDate } from '~/utils/utils'

const INITIAL_VISIBLE_COLUMNS = ['id', 'description', 'phone', 'status', 'createdAt', 'actions']

type ThongBaoNap = (typeof thongbaonap)[0]
const statusColorMap: Record<string, ChipProps['color']> = {
  success: 'success',
  deny: 'danger'
}
const NotifyNap = () => {
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [page, setPage] = React.useState(1)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsThongBaoNap

    return columnsThongBaoNap.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    const filteredUsers = [...thongbaonap]
    return filteredUsers
  }, [])

  const pages = Math.ceil(filteredItems.length / 10)

  const items = React.useMemo(() => {
    const start = (page - 1) * 10
    const end = start + 10

    return filteredItems.slice(start, end)
  }, [page, filteredItems, 10])

  const renderCell = React.useCallback((thongbaonap: ThongBaoNap, columnKey: React.Key) => {
    const cellValue = thongbaonap[columnKey as keyof ThongBaoNap]

    switch (columnKey) {
      case 'id':
        return thongbaonap.id
      case 'description':
        return thongbaonap.description
      case 'phone':
        return thongbaonap.phone

      case 'status':
        return (
          <Chip className='capitalize' color={statusColorMap[thongbaonap.status]} size='sm' variant='flat'>
            {cellValue === 'success' && 'Thành công'}
            {cellValue === 'deny' && 'Thất bại'}
          </Chip>
        )
      case 'createdAt':
        return formatDate(thongbaonap.createdAt)
      case 'actions':
        return (
          <div className='flex gap-x-2'>
            <Button isIconOnly onPress={() => onOpen()} variant='light' className='' aria-label='Like'>
              <EditDocumentIcon className='w-5 h-5 text-blue-500' />
            </Button>
            <Popover placement='bottom' showArrow={true}>
              <PopoverTrigger>
                <Button isIconOnly variant='light' className='' aria-label='Like'>
                  <DeleteDocumentIcon className='w-5 h-5 text-red-500' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='rounded p-2'>
                <p className='mb-2'>Xoá tài khoản này?</p>
                <div className='flex gap-x-2'>
                  <Button isIconOnly variant='light' className='' aria-label='Like'>
                    Huỷ
                  </Button>
                  <Button isIconOnly variant='light' color='danger' className='' aria-label='Like'>
                    Xoá
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )

      default:
        return cellValue
    }
  }, [])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <div></div>
        <Pagination isCompact showControls showShadow color='primary' page={page} total={pages} onChange={setPage} />
      </div>
    )
  }, [page, pages])
  return (
    <>
      <div>
        <div className='flex items-center gap-x-3 w-full'>
          <Input
            isClearable
            className='w-full sm:max-w-[24%]'
            placeholder='Số điện thoại...'
            startContent={<SearchIcon />}
          />
          <Button color='primary'>Tìm kiếm</Button>
          <Button variant='light' className='text-blue-700 font-medium'>
            Làm mới
          </Button>
        </div>
        <Button color='primary' className='mt-3' aria-label='Like'>
          Thêm mới
        </Button>
        <div className='mt-4'></div>
        <div className='mt-4'>
          <Table
            aria-label='Example table with custom cells, pagination and sorting'
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement='outside'
            classNames={{
              wrapper: 'max-h-[382px]'
            }}
            topContentPlacement='outside'
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === 'actions' ? 'center' : 'start'}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No users found'} items={items}>
              {(item) => (
                <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Đổi mật khẩu</ModalHeader>
              <ModalBody>
                <Input
                  label='Mật khẩu'
                  labelPlacement='outside-left'
                  variant='bordered'
                  placeholder='Nhập mật khẩu'
                  endContent={
                    <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                      ) : (
                        <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  className='max-w-full w-full'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Đóng
                </Button>
                <Button color='primary' onPress={onClose}>
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default NotifyNap
