import React, { useState } from 'react';
import PageHeader from '@/components/organisms/PageHeader';
import Template from '@/components/templates/Template';
import { Button, Card, TextInput } from 'flowbite-react';
import BreadCrumbs from '@/components/atoms/BreadCrumbs';
import Pagination from '@/components/organisms/Pagination';
import SelectInput from '@/components/organisms/SelectInput';
import { useDepartments } from '@/hooks/redux/useDepartments';
import { useHooks } from './hooks';

const Management = () => {
  const { departments } = useDepartments();
  const { updateDepartmentBudget } = useHooks();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [budget, setBudget] = useState('');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDepartments = departments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleAddBudget = () => {
    if (selectedDepartment && budget) {
      updateDepartmentBudget(selectedDepartment, budget);
      setBudget('');
    }
  };

  return (
    <Template>
      <PageHeader>
        <BreadCrumbs />
      </PageHeader>
      <div className='mx-auto max-w-screen-lg mt-1'>
        <div className='grid grid-cols-2 gap-7'>
          <div className='flex flex-col'>
            <Card>
              <center>
                <h3 className='text-lg font-semibold mb-1'>Add Department</h3>
              </center>
              <table>
                <tr>
                  <td>
                    <TextInput placeholder='Department' />
                  </td>
                  <td>
                    <Button color='success' size='xs' type='button'>
                      Add
                    </Button>
                  </td>
                </tr>
              </table>
              <h5 className='text-md font-semibold mb-1'>
                List of Departments
              </h5>
              <table>
                <tbody>
                  {paginatedDepartments.map((department) => (
                    <tr key={department.id} className='border-b'>
                      <td className='px-4 py-1'>{department.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Card>
          </div>
          <div className='flex flex-col'>
            <Card>
              <center>
                <h3 className='text-lg font-semibold mb-1'>Add Total Budget</h3>
              </center>
              <table>
                <tr>
                  <td>
                    <SelectInput
                      name='department_id'
                      value={selectedDepartment}
                      onChange={handleSelectChange}
                      options={[
                        { value: '', label: 'Departments', isDisabled: true },
                        ...(departments?.map((department) => ({
                          value: department.id,
                          label: department.label,
                        })) || []),
                      ]}
                    />
                  </td>
                  <td>
                    <TextInput
                      placeholder='Budget'
                      value={budget}
                      onChange={handleBudgetChange}
                    />
                  </td>
                  <td>
                    <Button
                      color='success'
                      size='xs'
                      type='button'
                      onClick={handleAddBudget}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              </table>
              <h5 className='text-md font-semibold mb-1'>
                List of Departmental Budgets
              </h5>
              <table>
                <tbody>
                  {paginatedDepartments.map((department) => (
                    <tr key={department.id} className='border-b'>
                      <td className='px-2 py-1'>{department.label}</td>
                      <td> = </td>
                      <td className='px-2 py-1 text-right'>
                        <h2>&#8369; {department.budget} </h2>
                        {/* pesos sign */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Card>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Management;
