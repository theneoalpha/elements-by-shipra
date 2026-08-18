'use client'

import dynamic from 'next/dynamic'

const Studio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-bold animate-pulse">Loading Studio...</p>
      </div>
    )
  }
)

import config from '../../../../sanity/config'

export default function StudioPage() {
  return <Studio config={config} />
}
