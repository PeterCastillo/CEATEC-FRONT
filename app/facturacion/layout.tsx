"use client"
import { useState } from "react"
import { Sidebar } from '@/components/facturacion/sidebarFacturacion/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  const handleShowSidebar = (): void => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="layout">
      <div className="layout_container_facturacion">
        <Sidebar show={showSidebar} handleShowSidebar={handleShowSidebar} />
        <div className="layout_content">{children}</div>
      </div>
    </div>
  )
}
