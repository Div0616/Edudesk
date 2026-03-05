// src/utils/whatsappHelper.js

/**
 * Opens WhatsApp Web with a pre-filled message to parent
 * @param {string} phone - International format e.g. 923001234567
 * @param {string} parentName
 * @param {string} studentName
 * @param {string} teacherName
 */
export const openWhatsApp = (phone, parentName, studentName, teacherName) => {
  const cleanPhone = phone.replace(/\D/g, '')
  const message = encodeURIComponent(
    `Dear ${parentName},\n\nPlease find attached the academic report for *${studentName}*.\n\nKindly review their performance and feel free to reach out for any queries.\n\nRegards,\n${teacherName}\nEduDesk`
  )
  window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
}

/**
 * Validates WhatsApp number (international format, 10-15 digits)
 */
export const isValidWhatsApp = (phone) => {
  const clean = phone.replace(/\D/g, '')
  return clean.length >= 10 && clean.length <= 15
}
