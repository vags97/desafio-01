import './App.css'
import {
  BrowserRouter,
  Link
} from 'react-router-dom'
import { useState } from 'react'
import Router from './router'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import store from './store'
import { Provider, useSelector } from 'react-redux'

const nav = [
  { name: 'Inicio', href: '/' },
  { name: 'Archivo', href: '/file' },
  { name: 'Créditos', href: '/credits' }
]

function App () {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-white">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <Link to="/" className="m-1.5 p-1.5">
                  <span className="sr-only">Centro de Modelamiento Matemático - Copernicus</span>
                  <img className="h-8 w-auto" src="https://www.cmm.uchile.cl/wp-content/themes/Chameleon-CMM/images/logo_cmm20_h_02.png" alt=""/>
                </Link>
              </div>
              <div className="flex lg:hidden">
                <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                  <span className="sr-only">Abrir Menú</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {nav.map((item) => (
                  <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <LoginBtn/>
              </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Centro de Modelamiento Matemático - Copernicus</span>
                    <img
                  className="h-8 w-auto"
                  src="https://www.cmm.uchile.cl/wp-content/themes/Chameleon-CMM/images/logo_cmm20_h_02.png"
                  alt=""
                />
                  </a>
                  <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {nav.map((item) => (
                        <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="py-6">
                      <LoginBtnMobile/>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
          <div className="relative isolate px-6 pt-16 lg:px-8">
            <div className="pt-2">
              <Router/>
            </div>
          </div>

        </div>
      </BrowserRouter>
    </Provider>
  )
}

function LoginBtn () {
  const refreshToken = useSelector(state => state.user.tokens.refreshToken)
  if (refreshToken) {
    return <Link to="/logout" className="text-sm font-semibold leading-6 text-gray-900">Logout <span aria-hidden="true">&rarr;</span></Link>
  } else {
    return <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
  }
}

function LoginBtnMobile () {
  const refreshToken = useSelector(state => state.user.tokens.refreshToken)
  if (refreshToken) {
    return <Link
    to="/logut"
    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  >
      Logout
    </Link>
  } else {
    return <Link
      to="/login"
      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >
      Log in
    </Link>
  }
}

export default App
