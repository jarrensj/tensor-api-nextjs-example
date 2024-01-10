import Link from 'next/link'
import Tensorians from '@/components/Tensorians'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-2">tensor api nextjs example</h1>
      <p className="text-xl text-gray-700 mb-6">by&nbsp;
        <Link href="https://jarrensj.com">
          <span className="text-blue-500 hover:underline">jarrensj</span>
        </Link>
      </p>
      <Tensorians />
    </main>
  )
}
