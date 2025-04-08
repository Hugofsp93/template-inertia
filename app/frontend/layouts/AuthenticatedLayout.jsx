import { Head, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'

export default function AuthenticatedLayout({ user, children }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log('User:', user)
  }, [user])

  return (
    <>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <span className="text-xl font-bold text-indigo-600">Template Inertia</span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="sr-only">Abrir menu do usuário</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        {user?.name?.[0]?.toUpperCase() || '?'}
                      </div>
                    </button>
                  </div>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                        {user?.name || 'Usuário'}
                      </div>
                      <Link
                        href={`/users/${user?.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Meu Perfil
                      </Link>
                      <Link
                        href="/users/sign_out"
                        method="delete"
                        as="button"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sair
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
} 