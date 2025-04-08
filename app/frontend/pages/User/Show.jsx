import { Head } from '@inertiajs/react'
import { Link } from '@inertiajs/react'

export default function Show({ auth, user }) {
  return (
    <>
      <Head title={`Usuário - ${user.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex justify-between items-center pt-6 pb-4 px-6 text-gray-900">
              <h1 className="text-2xl font-semibold">Detalhes do Usuário</h1>
              
              <div className="space-x-2">
                {user.role != 'super_admin' &&
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Editar
                  </Link>
                }
                <Link
                  href={`/users`}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Voltar
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Nome</h3>
                  <p className="mt-1 text-sm text-gray-600">{user.name}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-sm text-gray-600">{user.email}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Função</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {user.role === 'super_admin' && 'Super Administrador'}
                    {user.role === 'admin' && 'Administrador'}
                    {user.role === 'user' && 'Usuário'}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Criado em</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
