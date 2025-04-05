import { Head, Link } from '@inertiajs/react'
import Form from './Form'

export default function New({ user }) {
  return (
    <>
      <Head title="Novo Usuário" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Novo Usuário</h1>
          <Link
            href="/users"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Voltar
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <Form
            user={user}
            onSubmit={(form) => {
              form.transform((data) => ({ user: data }))
              form.post('/users')
            }}
            submitText="Criar Usuário"
          />
        </div>
      </div>
    </>
  )
}
