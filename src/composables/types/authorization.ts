export interface userlogin {
    username: string,
    token: string,
    isMultiFactorActive : boolean
    expired?: string | number,
}

export interface formLogin {
    email: string,
    password: string
    remember?: boolean
}

