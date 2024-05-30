import { useUpdateDepartmentMutation, useAddDepartmentMutation } from '@/hooks/api/departmentApi'
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
      console.error('Failed to update budget:', error)
    }
  }

  const addNewDepartment = async (label) => {
    try {
      await addDepartment({ label }).unwrap()
      router.reload()
    } catch (error) {
      console.error('Failed to add department:', error)
    }
  }

  return {
    updateDepartmentBudget,
    addNewDepartment,
  }
}
