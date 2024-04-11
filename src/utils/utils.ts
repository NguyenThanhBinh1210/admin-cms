export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export function formatCurrency(amount: number) {
  // Chuyển số thành chuỗi và thêm dấu phẩy ngăn cách hàng nghìn
  const formattedAmount = amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  return formattedAmount
}
export function formatDate(inputDate: string) {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}
