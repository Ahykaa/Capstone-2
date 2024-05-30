import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { errors } from '@/constants/formErrors'
import { orderApi } from '@/hooks/api/orderApi'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { useUser } from '@/hooks/redux/auth'
import { useEffect } from 'react'

const schema = yup.object({
  order_at: yup.date().required(),
  date_needed: yup.date().required(),
  request_fors_id: yup.string().required(errors.required),
  notes: yup.string(),
  status_id: yup.string().required(errors.required),
  entries: yup.array().of(
    yup.object().shape({
      quantity: yup.number().required(errors.required),
      unit_id: yup.string().required(errors.required),
      description: yup.string().required(errors.required),
      uniCost: yup.number().required(errors.required),
      amount: yup.number().required(errors.required),
      remarks: yup.string(),
    }),
  ),
})

export function useHooks() {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      order_at: new Date().toISOString().split('T')[0],
      entries: [{ quantity: 1, uniCost: 0, amount: 0 }], // Initialize with one entry
      status_id: '1',
    },
    resolver: yupResolver(schema),
  })

  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const [createOrderMutation] = orderApi.useCreateOrderMutation()
  const { user } = useUser()

  const entries = watch('entries')

  const calculateAmount = async () => {
    try {
      const updatedEntries = entries.map((entry) => ({
        ...entry,
        amount: entry.quantity * entry.uniCost,
      }))
      setValue('entries', updatedEntries)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    calculateAmount()
  }, [entries]) 

  const onSubmit = async (formData) => {
    formData.order_at = dayjs(formData.order_at).format('YYYY-MM-DD HH:mm:ss')
    formData.date_needed = dayjs(formData.date_needed).format('YYYY-MM-DD')
    formData.from = user.name
    formData.department_id = user.department_id
    try {
      const response = await createOrderMutation(formData).unwrap()

      addToast({
        message: 'Created order successfully',
      })
      router.push(`/orders/${response.order.id}`) // Use response.order.id to get the correct ID
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
  }
}
