import { Head, Link } from '@inertiajs/react'
import { Fragment } from 'react'
import User from './User'

export default function Index({ users, flash }) {
  return (
    <>
      <Head title="Usuários" />
      <div className="container mx-auto px-4 py-8">
        {flash.notice && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            {flash.notice}
          </div>
        )}
        
        {flash.alert && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {flash.alert}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Usuários</h1>
            <Link
              href="/users/sign_out"
              method="delete"
              as="button"
              className="text-gray-600 hover:text-gray-900"
            >
              Sair
            </Link>
          </div>
          {/* <Link
            href="/users/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Novo Usuário
          </Link> */}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/users/${user.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Detalhes
                    </Link>
                    <Link
                      href={`/users/${user.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </Link>
                    {/* <Link
                      href={`/users/${user.id}`}
                      method="delete"
                      as="button"
                      className="text-red-600 hover:text-red-900"
                      data-confirm="Tem certeza que deseja excluir este usuário?"
                    >
                      Excluir
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
