import { useUpdateDepartmentMutation } from '@/hooks/api/departmentApi'
import { useRouter } from 'next/router'

export const useHooks = () => {
  const [updateDepartment] = useUpdateDepartmentMutation()
  const router = useRouter()

  const updateDepartmentBudget = async (departmentId, budget) => {
    try {
      await updateDepartment({ departmentId, budget }).unwrap()

      router.reload()
    } catch (error) {
      console.error('Failed to update budget:', error)
    }
  }

  return {
    updateDepartmentBudget,
  }
}
