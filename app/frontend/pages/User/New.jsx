import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import Form from './Form'

export default function New({ can_edit_role, auth }) {
  const { data, setData, errors, processing, post } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/new')
  }

  return (
    <>
      <Head title="Novo Usuário" />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Novo Usuário
          </h1>
        </div>

        <div className="bg-light-card dark:bg-dark-card shadow-light-md dark:shadow-dark-md rounded-lg overflow-hidden border border-light-border dark:border-dark-border p-6">
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
    </>
  )
}
