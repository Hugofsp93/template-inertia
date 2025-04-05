import { Link } from '@inertiajs/react'

export default function Layout({ children, auth }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Template Inertia
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {auth.user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{auth.user.name}</span>
                  <Link
                    href="/users/sign_out"
                    method="delete"
                    as="button"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Sair
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/users/sign_in"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/users/sign_up"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
} 