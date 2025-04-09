import { Head, Link } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'

export default function Login({ errors = [], flash = {} }) {
  const { data, setData, post, processing } = useForm({
    user: {
      email: '',
      password: '',
      remember_me: false,
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/sign_in', {
      onError: () => {
        // Não precisamos fazer nada aqui, pois o erro será tratado pelo backend
      }
    })
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })
  }

  return (
    <>
      <Head title="Login" />

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entre na sua conta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {flash.notice && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                {flash.notice}
              </div>
            )}

            {errors.length > 0 && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm">{error}</p>
                ))}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    checked={data.user.remember_me}
                    onChange={(e) => handleChange('remember_me', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Lembrar-me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/users/password/new"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {processing ? 'Entrando...' : 'Entrar'}
                </button>
              </div>

              <div className="text-sm text-center">
                <Link
                  href="/users/sign_up"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Não tem uma conta? Cadastre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

// Marca a página como pública para não usar o layout autenticado
Login.public = true 