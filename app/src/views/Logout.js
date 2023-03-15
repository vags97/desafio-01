
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { destroyUser } from '../store/features/userSlice'

export default function Logout () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const refreshToken = useSelector(state => state.user.tokens.refreshToken)
  useEffect(() => {
    if (!refreshToken) {
      navigate('/login-required', { replace: true })
    } else {
      dispatch(destroyUser())
    }
  }, [])
  return <div className='grid place-items-center'>
    <h2 className="text-3xl font-bold">Sesión Cerrada</h2>

  </div>
}
