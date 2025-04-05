import { Head, Link } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'

export default function ForgotPassword({ errors = [], flash = {} }) {
  const { data, setData, post, processing } = useForm({
    user: {
      email: '',
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/password')
  }

  const handleChange = (field, value) => {
    setData('user', {
      ...data.user,
      [field]: value
    })
  }

  return (
    <>
      <Head title="Recuperar Senha" />

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recuperar sua senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite seu email e enviaremos instruções para redefinir sua senha
          </p>
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
                  <p key={index}>{error}</p>
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
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {processing ? 'Enviando...' : 'Enviar instruções'}
                </button>
              </div>

              <div className="text-sm text-center">
                <Link
                  href="/users/sign_in"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Voltar para o login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 