import { createFileRoute, Link } from '@tanstack/react-router'

import amPlot from '../../assets/am.png' 
import heatmap from '../../assets/heatmap_overlay.png'

export const Route = createFileRoute('/estudos/')({
  component: Estudos,
})

function Estudos() {
  const redes = [
    {
      title: 'Heatmap em Ambientes Internos',
      imageUrl: heatmap,
      path: './analise-de-rf',
    },
    {
      title: 'Infraestrutura com Ansible',
      imageUrl:
        'https://placehold.co/600x400/d1d5db/374151?text=Ansible',
      path: './infraestrutura-com-ansible',
    },
    {
      title: 'Análise de Tráfego com Netflow',
      imageUrl:
        'https://placehold.co/600x400/d1d5db/374151?text=Netflow',
      path: './analise-de-trafego-com-netflow',
    },
  ]

  const eletronica = [
    {
      title: 'Transceptor AM',
      imageUrl: amPlot,
      path: './transceptor-am',
    },
    {
      title: 'CNC',
      imageUrl: 'https://placehold.co/600x400/d1d5db/374151?text=CNC',
      path: './cnc',
    },
    {
      title: 'Inversor Trifásico',
      imageUrl:
        'https://placehold.co/600x400/d1d5db/374151?text=Inversor',
      path: './inversor-trifasico',
    },
  ]

  const renderCard = (item: {
    title: string
    imageUrl: string
    path: string
  }) => (
    <Link
      to={item.path}
      key={item.title}
      className="block relative rounded-lg overflow-hidden h-56 bg-gray-200 group hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity" /> */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 bg-opacity-90">
        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      </div>
    </Link>
  )

  return (
    <div className="font-serif">
      <div className="bg-gray-100 shadow-md">
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-4xl font-light text-gray-800">Estudos</h1>
        </div>
      </div>
      <div className="container mx-auto px-8 py-8">
        <main>
          <section className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Redes e Infraestrutura
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {redes.map(renderCard)}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Eletrônica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eletronica.map(renderCard)}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
} 