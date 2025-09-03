"use client"

import { Button } from "@/components/ui/button"
import { Pasien, pasienSchema } from "@/types/pasien"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
} from "@/components/ui/form"
import Navbar from "@/components/Navbar"
import { FormInputField } from "@/components/FormInputField"


export default function PasienMasuk() {

    const form = useForm<Pasien>({
        resolver: zodResolver(pasienSchema),
        defaultValues: {
            nama: "",
            nik: "",
            diagnosaMasuk: "",
            tanggalMasuk: "",
            dokterPenanggungJawab: "",
            ruangan: "",
        }
    })

    const submitForm = (data: Pasien) => {
        console.log("test: ", data)
    }

    return (
        <div className="p-6">
            <Navbar />
            <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)} className="space-y-2">
                        <FormInputField
                            control={form.control}
                            name="nama"
                            label="Nama"
                            placeholder="Nama"
                        />

                        <FormInputField
                            control={form.control}
                            name="nik"
                            label="NIK"
                            placeholder="NIK"
                        />

                        <FormInputField
                            control={form.control}
                            name="diagnosaMasuk"
                            label="Diagnosa Masuk"
                            placeholder="Diagnosa Masuk"
                        />

                        <FormInputField
                            control={form.control}
                            name="tanggalMasuk"
                            label="Tanggal Masuk"
                            placeholder="Tanggal Masuk"
                            type="date"
                        />

                        <FormInputField
                            control={form.control}
                            name="dokterPenanggungJawab"
                            label="Dokter Penanggung Jawab"
                            placeholder="Dokter Penanggung Jawab"
                        />

                        <FormInputField
                            control={form.control}
                            name="ruangan"
                            label="Ruangan"
                            placeholder="Ruangan"
                        />            

                        <Button type="submit">Kirim</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}