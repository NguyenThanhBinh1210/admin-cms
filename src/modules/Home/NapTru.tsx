import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import React from 'react'
import { SearchIcon } from '~/assets/icons/SearchIcon'
import { columnsNapTru, naprut } from '~/data/data'
import { formatCurrency, formatDate } from '~/utils/utils'

const INITIAL_VISIBLE_COLUMNS = ['id', 'phone', 'money', 'lydo', 'createdAt']

type NapRut = (typeof naprut)[0]

const NapTru = () => {
  const [visibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [page, setPage] = React.useState(1)
  const [type, setType] = React.useState('')
  const handleOpen = (type: string) => {
    setType(type)
    onOpen()
  }
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columnsNapTru

    return columnsNapTru.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    const filteredUsers = [...naprut]
    return filteredUsers
  }, [])

  const pages = Math.ceil(filteredItems.length / 10)

  const items = React.useMemo(() => {
    const start = (page - 1) * 10
    const end = start + 10

    return filteredItems.slice(start, end)
  }, [page, filteredItems, 10])

  const renderCell = React.useCallback((naprut: NapRut, columnKey: React.Key) => {
    const cellValue = naprut[columnKey as keyof NapRut]

    switch (columnKey) {
      case 'id':
        return naprut.id
      case 'phone':
        return naprut.phone
      case 'lydo':
        return <div className='max-w-[300px] line-clamp-1'>{naprut.lydo}</div>
      case 'money':
        return (
          <div
            className={`font-semibold ${naprut.status === 'nap' && 'text-green-600'} ${
              naprut.status === 'tru' && 'text-red-600'
            }`}
          >
            {naprut.status === 'nap' && '+'} {naprut.status === 'tru' && '-'} {formatCurrency(naprut.money)}
          </div>
        )
      case 'createdAt':
        return formatDate(naprut.createdAt)

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
        <div className='mt-4'>
          <ButtonGroup variant='shadow' className='gap-x-2'>
            <Button onPress={() => handleOpen('nap')} color='success'>
              Nạp tiền
            </Button>
            <Button onPress={() => handleOpen('tru')} color='danger'>
              Trừ tiền
            </Button>
          </ButtonGroup>
        </div>
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
              <ModalHeader className='flex flex-col gap-1'>
                {type === 'nap' && 'Nạp tiền'} {type === 'tru' && 'Trừ tiền'}
              </ModalHeader>
              <ModalBody>
                <Input
                  type='number'
                  label={type === 'nap' ? 'Số tiền cần nạp' : 'Số tiền cần trừ'}
                  placeholder='100.000'
                  startContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>Vnđ</span>
                    </div>
                  }
                />
                <Textarea label='Lý do' placeholder='Nhập lý do...' />
                <Select label='Số điện thoại'>
                  {['0234234234', '234234234234', '456456456', '567567567657'].map((phone) => (
                    <SelectItem key={phone} value={phone}>
                      {phone}
                    </SelectItem>
                  ))}
                </Select>
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

export default NapTru
