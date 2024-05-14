import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Halaman Tidak Ditemukan</h1>
      <p className="text-xl text-gray-600 mb-8">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
      <Link href="/" className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
