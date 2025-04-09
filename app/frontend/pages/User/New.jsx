import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import Form from './Form'

export default function New({ auth, can_edit_role }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user' // Valor padrão
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/new')
  }

  return (
    <>
      <Head title="Novo Usuário" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-2xl font-semibold mb-4">Novo Usuário</h1>
              <Form
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                onSubmit={handleSubmit}
                can_edit_role={can_edit_role}
                auth={auth}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
