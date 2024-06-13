import { reservationApi } from '@/hooks/api/reservationApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useHandleError } from '@/hooks/useHandleError'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { useToast } from '@/hooks/useToast'
import dayjs from 'dayjs'
import { errors } from '@/constants/formErrors'
import { useEffect } from 'react'

const schema = yup.object({
  facilities: yup.string().required(errors.required),
  reserv_at: yup.date().nullable(),
  time_at: yup
    .string()
    .required(errors.required)
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:mm format'),
  company_name: yup.string().required(errors.required),
  representative: yup.string().required(errors.required),
  address: yup.string().required(errors.required),
  activity: yup.string().required(errors.required),
  no_participants: yup.number().required(errors.required),
  event_date: yup.date().required(errors.required),
  event_time: yup
    .string()
    .required(errors.required)
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:mm format'),
  ownItems: yup.string().nullable(),
  entries: yup.array().of(
    yup.object({
      particulars: yup.string().required(errors.required),
      quantity: yup.number().required(errors.required),
      rate: yup.number().required(errors.required),
      amount: yup.number().required(errors.required),
    }),
  ),
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      reserv_at: new Date().toISOString().split('T')[0],
      event_date: new Date().toISOString().split('T')[0],
      event_time: '00:00', // Initialize event_time with a default value
      time_at: '00:00', // Initialize time_at with a default value
      entries: [{ particulars: '', quantity: 1, rate: 0, amount: 0 }], // Initialize entries with a single empty object
    },
    resolver: yupResolver(schema),
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'entries',
  })

  const [createReservationMutation] =
    reservationApi.useCreateReservationMutation()

  // Watch for changes in entries
  const entries = useWatch({ control, name: 'entries' })

  useEffect(() => {
    entries.forEach((entry, index) => {
      const { quantity, rate } = entry
      const amount = quantity * rate
      setValue(`entries.${index}.amount`, amount)
    })
  }, [entries, setValue])

  const onSubmit = async (formData) => {
    formData.reserv_at = dayjs(formData.reserv_at).format('YYYY-MM-DD HH:mm:ss')
    formData.event_date = dayjs(formData.event_date).format('YYYY-MM-DD')
    formData.event_time += ':00' // Append seconds to event_time
    formData.time_at += ':00' // Append seconds to time_at

    try {
      const response = await createReservationMutation(formData).unwrap()

      addToast({
        message: 'Created reservation successfully',
      })
      router.push(`/reservations/${response.reservation.id}`)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors: formErrors,
      register,
      control,
    },
    fields,
    append,
  }
}
