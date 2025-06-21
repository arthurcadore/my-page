import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/software')({
  component: Software,
})

function Software() {
  const softwareProjects = [
    {
      title: 'Komm',
      description:
        'An open-source library for Python 3 providing tools for analysis and simulation of analog and digital communication systems.',
      links: [
        { name: 'Website', url: '#' },
        { name: 'GitHub', url: '#' },
        { name: 'PyPI', url: '#' },
      ],
    },
    {
      title: 'FluxoLab.app',
      description:
        'A web application designed to teach algorithm and programming fundamentals using flowcharts.',
      links: [
        { name: 'Website', url: '#' },
        { name: 'GitHub', url: '#' },
      ],
    },
    {
      title: 'PseudoLab.app',
      description:
        'A web application designed to teach algorithm and programming fundamentals using pseudocode (Portuguese only).',
      links: [{ name: 'Website', url: '#' }],
    },
  ]

  const demonstrations = [
    {
      title: 'Ganho e saturação',
      description:
        'Formas de onda de entrada e saída de um amplificador com saturação.',
    },
    {
      title: 'Histerese',
      description: 'Um simples exemplo de histerese em interface de usuário.',
    },
    {
      title: 'Distribuições de probabilidade',
      description: 'Distribuições de probabilidade contínuas e discretas.',
    },
  ]

  return (
    <div className="container mx-auto p-8">
      <main>
        <h1 className="text-4xl font-light text-green-700 mb-8">Software</h1>

        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-12">
          Also check my{' '}
          <a href="#" className="font-bold hover:underline">
            GitHub page
          </a>
          .
        </div>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareProjects.map((project) => (
              <div
                key={project.title}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        className="text-green-700 hover:underline"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-light mb-8">Demonstrações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demonstrations.map((demo) => (
              <div
                key={demo.title}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {demo.title}
                </h3>
                <p className="text-gray-600">{demo.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
