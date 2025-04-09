import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { translateRole } from '../../utils/translations'

export default function Show({ user, auth }) {
  return (
    <>
      <Head title={`Usuário - ${user.name}`} />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Detalhes do Usuário
          </h1>
          <div className="flex space-x-4">
            <Link
              href="/users"
              className="inline-flex items-center px-4 py-2 border border-light-border dark:border-dark-border rounded-md text-sm font-medium text-light-text-primary dark:text-dark-text-primary hover:bg-light-page dark:hover:bg-dark-page focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-page transition-colors duration-250"
            >
              Voltar
            </Link>
            {user.role !== 'super_admin' && (
              <Link
                href={`/users/${user.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-light-sm dark:shadow-dark-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-page transition-colors duration-250"
              >
                Editar
              </Link>
            )}
          </div>
        </div>

        <div className="bg-light-card dark:bg-dark-card shadow-light-md dark:shadow-dark-md rounded-lg overflow-hidden border border-light-border dark:border-dark-border">
          <div className="px-6 py-5 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                Informações do Usuário
              </h3>
              <div className="mt-5 border-t border-light-border dark:border-dark-border">
                <dl className="divide-y divide-light-border dark:divide-dark-border">
                  <div className="py-4 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Nome
                    </dt>
                    <dd className="text-sm text-light-text-primary dark:text-dark-text-primary col-span-2">
                      {user.name}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Email
                    </dt>
                    <dd className="text-sm text-light-text-primary dark:text-dark-text-primary col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Perfil de acesso
                    </dt>
                    <dd className="text-sm text-light-text-primary dark:text-dark-text-primary col-span-2">
                      {translateRole(user.role)}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Criado em
                    </dt>
                    <dd className="text-sm text-light-text-primary dark:text-dark-text-primary col-span-2">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Última atualização
                    </dt>
                    <dd className="text-sm text-light-text-primary dark:text-dark-text-primary col-span-2">
                      {new Date(user.updated_at).toLocaleDateString('pt-BR')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
