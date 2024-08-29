import dynamic from 'next/dynamic'
import Head from 'next/head'

const GaussianSplatsViewer = dynamic(() => import('../components/GaussianSplatsViewer'), {
  ssr: false
})

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Gaussian Splats 3D Demo</title>
        <meta name="description" content="Fullscreen Gaussian Splats 3D Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Gaussian Splats 3D Demo</h1>
      </header>

      <main className="flex-grow">
        <GaussianSplatsViewer />
      </main>
    </div>
  )
}