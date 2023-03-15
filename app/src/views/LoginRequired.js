import {
  Link
} from 'react-router-dom'

export default function LoginRequired () {
  return <div className='grid place-items-center'>
    <h2 className="text-3xl font-bold py-2">Login Required</h2>
    <h3 className='py-2'>
      Necesita&nbsp;
      <Link to="/login" className=" text-blue-600 dark:text-blue-500 hover:underline">
        Iniciar Sesión
      </Link> para ingresar a esta página.
    </h3>
  </div>
}
