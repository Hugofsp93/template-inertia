import { Head } from '@inertiajs/react'

export default function Dashboard({ }) {
  return (
    <>
      <Head title="Dashboard" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bem-vindo ao Template Inertia
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Um template moderno para suas aplicações Rails com Inertia.js e React
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Card de Estatísticas */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Usuários
              </h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                0
              </p>
            </div>

            {/* Card de Ações Pendentes */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Ações Pendentes
              </h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                0
              </p>
            </div>

            {/* Card de Status */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Status
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Ativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 