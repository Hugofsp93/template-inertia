import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import AuthenticatedLayout from './Layouts/AuthenticatedLayout'

createInertiaApp({
  resolve: (name) => {
    const page = resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'))
    page.then((module) => {
      if (module.default.layout === undefined) {
        module.default.layout = (page) => {
          if (page.props.auth?.user) {
            return <AuthenticatedLayout user={page.props.auth.user}>{page}</AuthenticatedLayout>
          }
          return page
        }
      }
      return module
    })
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
