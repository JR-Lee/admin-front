export default function formatDate(date: Date, format: string = 'yyyy-MM-dd HH:mm:ss 周w') {
  const fillZero = (val: string | number) => (val + '').length < 2 ? '0' + val : val + ''

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const _date = date.getDate()
  const hour = date.getHours()
  const _hour = hour > 12 ? hour - 12 : hour
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]

  const bar: {[key: string]: string | number} = {
    yyyy: year,
    yy: (year + '').slice(-2),
    MM: fillZero(month),
    M: month,
    dd: fillZero(_date),
    d: _date,
    HH: fillZero(hour),
    H: hour,
    hh: fillZero(_hour),
    h: _hour,
    mm: fillZero(minute),
    m: minute,
    ss: fillZero(second),
    s: second,
    w: week
  }

  return format.replace(new RegExp(Object.keys(bar).join('|'), 'g'), str => bar[str] + '')
}