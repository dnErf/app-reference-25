export const LocalStorage = {
    get: (key: string) => {
        let data = localStorage.getItem(key)
        return data !== null
            ? JSON.parse(data)
            : null
    },
    set: (key: string, data: any) => {
        localStorage.setItem(key, JSON.stringify(data))
    }
}
