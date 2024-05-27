import React, { useState } from 'react'
import PageHeader from '@/components/organisms/PageHeader'
import TemplateGSD from '@/components/templates/TemplateGSD'
import { facilitieOptions, particulars } from '@/hooks/const'
import { Button, Card, TextInput } from 'flowbite-react'
import BreadCrumbs from '@/components/atoms/BreadCrumbs'
import Pagination from '@/components/organisms/Pagination'
import DeleteModal from '@/components/organisms/DeleteModal'

function Charges() {
  const itemsPerPage = 7

  const [facilitiesCurrentPage, setFacilitiesCurrentPage] = useState(1)
  const [itemsCurrentPage, setItemsCurrentPage] = useState(1)

  const facilitiesStartIndex = (facilitiesCurrentPage - 1) * itemsPerPage
  const facilitiesEndIndex = facilitiesStartIndex + itemsPerPage
  const itemsStartIndex = (itemsCurrentPage - 1) * itemsPerPage
  const itemsEndIndex = itemsStartIndex + itemsPerPage
  const paginatedFacilitieOptions = facilitieOptions.slice(
    facilitiesStartIndex,
    facilitiesEndIndex,
  )
  const paginatedOwnItems = particulars.slice(itemsStartIndex, itemsEndIndex)
  const totalPagesFacilities = Math.ceil(facilitieOptions.length / itemsPerPage)
  const totalPagesItems = Math.ceil(particulars.length / itemsPerPage)

  const handleFacilitiesPageChange = (pageNumber) => {
    setFacilitiesCurrentPage(pageNumber)
  }
  const handleItemsPageChange = (pageNumber) => {
    setItemsCurrentPage(pageNumber)
  }

  return (
    <TemplateGSD>
      <PageHeader>
        <BreadCrumbs />
      </PageHeader>
      <div className='mx-auto max-w-screen-lg mt-1'>
        <div className='grid grid-cols-2 gap-7'>
          <div className='flex flex-col'>
            <Card>
              <center>
                <h3 className='text-lg font-semibold mb-1'>Facilities</h3>
              </center>
              <table>
                <tr>
                  <td className='flex'>
                    <TextInput placeholder='Facility' />
                  </td>
                  <td>
                    <TextInput placeholder='Rate' />
                  </td>
                  <td className='px-2 py-2'>
                    <Button color='success' size='xs' type='button'>
                      Add
                    </Button>
                  </td>
                </tr>
              </table>
              <h5 className='text-md font-semibold'>List of Facilities</h5>
              <table>
                {paginatedFacilitieOptions.map((item) => (
                  <tr key={item.value} className='border-b'>
                    <td className='flex text-sm py-2'>{item.label}</td>
                    <td className='px-2'> = </td>
                    <td className='px-2 py-1 text-right'>
                      <h2>&#8369; 9,999.00</h2>
                    </td>
                    <td className='px-1 py-1 flex justify-end items-center space-x-1'>
                      <Button color='success' size='xs' type='button'>
                        Edit
                      </Button>
                    </td>
                    <td className='w-px h-4'>
                      <DeleteModal />
                    </td>
                  </tr>
                ))}
              </table>
              <Pagination
                currentPage={facilitiesCurrentPage}
                totalPages={totalPagesFacilities}
                onPageChange={handleFacilitiesPageChange}
              />
            </Card>
          </div>
          <div className='flex flex-col'>
            <Card>
              <center>
                <h3 className='text-lg font-semibold mb-1'>Items</h3>
              </center>
              <table>
                <tr>
                  <td className='flex'>
                    <TextInput placeholder='Item' />
                  </td>
                  <td>
                    <TextInput placeholder='Rate' />
                  </td>
                  <td className='px-2 py-2'>
                    <Button color='success' size='xs' type='button'>
                      Add
                    </Button>
                  </td>
                </tr>
              </table>
              <h5 className='text-md font-semibold'>List of Items</h5>
              <table>
                {paginatedOwnItems.map((item) => (
                  <tr key={item.value} className='border-b'>
                    <td className='flex text-sm py-2'>{item.label}</td>
                    <td className='px-2'> = </td>
                    <td className='px-2 py-1 text-right'>
                      <h2>&#8369; 9,999.00</h2>
                    </td>
                    <td className='px-1 py-1 flex justify-end items-center space-x-1'>
                      <Button color='success' size='xs' type='button'>
                        Edit
                      </Button>
                    </td>
                    <td className='w-px h-4'>
                      <DeleteModal />
                    </td>
                  </tr>
                ))}
              </table>
              <Pagination
                currentPage={itemsCurrentPage}
                totalPages={totalPagesItems}
                onPageChange={handleItemsPageChange}
              />
            </Card>
          </div>
        </div>
      </div>
    </TemplateGSD>
  )
}
export default Charges
