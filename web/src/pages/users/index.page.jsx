import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

import Loading from '@/components/atoms/Loading'
import PageHeader from '@/components/organisms/PageHeader'
import Pagination from '@/components/organisms/Pagination'
import AdminGuard from '@/components/templates/AdminGuard'
import Template from '@/components/templates/Template'

import useHooks from './hooks'
import { capitalizeFirstLetter } from '@/hooks/lib/util'

const Dashboard = () => {
  const {
    users,
    isLoading,
    breadcrumbs,
    totalPages,
    currentPage,
    onPageChange,
    getPositionLabel,
  } = useHooks()

  return (
    <Template>
      <AdminGuard>
        <PageHeader
          breadcrumbs={breadcrumbs}
          right={
            <Link href='/users/new'>
              <Button size='xs' color='success'>
                Create User
              </Button>
            </Link>
          }
        />
        {isLoading ?
          <Loading />
        : <Table>
            <TableHead>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Department</TableHeadCell>
              <TableHeadCell>Position</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.department.label}</TableCell>
                    <TableCell>{getPositionLabel(user.position)}</TableCell>
                    <TableCell>{capitalizeFirstLetter(user.role)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        }

        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </AdminGuard>
    </Template>
  )
}

export default Dashboard
