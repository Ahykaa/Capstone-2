// hooks.js
import { reservationApi } from '@/hooks/api/reservationApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useHandleError } from '@/hooks/useHandleError'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useToast } from '@/hooks/useToast'
import dayjs from 'dayjs'

const schema = yup.object({
  facilities: yup.array().of(yup.string()),
  reserv_at: yup.date(),
  time_at: yup.string(), // Change to string, as TimePicker returns string
  company_name: yup.string(),
  representative: yup.string(),
  address: yup.string(),
  activity: yup.string(),
  no_participants: yup.number(),
  event_date: yup.date(),
  event_time: yup.string(), // Change to string, as TimePicker returns string
  ownItems: yup.string(),
  quantity: yup.number(),
  rate: yup.number(),
  amount: yup.number(),
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      reserv_at: new Date().toISOString().split('T')[0],
      event_date: new Date().toISOString().split('T')[0],
      event_time: '10:00:00',
    },
    resolver: yupResolver(schema),
  })

  const [createReservationMutation] =
    reservationApi.useCreateReservationMutation()

  const onSubmit = async (data) => {
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    data.reserv_at = currentTime

    data.event_date = dayjs(data.event_date).format('YYYY-MM-DD HH:mm:ss')
    data.facilities = data.facilities.join(', ')
    try {
      const { message } = await createReservationMutation(data).unwrap()
      addToast({
        message: message,
      })
      router.push(`/reservations`)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      register,
      control,
    },
  }
}
