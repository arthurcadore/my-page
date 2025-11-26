import { createFileRoute } from '@tanstack/react-router'
import { Github, Mail, Phone, Linkedin, BookUser } from 'lucide-react'
import profilePic from '../assets/3x4.png'
import intelbrasLogo from '../assets/intelbras.jpg'
import flinLogo from '../assets/flin.webp'
import itaLogo from '../assets/ita.png'
import ifscLogo from '../assets/ifsc.png'


export const Route = createFileRoute('/')({
  component: Index,
})

export function Index() {
  return (
    <div className="overflow-x-hidden font-serif">
      <main>
        <section className="bg-gray-100 py-16">
          <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
              <div className="md:w-3/5 space-y-4 text-center md:text-left">
                <h1 className="text-4xl font-light text-gray-900">
                  Arthur Cadore M. Barcella
                </h1>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Telecommunications Engineer
                </h2>
                <div className="text-gray-600">
                  <p className="font-bold">IFSC, São José</p>
                  <p>São José, SC, Brasil - 88103-310</p>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-900">
                  <Mail size={20} />
                  <a
                    href="mailto:arthurbarcella.ifsc@gmail.com"
                    className="hover:underline"
                  >
                    arthurbarcella.ifsc@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-900">
                  <Phone size={20} />
                  <span>+55 48 99615-6272</span>
                </div>

                <p className="pt-8 text-gray-700 text-justify">
                  With a technical background in Telecommunications and currently pursuing a degree in Telecommunications Engineering, I have built a career focused on networking and telecomunication systems. Recently, I have been studying firmware development for embedded systems, as well as cloud application infrastructure using containerized environments and Kubernetes.
                </p>
              </div>

              <div className="md:w-2/5 flex flex-col items-center gap-4">
                <img
                  src={profilePic}
                  alt="Arthur Cadore M. Barcella"
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
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Professional Background
              </h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <img src={intelbrasLogo} className="w-10 h-10 object-contain" />
                    <div>
                      <p className="font-semibold">
                        Product Development Analyst - Business Networks, Intelbras
                      </p>
                      <p className="text-sm text-gray-600">2024 - Present</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <img src={intelbrasLogo} className="w-10 h-10 object-contain" />
                    <div>
                      <p className="font-semibold">
                        Network Training Analyst - Technical Support, Intelbras
                      </p>
                      <p className="text-sm text-gray-600">2021 - 2024</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <img src={intelbrasLogo} className="w-10 h-10 object-contain" />
                    <div>
                      <p className="font-semibold">
                        Network and Infrastructure Analyst - Technical Support, Intelbras
                      </p>
                      <p className="text-sm text-gray-600">2020 - 2021</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <img src={flinLogo} className="w-10 h-10 object-contain" />
                    <div>
                      <p className="font-semibold">
                        Passive Fiber Optic Projects Intern, Flin (ISP)
                      </p>
                      <p className="text-sm text-gray-600">2017 - 2020</p>
                    </div>
                  </li>
                </ul>
            </div>
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Academic Background
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <img src={itaLogo} className="w-10 h-10 object-contain" />
                  <div>
                    <p className="font-semibold">
                      Master's Degree in Telecommunications (EEC-T), Aeronautics Institute of Technology (ITA)
                    </p>
                    <p className="text-sm text-gray-600">2026 - Present</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <img src={ifscLogo} className="w-10 h-10 object-contain" />
                  <div>
                    <p className="font-semibold">
                      Bachelor's Degree in Telecommunications Engineering, Federal Institute of Santa Catarina (IFSC)
                    </p>
                    <p className="text-sm text-gray-600">2020 - 2025</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <img src={ifscLogo} className="w-10 h-10 object-contain" />
                  <div>
                    <p className="font-semibold">
                      Technical Degree in Telecommunications – Federal Institute of Santa Catarina (IFSC)
                    </p>
                    <p className="text-sm text-gray-600">2017 - 2020</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}