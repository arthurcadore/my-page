import { createFileRoute } from '@tanstack/react-router'
import { Github, Mail, Phone, Linkedin, BookUser } from 'lucide-react'
import profilePic from '../assets/3x4.png'

export const Route = createFileRoute('/')({
  component: Index,
})

export function Index() {
  return (
    <div className="overflow-x-hidden">
      <main>
        <section className="bg-gray-100 py-16">
          <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
              <div className="md:w-3/5 space-y-4 text-center md:text-left">
                <h1 className="text-4xl font-light text-green-700">
                  Arthur Cadore M. Barcella
                </h1>
                <h2 className="text-2xl font-semibold text-green-700">
                  Engenheiro de Telecomunicações
                </h2>
                <div className="text-gray-600">
                  <p className="font-bold">IFSC - Câmpus São José</p>
                  <p>São José, Santa Catarina, 88103-310</p>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-green-700">
                  <Mail size={20} />
                  <a
                    href="mailto:arthurbarcella.ifsc@gmail.com"
                    className="hover:underline"
                  >
                    arthurbarcella.ifsc@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-green-700">
                  <Phone size={20} />
                  <span>+55 48 99615-6272</span>
                </div>

                <p className="pt-8 text-gray-700 text-justify">
                  Com formação técnica em Telecomunicações e cursando Engenharia
                  de Telecomunicações, desenvolvi uma carreira focada em redes e
                  sistemas. Recentemente venho estudando sobre desenvolvimento de firmwares para sistemas embarcados e também em infraestrutura para aplicações em nuvem com uso de containers em Kubernetes.
                </p>
              </div>

              <div className="md:w-2/5 flex flex-col items-center gap-4">
                <img
                  src={profilePic}
                  alt="Prof. Roberto W. Nóbrega"
                  className="rounded-lg shadow-md w-full"
                />
                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href="https://www.linkedin.com/in/arthur-cadore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://github.com/arthurcadore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="http://lattes.cnpq.br/2107432747219920"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <BookUser size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-8 py-16">
          <section className="grid md:grid-cols-2 gap-12 text-gray-700">
            <div>
              <h2 className="text-3xl font-light text-green-700 mb-6">
                Experiência Profissional
              </h2>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">
                    Analista de Desenvolvimento de Produto - PeD Redes
                    Empresariais, Intelbras
                  </p>
                  <p className="text-sm text-gray-600">2024 - O momento</p>
                </li>
                <li>
                  <p className="font-semibold">
                    Analista de Capacitação em Redes - Suporte Técnico,
                    Intelbras
                  </p>
                  <p className="text-sm text-gray-600">2021 - 2024</p>
                </li>
                <li>
                  <p className="font-semibold">
                    Estagiário em Projetos de Fibra Óptica e Orçamento em Redes
                    PON, Flin ISP
                  </p>
                  <p className="text-sm text-gray-600">2017 - 2020</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-light text-green-700 mb-6">
                Experiência Acadêmica
              </h2>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">
                    Bacharelado em Engenharia de Telecomunicações, Universidade
                    Federal de Santa Catarina
                  </p>
                  <p className="text-sm text-gray-600">2020 - O momento</p>
                </li>
                <li>
                  <p className="font-semibold">
                    Técnico em Telecomunicações, Instituto Federal de Santa
                    Catarina
                  </p>
                  <p className="text-sm text-gray-600">2017 - 2020</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}