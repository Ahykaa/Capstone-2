export const capitalizeFirstLetter = (string) => {
  if (string == null || typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatAsMoney = (value) => {
  // Assuming value is a number representing currency
  // You can adjust this formatting based on your PHP's money_format requirements
  // This is just a basic example
  return (
    '₱' + // Replace $ with ₱ for peso sign
    parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  )
}
