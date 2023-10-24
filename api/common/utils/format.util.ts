export default function formatFileName(filename: string) {
  return filename.replace(/\s/g, '_')
}