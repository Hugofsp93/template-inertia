import { Head, Link } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'

export default function Register({ errors = [] }) {
  const { data, setData, post, processing } = useForm({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users')
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })
  }

  return (
    <>
      <Head title="Cadastro" />

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {errors.length > 0 && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.user.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.user.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={data.user.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                  Confirme a Senha
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  value={data.user.password_confirmation}
                  onChange={(e) => handleChange('password_confirmation', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {processing ? 'Criando conta...' : 'Criar conta'}
                </button>
              </div>

              <div className="text-sm text-center">
                <Link
                  href="/users/sign_in"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Já tem uma conta? Faça login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 