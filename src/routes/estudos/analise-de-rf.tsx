import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/estudos/analise-de-rf')({
  component: AnaliseDeRf,
})

function AnaliseDeRf() {
  const contentOffset = 'ml-[calc(2.5rem+1.5rem)]' // w-10 (botão) + ml-6 (título)

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
            Análise de RF
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-8 py-8">
        <div className="ml-[calc(2.5rem+1.5rem)] mr-[calc(2.5rem+1.5rem)]">
        <p className="text-lg text-gray-700">Página em construção...</p>
        </div>
      </div>
    </div>
  )
} 