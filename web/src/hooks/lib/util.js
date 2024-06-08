import { facilitieOptions } from '../const'

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

export const formatTime = (timeString) => {
  const time = new Date(`1970-01-01T${timeString}`)
  return time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

export const getFacilityLabels = (facilityValues) => {
  if (!Array.isArray(facilityValues)) {
    facilityValues = [facilityValues]
  }

  return facilityValues
    .map((value) => {
      const facility = facilitieOptions.find((f) => f.value === value)
      return facility ? facility.label : 'Unknown'
    })
    .filter(Boolean) // Remove null or undefined values
    .join(', ')
}
