import { z } from "zod"

export const pasienSchema = z.object({
    nama: z.string().min(1, "Nama harus diisi"),
    nik: z.string().length(16, "NIK harus terdiri dari 16 digit"),
    diagnosaMasuk: z.string().min(1, "Diagnosa masuk harus diisi"),
    tanggalMasuk: z.string().min(1, "Tanggal masuk harus diisi"),
    dokterPenanggungJawab: z.string().min(1, "Dokter penanggung jawab harus diisi"),
    ruangan: z.string().min(1, "Ruangan harus diisi")
});

export type Pasien = z.infer<typeof pasienSchema>