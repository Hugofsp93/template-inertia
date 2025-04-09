import React from 'react'
import { Head } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import Form from './Form'

export default function Edit({ user, can_edit_role, auth }) {
  const { data, setData, errors, processing, put } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
    role: user.role
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/users/${user.id}`)
  }

  return (
    <>
      <Head title={`Editar Usuário - ${user.name}`} />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Editar Usuário
          </h1>
        </div>

        <div className="bg-light-card dark:bg-dark-card shadow-light-md dark:shadow-dark-md rounded-lg overflow-hidden border border-light-border dark:border-dark-border p-6">
          <Form
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            onSubmit={handleSubmit}
            user={user}
            can_edit_role={can_edit_role}
            auth={auth}
          />
        </div>
      </div>
    </>
  )
}
