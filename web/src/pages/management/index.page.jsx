import React, { useState, useEffect } from 'react'
import PageHeader from '@/components/organisms/PageHeader'
import Template from '@/components/templates/Template'
import { Button, Card, TextInput } from 'flowbite-react'
import BreadCrumbs from '@/components/atoms/BreadCrumbs'
import Pagination from '@/components/organisms/Pagination'
import DeleteModal from '@/components/organisms/DeleteModal'

function Management() {
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
              <h5 className='text-md font-semibold mb-1'>List of Department</h5>
              <table>
                <tr>
                  <td></td>
                </tr>
              </table>
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
                    <TextInput placeholder='Department' />
                  </td>
                  <td>
                    <TextInput placeholder='Budget' />
                  </td>
                  <td>
                    <Button color='success' size='xs' type='button'>
                      Add
                    </Button>
                  </td>
                </tr>
              </table>
              <h5 className='text-md font-semibold mb-1'>
                List of Departmental Budget
              </h5>
              <table>
                <tr>
                  <td></td>
                </tr>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </Template>
  )
}
export default Management
