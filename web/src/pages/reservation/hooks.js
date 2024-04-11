import { useForm } from 'react-hook-form'

export function useHooks() {
  const { control } = useForm()
  return {
    control,
  }
}
