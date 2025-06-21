import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function RootComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHomePage = pathname === '/'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={isHomePage ? 'h-screen overflow-y-hidden' : ''}>
      <header className="bg-black text-white relative">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            {/* <div className="w-4 h-4 bg-green-500"></div> */}
            <Link to="/" className="text-xl font-bold">
              Arthur Cadore M. Barcella
            </Link>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <Link
              to="/"
              className="text-gray-300 hover:text-white [&.active]:text-white [&.active]:font-bold"
            >
              Início
            </Link>
            <Link
              to="/software"
              className="text-gray-300 hover:text-white [&.active]:text-white [&.active]:font-bold"
            >
              Software
            </Link>
          </nav>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 border border-gray-600 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black">
            <nav className="flex flex-col items-start gap-2 p-4 pt-0">
              <Link
                to="/"
                className="text-gray-300 hover:text-white w-full p-2 rounded-md"
                onClick={toggleMenu}
              >
                Início
              </Link>
              <Link
                to="/orientacoes"
                className="text-gray-300 hover:text-white w-full p-2 rounded-md"
                onClick={toggleMenu}
              >
                Orientações
              </Link>
              <Link
                to="/publications"
                className="text-gray-300 hover:text-white w-full p-2 rounded-md"
                onClick={toggleMenu}
              >
                Publications
              </Link>
              <Link
                to="/software"
                className="text-gray-300 hover:text-white w-full p-2 rounded-md"
                onClick={toggleMenu}
              >
                Software
              </Link>
              <a
                href="https://www.ifsc.edu.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white w-full p-2 rounded-md"
                onClick={toggleMenu}
              >
                Portal do IFSC
              </a>
            </nav>
          </div>
        )}
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})