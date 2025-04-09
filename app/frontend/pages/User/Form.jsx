import React from 'react'
import { useForm } from '@inertiajs/react'
import Input from '../../components/Input'

export default function Form({ data, setData, errors, processing, onSubmit, user = null, can_edit_role = false, auth }) {
  const isEditing = !!user
  const isPasswordRequired = !isEditing || data.password.length > 0

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input
        label="Nome"
        name="name"
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        error={errors?.name}
        required
      />

      <Input
        type="email"
        label="Email"
        name="email"
        value={data.email}
        onChange={e => setData('email', e.target.value)}
        error={errors?.email}
        required
      />

      <Input
        type="password"
        label="Senha"
        name="password"
        value={data.password}
        onChange={e => setData('password', e.target.value)}
        error={errors?.password}
        required={!isEditing}
        placeholder={isEditing ? "Deixe em branco para manter a senha atual" : undefined}
      />

      <Input
        type="password"
        label="Confirmar Senha"
        name="password_confirmation"
        value={data.password_confirmation}
        onChange={e => setData('password_confirmation', e.target.value)}
        error={errors?.password_confirmation}
        required={isPasswordRequired}
        placeholder={isEditing ? "Confirme a nova senha" : undefined}
      />

      {can_edit_role && auth?.user?.role === 'super_admin' && (
        <div className="space-y-1">
          <label htmlFor="role" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            Função
          </label>
          <select
            id="role"
            name="role"
            value={data.role}
            onChange={e => setData('role', e.target.value)}
            className="mt-1 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-light-text-primary dark:text-dark-text-primary bg-light-input-background dark:bg-dark-input-background border-light-input-border dark:border-dark-input-border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm transition-colors duration-250"
          >
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
          {errors?.role && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.role}</p>
          )}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={processing}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-light-sm dark:shadow-dark-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-page disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-250"
        >
          {processing ? 'Processando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
