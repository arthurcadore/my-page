import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/publications')({
  component: Publications,
})

function Publications() {
  const conferencePapers = [
    {
      title: 'Change Detection based on Bayes Theorem for Intensity Wavelength-Resolution SAR Difference Images',
      author: 'GABRIEL LUIZ ESPINDOLA PEDRO',
      coauthors: 'DIMAS IRION ALVES, DIEGO DA SILVA DE MEDEIROS, PAULO RICARDO BRANCO DA SILVA ; JOÃO V. R. NEGRI, ARTHUR C. M. BARCELLA',
      published:
        'XLIII Simpósio Brasileiro de Telecomunicações e Processamento de Sinais, 2025, Natal, RN. Anais do XLIII Simpósio Brasileiro de Telecomunicações e Processamento de Sinais, 2025.',
      url: 'http://dx.doi.org/10.14209/sbrt.2025.1571156659',
      keywords:"CARABAS II change detection bivariate Gamma distribution background statistics",
      doi:'10.14209/sbrt.2025.1571156659'
    }
  ]

  const renderPaperCard = (paper: typeof conferencePapers[0]) => {
    return (
      <div
        key={paper.url}
        className="bg-white border border-gray-200 rounded-lg shadow p-6 w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{paper.title}</h2>
        <p className="text-gray-700 mb-1"><strong>Author:</strong> {paper.author}</p>
        <p className="text-gray-600 mb-2"><strong>Coauthors:</strong> {paper.coauthors}</p>
        <p className="text-gray-600 mb-2"><strong>Keywords:</strong> {paper.keywords}</p>
        <p className="text-gray-600 mb-2"><strong>DOI: </strong>{paper.doi}</p>
        <p className="text-gray-600 mb-2"><strong>In: </strong>{paper.published}</p>
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Access Paper
        </a>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen font-serif bg-gray-100">
      <header className="bg-gray-100 shadow-md py-6 w-full">
        <div className="container mx-auto px-8">
          <h1 className="text-4xl font-light text-gray-800">Publications</h1>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12 w-full">
        <section className="mb-16 w-full">
          <div className="flex flex-col gap-8 w-full">
            {conferencePapers.map(renderPaperCard)}
          </div>
        </section>
      </main>
    </div>
  )
}
