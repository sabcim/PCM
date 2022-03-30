const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

export function secondsToDate1(secs: number) {

    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

interface FullDate {

    day: string
    month: string
    year: string
}

export class secondsDate {

    constructor(
        public seconds:number,
        public fullDate?: FullDate,
        public dateObject?: any
    ) {}

    secondsToDate() {

        const t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(this.seconds);
        this.dateObject = t
    }

    toFullDate() {

        if (!this.dateObject) return

        const fullDate = {
            day: this.dateObject.getDate(),
            month: months[this.dateObject.getMonth()],
            year: this.dateObject.getFullYear()
        }

        this.fullDate = fullDate
    }
}