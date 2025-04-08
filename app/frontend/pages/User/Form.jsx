import { useForm } from '@inertiajs/react'

export default function Form({ data, setData, errors, processing, onSubmit, can_edit_role, auth }) {
  const getRoleOptions = () => {
    if (!auth?.user) return []
    
    switch (auth.user.role) {
      case 'super_admin':
        return [
          { value: 'user', label: 'Usuário' },
          { value: 'admin', label: 'Administrador' }
        ]
      case 'admin':
        return [
          { value: 'user', label: 'Usuário' }
        ]
      default:
        return []
    }
  }

  const roleOptions = getRoleOptions()

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {can_edit_role && roleOptions.length > 0 && (
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Função
          </label>
          <select
            id="role"
            value={data.role}
            onChange={(e) => setData('role', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="mt-2 text-sm text-red-600">{errors.role}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
          Confirmação de Senha
        </label>
        <input
          type="password"
          id="password_confirmation"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.password_confirmation && (
          <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {processing ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
