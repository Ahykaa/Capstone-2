import { Breadcrumb } from 'flowbite-react'

const BreadCrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs || !breadcrumbs.length) return null

  return (
    <Breadcrumb
      aria-label='Default breadcrumb example'
      className='bg-green-100 px-5 py-3 dark:bg-green-800'
    >
      {breadcrumbs?.map((breadcrumb) => {
        return (
          <Breadcrumb.Item
            key={breadcrumb.href}
            href={breadcrumb.href}
            icon={breadcrumb.icon}
          >
            {breadcrumb.title}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default BreadCrumbs
