import cookie from 'js-cookie'

export const setCookie = (key: string, value: string) => {
    const portIndexInUrl = process.env.NEXT_PUBLIC_DOMAIN.indexOf(":")
    const _domain = portIndexInUrl >= 0 ?
        process.env.NEXT_PUBLIC_DOMAIN.substring(0, portIndexInUrl)
        : process.env.NEXT_PUBLIC_DOMAIN

    cookie.set(key, value, {expires: 30, domain: _domain});
}

export const getCookie = (key: string) : string | null => {
    return cookie.get(key)
}