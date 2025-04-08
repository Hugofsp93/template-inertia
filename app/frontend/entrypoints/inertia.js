import { createInertiaApp } from '@inertiajs/react'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'

createInertiaApp({
  // Set default page title
  // see https://inertia-rails.dev/guide/title-and-meta
  //
  // title: title => title ? `${title} - App` : 'App',

  // Disable progress bar
  //
  // see https://inertia-rails.dev/guide/progress-indicators
  // progress: false,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.jsx', {
      eager: true,
    })
    const page = pages[`../pages/${name}.jsx`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.jsx'`)
    }

    // Se a página NÃO tiver public = true, aplica o layout autenticado
    if (!page.default.public) {
      console.log('Aplicando layout autenticado para:', name)
      page.default.layout = (page) => createElement(AuthenticatedLayout, { user: page.props.auth.user }, page)
    } else {
      console.log('Página pública, sem layout autenticado:', name)
    }

    return page
  },

  setup({ el, App, props }) {
    console.log('Setup do App:', props)
    if (el) {
      createRoot(el).render(createElement(App, props))
    } else {
      console.error(
        'Missing root element.\n\n' +
          'If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n' +
          'Consider moving <%= vite_javascript_tag "inertia" %> to the Inertia-specific layout instead.',
      )
    }
  },
})
