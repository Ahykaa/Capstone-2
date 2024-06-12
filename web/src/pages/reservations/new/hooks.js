import { reservationApi } from '@/hooks/api/reservationApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useHandleError } from '@/hooks/useHandleError'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { useToast } from '@/hooks/useToast'
import dayjs from 'dayjs'

const schema = yup.object({
  facilities: yup.string(),
  reserv_at: yup.date().nullable(),
  time_at: yup
    .string()
    .nullable()
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:mm format'),
  company_name: yup.string().required('Company name is required'),
  representative: yup.string().required('Representative is required'),
  address: yup.string().required('Address is required'),
  activity: yup.string().required('Activity is required'),
  no_participants: yup
    .number()
    .required('Number of participants is required')
    .typeError('Must be a number'),
  event_date: yup.date().required('Event date is required'),
  event_time: yup
    .string()
    .required('Event time is required')
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:mm format'),
  ownItems: yup.string().required('Own items are required'),
  entries: yup
    .array()
    .of(
      yup.object({
        particulars: yup.string().required('Particulars are required'),
        quantity: yup
          .number()
          .required('Quantity is required')
          .typeError('Must be a number'),
        rate: yup
          .number()
          .required('Rate is required')
          .typeError('Must be a number'),
        amount: yup
          .number()
          .required('Amount is required')
          .typeError('Must be a number'),
      }),
    )
    .min(1, 'At least one entry is required'),
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
  } = useForm({
    defaultValues: {
      reserv_at: new Date().toISOString().split('T')[0],
      event_date: new Date().toISOString().split('T')[0],
      event_time: '00:00', // Initialize event_time with a default value
      time_at: '00:00', // Initialize time_at with a default value
      entries: [{ particulars: '', quantity: '', rate: '', amount: '' }], // Initialize entries with a single empty object
    },
    resolver: yupResolver(schema),
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'entries',
  })

  const [createReservationMutation] =
    reservationApi.useCreateReservationMutation()

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
