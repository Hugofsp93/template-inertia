import { Head, Link } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ user }) {
  return (
    <>
      <Head title={`Editar Usuário - ${user.name}`} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Editar Usuário</h1>
          <div className="space-x-2">
            <Link
              href={`/users/${user.id}`}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Voltar
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <Form
            user={user}
            onSubmit={(form) => {
              form.transform((data) => ({ user: data }))
              form.patch(`/users/${user.id}`)
            }}
            submitText="Atualizar Usuário"
          />
        </div>
      </div>
    </>
  )
}
