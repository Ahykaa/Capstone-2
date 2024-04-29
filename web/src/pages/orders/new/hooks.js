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
  request_for: yup.array(),
  notes: yup.string(),
  status_id: yup.string().required(errors.required),
  quantity: yup.number().required().typeError(errors.required),
  unit_id: yup.string().required(errors.required),
  description: yup.string().required(errors.required),
  uniCost: yup.number().default(0).typeError(errors.required),
  amount: yup.number().required(),
  remarks: yup.string(),
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
      order_at: new Date().toISOString().split('T')[0], // Set order_at to today's date
      quantity: 1,
      downpayment: 0,
      amount: 0,
      status_id: '1',
      uniCost: 0,
    },
    resolver: yupResolver(schema),
  })

  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const [createOrderMutation] = orderApi.useCreateOrderMutation()
  const { user } = useUser()

  const quantity = watch('quantity')
  const uniCost = watch('uniCost')

  const calculateAmount = async () => {
    try {
      const amount = quantity * uniCost
      setValue('amount', amount)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    // Calculate amount when quantity or unit cost changes
    calculateAmount()
  })

  const onSubmit = async (formData) => {
    formData.order_at = dayjs(formData.order_at).format('YYYY-MM-DD HH:mm:ss')
    formData.date_needed = dayjs(formData.date_needed).format('YYYY-MM-DD')
    formData.from = user.name
    formData.department_id = user.department_id
    try {
      const order = await createOrderMutation(formData).unwrap()
      addToast({
        message: 'Created order successfully',
      })
      router.push(`/orders/${order.id}`)
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
