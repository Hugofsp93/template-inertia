import { Head, Link } from '@inertiajs/react'
import { translateRole } from '../../utils/translations'
import { router } from '@inertiajs/react'

export default function Index({ users, flash, auth }) {
  const handleDelete = (userId) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      router.delete(`/users/${userId}`)
    }
  }

  return (
    <>
      <Head title="Usuários" />
      
      <div className="space-y-6">
        {flash.notice && (
          <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-200">{flash.notice}</p>
          </div>
        )}
        
        {flash.alert && (
          <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-200">{flash.alert}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Usuários
          </h1>
          {(auth.is_admin || auth.is_super_admin) && (
            <Link
              href="/users/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-light-sm dark:shadow-dark-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-page transition-colors duration-250"
            >
              Novo Usuário
            </Link>
          )}
        </div>

        <div className="bg-light-card dark:bg-dark-card shadow-light-md dark:shadow-dark-md rounded-lg overflow-hidden border border-light-border dark:border-dark-border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
              <thead className="bg-light-page dark:bg-dark-card">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                    E-mail
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                    Perfil de acesso
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-light-card dark:bg-dark-card divide-y divide-light-border dark:divide-dark-border">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-light-page dark:hover:bg-dark-page transition-colors duration-250">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {translateRole(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                      <Link
                        href={`/users/${user.id}`}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-250"
                      >
                        Detalhes
                      </Link>
                      
                      {user.role !== 'super_admin' && (
                        <>
                          <Link
                            href={`/users/${user.id}/edit`}
                            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-250"
                          >
                            Editar
                          </Link>
                          
                          {(auth.is_admin || auth.is_super_admin) && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-250"
                            >
                              Excluir
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
