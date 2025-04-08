import { Head } from '@inertiajs/react'

export default function Dashboard({ }) {
  return (
    <>
      <Head title="Bem-vindo" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bem-vindo ao Template Inertia
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Um template moderno para suas aplicações Rails com Inertia.js e React
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 