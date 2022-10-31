export class SeatDetails {
    train: string | undefined
    trainCode?: string | undefined
    train_name?: string
    source: string
    destination: string
    source_time: Date
    date: Date
    dest_time: Date
    third_ac: number
    second_ac: number
    first_ac: number
    sleeper: number
    distance: number
    fair_sleeper: number
    fair_thirdAc: number
    fair_secondAc: number
    fair_firstAc: number



    
    constructor(train: string,trainCode: string  ,train_name: string, source:string , destination: string, source_time: Date,date: Date,dest_time: Date, third_ac:number,second_ac:number,first_ac:number,sleeper:number, distance: number,fair_sleeper:number,fair_thirdAc:number,fair_secondAc:number,fair_firstAc:number,) {
        this.train = train;
        this.trainCode = train;
        this.train_name = train_name
        this.source = source
        this.destination = destination
        this.source_time = source_time
        this.date = date
        this.dest_time = dest_time
        this.third_ac = third_ac
        this.second_ac = second_ac
        this.first_ac = first_ac
        this.sleeper = sleeper
        this.distance = distance
        this.fair_sleeper = fair_sleeper
        this.fair_thirdAc = fair_thirdAc
        this.fair_secondAc = fair_secondAc
        this.fair_firstAc = fair_firstAc



    }

}


export class TrainDetails {
    url?: string | undefined
    train: string | undefined
    train_name: string
    source: string
    destination: string
    source_time: Date
    destination_time: Date
   



    constructor(url: string, train: string, train_name: string, source:string , destination: string, source_time: Date,destination_time: Date, ) {
        this.url = url;
        this.train = train
        this.train_name = train_name
        this.source = source
        this.destination = destination
        this.source_time = source_time
        this.destination_time = destination_time
        
      

    }

}


export class SeatChart{
    train: string | undefined
    trainCode?: string | undefined
    train_name?: string
    date: Date
    third_ac: number
    second_ac: number
    first_ac: number
    sleeper: number
   



    
    constructor(train: string,date: Date,third_ac:number,second_ac:number,first_ac:number,sleeper:number) {
        this.train = train;
        this.trainCode = train;
        this.date = date;
        this.third_ac = third_ac;
        this.second_ac = second_ac;
        this.first_ac = first_ac;
        this.sleeper = sleeper;
       



    }

}


export class Ticket{
    train: string | undefined
    date: Date
    passenger:string[] | undefined
    type:string | undefined
    pnr:number | undefined
    chart: string | undefined
    seats: string | undefined
    fair: number | undefined
    user:string | undefined
   



    
    constructor(train: string | undefined,date: Date,passenger:string[] | undefined, type:string | undefined,pnr:number | undefined,chart: string | undefined,seats: string | undefined, fair: number | undefined,user:string | undefined) {
        this.train = train;
        
        this.date = date;
        this.passenger = passenger;
        this.type = type;
        this.pnr = pnr;
        this.chart = chart;
        this.seats = seats;
        this.fair = fair
       this.user =user



    }

}

export class TicketHistory{
    trainNo: string | undefined
    trainName: string | undefined
    source: string | undefined
    destination: string | undefined
    source_time: Date | undefined
    dest_time: Date | undefined

    constructor(url: string, trainNo: string, trainName: string, source:string , destination: string, source_time: Date,dest_time: Date, ) {
        
        this.trainNo = trainNo
        this.trainName = trainName
        this.source = source
        this.destination = destination
        this.source_time = source_time
        this.dest_time = dest_time
        
      

    }

}