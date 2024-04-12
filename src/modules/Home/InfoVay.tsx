import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  cn
} from '@nextui-org/react'
import React from 'react'
import { AddNoteIcon } from '~/assets/icons/AddNoteIcon'
import { ChevronDownIcon } from '~/assets/icons/ChevronDownIcon'
import { CopyDocumentIcon } from '~/assets/icons/CopyDocumentIcon'
import { DeleteDocumentIcon } from '~/assets/icons/DeleteDocumentIcon'
import { EditDocumentIcon } from '~/assets/icons/EditDocumentIcon'
import { SearchIcon } from '~/assets/icons/SearchIcon'
import { VerticalDotsIcon } from '~/assets/icons/VerticalDotsIcon'
import { columns, statusOptions, users } from '~/data/data'
import { capitalize, formatCurrency, formatDate } from '~/utils/utils'
import { CardBalance1 } from './CardBalance1'
import { CardBalance2 } from './CardBalance2'
import { CardBalance3 } from './CardBalance3'
import { CardBalance4 } from './CardBalance4'

const INITIAL_VISIBLE_COLUMNS = ['name', 'role', 'status', 'actions', 'codevay', 'phone', 'createdAt']
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning'
}
type User = (typeof users)[0]

const InfoVay = () => {
  const [filterValue, setFilterValue] = React.useState('')
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending'
  })
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  const [page, setPage] = React.useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) => Array.from(statusFilter).includes(user.status))
    }

    return filteredUsers
  }, [hasSearchFilter, statusFilter, filterValue])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number
      const second = b[sortDescriptor.column as keyof User] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User]

    switch (columnKey) {
      case 'codevay':
        return <span className='text-red-500 font-medium'>{user.codevay}</span>
      case 'name':
        return user.name
      case 'phone':
        return user.phone
      case 'tienvay':
        return formatCurrency(user.tienvay)
      case 'thangvay':
        return user.thangvay
      case 'createdAt':
        return formatDate(user.createdAt)
      case 'status':
        return (
          <Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
            {cellValue === 'vacation' && 'Chờ duyệt'}
            {cellValue === 'paused' && 'Từ chối'}
            {cellValue === 'active' && 'Đã duyệt'}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex justify-start pl-4 items-center gap-2'>
            <Dropdown
              showArrow
              classNames={{
                base: 'before:bg-default-200', // change arrow background
                content:
                  'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black'
              }}
            >
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
                <DropdownSection title='Hành động'>
                  <DropdownItem
                    key='edit'
                    description='Sửa lại thông tin'
                    startContent={<EditDocumentIcon className={iconClasses} />}
                  >
                    Sửa
                  </DropdownItem>
                  <DropdownItem
                    key='duyet'
                    description='Duyệt khoản vay'
                    startContent={<AddNoteIcon className={iconClasses} />}
                  >
                    Duyệt
                  </DropdownItem>
                  <DropdownItem
                    key='xem'
                    description='Xem thông tin vay'
                    startContent={<CopyDocumentIcon className={iconClasses} />}
                  >
                    Xem
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    className='text-danger'
                    color='danger'
                    description='Từ chối khoản vay'
                    startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
                  >
                    Từ chối
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])
  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='md:flex justify-between gap-3 items-end'>
          <div className='flex items-center mb-3 md:mb-0  gap-x-3 w-full'>
            <Input
              isClearable
              className='w-full sm:max-w-[44%]'
              placeholder='Tìm kiếm...'
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <Button color='primary'>Tìm kiếm</Button>
            <Button variant='light' className='text-blue-700 font-medium md:block hidden'>
              Làm mới
            </Button>
          </div>
          <div className='flex gap-3 justify-end md:justify-start'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode='multiple'
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
                  Hiện cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Table Columns'
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode='multiple'
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className='capitalize'>
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>Tổng cộng {users.length} đơn</span>
          <label className='flex items-center text-default-400 text-small'>
            Hàng trên mộtt trang:
            <select className='bg-transparent outline-none text-default-400 text-small' onChange={onRowsPerPageChange}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [filterValue, onSearchChange, statusFilter, visibleColumns, onRowsPerPageChange, onClear])
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
      {/* <div className='flex gap-5 mb-5'>
        <div className='p-2 py-5 text-center rounded border w-[200px]'>
          <p className='font-bold'>Tổng số khoản vay</p>
          <p>15065</p>
        </div>
        <div className='p-2 py-5 text-center rounded border w-[200px]'>
          <p className='font-bold'>Khoản chờ phê duyệt</p>
          <p>15065</p>
        </div>
        <div className='p-2 py-5 text-center rounded border w-[200px]'>
          <p className='font-bold'>Khoản vay đã duyệt</p>
          <p>15065</p>
        </div>
        <div className='p-2 py-5 text-center rounded border w-[200px]'>
          <p className='font-bold'>Khoản vay từ chối</p>
          <p>15065</p>
        </div>
      </div> */}
      <div className='grid md:grid-cols-2 mb-5 grid-cols-1 2xl:grid-cols-4 gap-5  justify-center w-full'>
        <CardBalance1 />
        <CardBalance2 />
        <CardBalance3 />
        <CardBalance4 />
      </div>
      <Table
        aria-label='Example table with custom cells, pagination and sorting'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'max-h-[382px]'
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement='outside'
        onSortChange={setSortDescriptor}
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
        <TableBody emptyContent={'No users found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default InfoVay
