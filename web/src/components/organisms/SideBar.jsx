import Link from 'next/link';
import { HiOutlineNewspaper, HiOutlineUsers, HiTemplate } from 'react-icons/hi';
import { GrTransaction } from 'react-icons/gr';

const links = [
  {
    label: 'Dashboard',
    icon: <HiTemplate />,
    link: '/dashboard',
  },
  {
    label: 'Transaction',
    icon: <GrTransaction />,
    link: '/transaction',
  },
  {
    label: 'Request',
    icon: <HiOutlineNewspaper />,
    link: '/orders/new',
  },
  {
    label: 'User Management',
    icon: <HiOutlineUsers />,
    link: '/users',
  },
];

const Sidebar = () => {
  return (
    <aside className='pt-2 w-64 overflow-y-auto bg-white drop-shadow-lg'>
      <ul className='space-y-2'>
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.link}
              passHref
              className='pl-4 py-2 flex items-center hover:bg-green-100 dark:hover:bg-green-700'
            >
              {item.icon}
              <span className='ms-3'>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
