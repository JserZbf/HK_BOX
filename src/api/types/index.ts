export interface Configurations {
    device_name: string
    ip: string
    port: number
    items: IterableIterator<[string, Configuration]>
}

export interface Configuration {
    is_waring: number
    up_limit: number
    low_limit: number
    alarm_step: number
    up: number
    low: number
    acquisition_type: string
    acquisition_title: string
    sensor_type: string
    model: string
    port: number
    reporting_code: string
    deviation: number
}

export interface Config {
    key: string
    value: any
}

interface objType {
    money: (value: number) => number
    arr: () => string[]
}
const obj2: objType = {
    money: (val) => val,
    arr: () => ['1'],
}

console.log(obj2.money(2))
console.log(obj2.arr())


interface objType2<T1, T2> {
    money: (value: T1) => T1
    arr: () => T2[]
}
const obj: objType2<number, string> = {
    money: (val) => val,
    arr: () => ['1'],
}

console.log(obj.money(2))
console.log(obj.arr())
