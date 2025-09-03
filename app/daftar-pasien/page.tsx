"use client"

import { Input } from "@/components/ui/input"
import { Pasien } from "@/types/pasien"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockData: Pasien[] = [
    {
        nama: "Aldy S",
        nik: "1234567890123456",
        diagnosaMasuk: "lorem ipsum dolor sit amet",
        tanggalMasuk: "2022-10-01",
        dokterPenanggungJawab: "lorem ipsum dolor sit amet",
        ruangan: "111"
    },
    {
        nama: "Aldo",
        nik: "1234567890654321",
        diagnosaMasuk: "lorem ipsum dolor sit amet",
        tanggalMasuk: "2021-10-01",
        dokterPenanggungJawab: "lorem ipsum dolor sit amet",
        ruangan: "111"
    },
    {
        nama: "Doni",
        nik: "5432167890123456",
        diagnosaMasuk: "lorem ipsum dolor sit amet",
        tanggalMasuk: "2024-10-01",
        dokterPenanggungJawab: "lorem ipsum dolor sit amet",
        ruangan: "111"
    },
    {
        nama: "Dedi",
        nik: "3214567890123456",
        diagnosaMasuk: "lorem ipsum dolor sit amet",
        tanggalMasuk: "2023-10-01",
        dokterPenanggungJawab: "lorem ipsum dolor sit amet",
        ruangan: "111"
    },
    {
        nama: "Supri",
        nik: "1114567890123456",
        diagnosaMasuk: "lorem ipsum dolor sit amet",
        tanggalMasuk: "2023-05-10",
        dokterPenanggungJawab: "lorem ipsum dolor sit amet",
        ruangan: "111"
    },
    {
        nama: "Andi",
        nik: "2224567890123456",
        diagnosaMasuk: "lorem ipsum dolor sit amet",
        tanggalMasuk: "2023-01-10",
        dokterPenanggungJawab: "lorem ipsum dolor sit amet",
        ruangan: "111"
    },
    
]

type SortKey = keyof Pasien

export default function DaftarPasien() {
    const [data, setData] = useState<Pasien[]>([])
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState<SortKey>("nama")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setData(mockData)
            setLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const handleSort = (key: SortKey) => {
        if (sortBy == key) {
            setSortOrder(sortOrder == "asc" ? "desc" : "asc")
        } else {
            setSortBy(key)
            setSortOrder("asc")
        }
    }

    const sortedPasien = [...data].sort((a, b) => {
        const valueA = a[sortBy]
        const valueB = b[sortBy]

        if (typeof valueA == "string" && typeof valueB == "string") {
            if (sortBy == "tanggalMasuk") {
                const dateA = new Date(valueA).getTime()
                const dateB = new Date(valueB).getTime()
                return sortOrder == "asc" ? dateA - dateB : dateB - dateA
            } else {
                return sortOrder == "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
            }
        }

        return 0
    })

    const filteredPasien = sortedPasien.filter(pasien => {
        const lower = search.toLowerCase()
        return (
            pasien.nama.toLowerCase().includes(lower) || pasien.nik.toLowerCase().includes(lower)
        )
    })

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const indexOfLast = currentPage * itemsPerPage
    const indexOfFirst = indexOfLast - itemsPerPage
    const currentPasien = filteredPasien.slice(indexOfFirst, indexOfLast)

    return (
        <div className="p-6">
            <Navbar />

            <div className="mb-4">                
                <Input
                    type="text"
                    id="search"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    placeholder="Cari pasien berdasarkan nama atau NIK..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <Table className="w-full border border-gray-400 rounded-lg overflow-hidden">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSort("nama")}>Nama</TableHead>
                        <TableHead className="px-4 py-2 hover:bg-gray-200">NIK</TableHead>
                        <TableHead className="px-4 py-2 hover:bg-gray-200">Diagnosa Masuk</TableHead>
                        <TableHead className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSort("tanggalMasuk")}>Tanggal Masuk</TableHead>
                        <TableHead className="px-4 py-2 hover:bg-gray-200">Dokter Penanggung Jawab</TableHead>
                        <TableHead className="px-4 py-2 hover:bg-gray-200">Ruangan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="px-4 py-2 text-center text-gray-500">Loading...</TableCell>
                        </TableRow>
                    ) : currentPasien.length > 0 ? (
                        <>{currentPasien.map((pasien, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                                <TableCell className="px-4 py-2">{pasien.nama}</TableCell>
                                <TableCell className="px-4 py-2">{pasien.nik}</TableCell>
                                <TableCell className="px-4 py-2">{pasien.diagnosaMasuk}</TableCell>
                                <TableCell className="px-4 py-2">{pasien.tanggalMasuk}</TableCell>
                                <TableCell className="px-4 py-2">{pasien.dokterPenanggungJawab}</TableCell>
                                <TableCell className="px-4 py-2">{pasien.ruangan}</TableCell>
                            </TableRow>
                        ))}</>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="px-4 py-2 text-center text-gray-500">Tidak ada data</TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
            <div className="flex gap-2 mt-4">
                <Button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 disabled:opacity-50"
                >
                    Prev
                </Button>    

                {Array.from({length: Math.ceil(filteredPasien.length / itemsPerPage)}, (_, i) => (
                    <Button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {i + 1}
                    </Button>
                ))}

                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPasien.length / itemsPerPage)))}
                    disabled={filteredPasien.length === 0 || currentPage === Math.ceil(filteredPasien.length / itemsPerPage)}
                    className="px-3 py-2 disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}