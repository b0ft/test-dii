"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    return (
        <div className="flex gap-5">
            <Link href="/formulir" className={`text-xl font-bold mb-4 ${pathname === "/formulir" ? "text-gray-500" : ""}`}>Formulir</Link>
            <Link href="/daftar-pasien" className={`text-xl font-bold mb-4 ${pathname === "/daftar-pasien" ? "text-gray-500" : ""}`}>Daftar Pasien</Link>
        </div>
    )
}