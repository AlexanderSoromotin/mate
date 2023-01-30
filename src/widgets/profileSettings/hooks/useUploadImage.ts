import { ref } from 'vue'
import { fetchActions } from '@/store/constants'
import {
  useApiState, useAuthState, useDispatch, FileInfo
} from '@/utils'

const useUploadImage = () => {
  const apiState = useApiState()
  const authState = useAuthState()
  const dispatch = useDispatch()

  const avatar = ref<null | File>(null)
  const cover = ref<null | File>(null)

  const setAvatar = (files: FileList) => {
    [avatar.value] = files
  }

  const setCover = (files: FileList) => {
    [cover.value] = files
    console.log('setCover', cover.value)
  }

  const uploadImage = async (type: 'avatar' | 'cover') => {
    const body = new FormData()
    body.append('token', authState.value.token as string)

    if (type === 'avatar') {
      if (!authState.value.token || !avatar.value) return null
      body.append('files', avatar.value)
    }

    if (type === 'cover') {
      if (!authState.value.token || !cover.value) return null
      body.append('files', cover.value)
    }

    return ((await dispatch(fetchActions.FETCH, {
      url: `${apiState.value.cloudUlr}/methods/cloud.uploadFiles/`,
      info: {
        method: 'POST',
        body
      }
    })) as FileInfo[])[0].fileID
  }

  return { setAvatar, setCover, uploadImage }
}

export default useUploadImage
