import { useForm } from '@inertiajs/react'

export default function Form({ user, onSubmit, submitText }) {
  const form = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setData('name', e.target.value)}
          required
        />
        {errors.name && (
          <div className="text-red-500 text-sm mt-1">
            {errors.name}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={data.email}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setData('email', e.target.value)}
          required
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">
            {errors.email}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={data.password}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setData('password', e.target.value)}
          required={!user.id}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {errors.password}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
          Confirme a Senha
        </label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          value={data.password_confirmation}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setData('password_confirmation', e.target.value)}
          required={!user.id}
        />
        {errors.password_confirmation && (
          <div className="text-red-500 text-sm mt-1">
            {errors.password_confirmation}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={processing}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}
