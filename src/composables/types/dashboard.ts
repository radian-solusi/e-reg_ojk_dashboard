export interface SummaryDashboard {
    total_emiten: number,
    total_evaluasi: number,
    evaluasi_terakhir: string
}

export interface ActivityDashboard {
    emiten: string,
    aspek: string,
    tipe: string,
    diubah_oleh: string,
    waktu: string
}

export interface ResponseDashboard {
    summary: SummaryDashboard,
    recent_activities: ActivityDashboard[]
}