import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { AmPlot } from '../../components/plots/AmPlot'

export const Route = createFileRoute('/estudos/transceptor-am')({
  component: TransceptorAm,
})

function TransceptorAm() {
  return (
    <div className="font-serif">
      <div className="bg-gray-100 shadow-md">
        <div className="container mx-auto flex items-center px-8 py-6">
          <Link
            to="/estudos"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border bg-white shadow-sm transition-colors hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="ml-6 text-4xl font-light text-gray-800">
            Transceptor AM
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-8 py-8">
        <div className="ml-[calc(2.5rem+1.5rem)] mr-[calc(2.5rem+1.5rem)]">
          <AmPlot />
        </div>
      </div>
    </div>
  )
} 