import { Head, Link } from '@inertiajs/react'

export default function Show({ user, can_edit }) {
  return (
    <>
      <Head title="Detalhes do Usuário" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
            {can_edit && (
              <Link
                href={`/users/${user.id}/edit`}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Editar
              </Link>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <p className="mt-1 text-lg">{user.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg">{user.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/users"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Voltar para lista de usuários
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
