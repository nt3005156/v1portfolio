// Simple file storage using IndexedDB for larger files, fallback to DataURL in localStorage
// For production, replace with Supabase Storage / S3 upload

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1)+' KB'
  return (bytes/(1024*1024)).toFixed(1)+' MB'
}

// Check localStorage quota roughly
export function canStoreInLocalStorage(size) {
  // conservative 4MB limit for file
  return size < 4 * 1024 * 1024
}
