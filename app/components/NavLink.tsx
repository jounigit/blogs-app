/* eslint-disable no-undef */
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string
  exact?: boolean
  className?: string
  children: React.ReactNode
}

const NavLink = ({ 
  href, 
  exact = false,
  children,
  className,
  ...props
 }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)
  const newClassName = isActive ? `${className} active` : className

  return (
    <Link href={href} className={newClassName} {...props}>
      {children}
    </Link>
  )
}

export default NavLink

// className="hover:text-gray-300"