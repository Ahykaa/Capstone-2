import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { errors } from '@/constants/formErrors'
import { orderApi } from '@/hooks/api/orderApi'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'

const schema = yup.object({
  order_at: yup.date().required(),
  date_needed: yup.date().required(),
  from: yup.string().required(errors.required),
  department_id: yup.string().required(errors.required),
  request_for: yup.array(),
  notes: yup.string(),
  status_id: yup.string().required(errors.required),
  quantity: yup.number().required().typeError(errors.required),
  unit_id: yup.string().required(errors.required),
  description: yup.string().required(errors.required),
  unitCost: yup.number().default(0).typeError(errors.required),
  amount: yup.number().required(),
  remarks: yup.string(),
})

export function useHooks() {
  const router = useRouter()
  const { addToast } = useToast()
  const { handleError } = useHandleError()
  const [createOrderMutation] = orderApi.useCreateOrderMutation()
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      quantity: 1,
      downpayment: 0,
      amount: 0,
      status_id: '1',
    },
    resolver: yupResolver(schema),
  })
  register('status_id')

  const onSubmit = async (formData) => {
    formData.order_at = dayjs(formData.order_at).format('YYYY-MM-DD')
    formData.date_needed = dayjs(formData.date_needed).format('YYYY-MM-DD')

    try {
      const order = await createOrderMutation(formData).unwrap()
      addToast({
        message: 'Created order successfully',
      })
      router.push(`/orders/${order.id}`)
    } catch (error) {
      handleError(error)
    }

    console.log('Form Data:', formData)
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
