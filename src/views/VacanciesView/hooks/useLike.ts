import { ref } from 'vue'
import { useApiState, useAuthState, useDispatch } from '@/utils'
import { fetchActions } from '@/store/constants'

const useLike = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const likeUpdate = ref<symbol | null>(null)

  const like = async (id: number) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectVacancyID', id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.like/`,
      info: { method: 'POST', body }
    })

    likeUpdate.value = Symbol()
  }

  const dislike = async (id: number) => {
    const body = new FormData()
    body.append('token', authState.value.token as string)
    body.append('projectVacancyID', id.toString())

    await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.apiUrl}/mate/projectVacancies.removeLike/`,
      info: { method: 'POST', body }
    })

    likeUpdate.value = Symbol()
  }

  const toggleLike = ({ id, value }: { id: number, value: boolean }) => {
    if (value) like(id)
    else dislike(id)
  }

  return { toggleLike, likeUpdate }
}

export default useLike