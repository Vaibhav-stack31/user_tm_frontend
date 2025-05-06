'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const menuItems = [
  { label: 'Dashboard', img: '/dashboard.png', href: '/dashboard' },
  { label: 'Attendance', img: '/attendance.png', href: '/attendance' },
  { label: 'Add TimeSheet', img: '/timesheet.png', href: '/timesheet' },
  { label: 'Calendar', img: '/calendar.png', href: '/calendar' },
  { label: 'Leave', img: '/leave.png', href: '/leavetable' },
  { label: 'Salary', img: '/salary.png', href: '/salary' },
  { label: 'Company Policies', img: '/company.png', href: '/companyPolicy' },
  { label: 'Logout', img: '/logout.png', href: '/' }
]

export default function Sidebar() {
  return (
    <div className="fixed min-h-screen w-1/6 bg-gradient-to-b from-[#018ABE] via-[#65B7D4] to-[#E0E2E3] text-white flex flex-col items-center py-6">

      {/* Logo */}
      <div className="flex justify-center mb-3">
        <Image
          src="/task.png"
          alt="Logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 w-full px-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-4 px-3 py-2 hover:bg-white hover:text-sky-700 rounded-lg transition duration-200"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Image src={item.img} alt={item.label} width={24} height={24} />
            </div>
            <span className="text-md font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
