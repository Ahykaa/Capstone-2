import {
  useUpdateDepartmentMutation,
  useAddDepartmentMutation,
} from '@/hooks/api/departmentApi'
import { useRouter } from 'next/router'

export const useHooks = () => {
  const [updateDepartment] = useUpdateDepartmentMutation()
  const [addDepartment] = useAddDepartmentMutation()
  const router = useRouter()

  const updateDepartmentBudget = async (departmentId, budget) => {
    try {
      await updateDepartment({ departmentId, budget }).unwrap()
      router.reload()
    } catch (error) {
      handleError(error)
    }
  }

  const addNewDepartment = async (label) => {
    try {
      await addDepartment({ label }).unwrap()
      router.reload()
    } catch (error) {
      handleError(error)
    }
  }

  return {
    updateDepartmentBudget,
    addNewDepartment,
  }
}
