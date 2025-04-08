import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Form({ data, setData, errors, processing, onSubmit, user = null, can_edit_role = false, auth }) {
  const isEditing = !!user
  const isPasswordRequired = !isEditing || data.password.length > 0

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Nome"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
        />
        {errors?.name && (
          <div className="mt-2 text-sm text-red-500">{errors.name}</div>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
        />
        {errors?.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required={!isEditing}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder={isEditing ? "Deixe em branco para manter a senha atual" : "Senha"}
          value={data.password}
          onChange={e => setData('password', e.target.value)}
        />
        {errors?.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>
      <div>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
          Confirmar Senha
        </label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          required={isPasswordRequired}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder={isEditing ? "Confirme a nova senha" : "Confirmar Senha"}
          value={data.password_confirmation}
          onChange={e => setData('password_confirmation', e.target.value)}
        />
        {errors?.password_confirmation && (
          <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
        )}
      </div>

      {can_edit_role && auth?.user?.role === 'super_admin' && (
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Função
          </label>
          <select
            id="role"
            name="role"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={data.role}
            onChange={e => setData('role', e.target.value)}
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
          {errors?.role && (
            <p className="mt-2 text-sm text-red-600">{errors.role}</p>
          )}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={processing}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {processing ? 'Processando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
