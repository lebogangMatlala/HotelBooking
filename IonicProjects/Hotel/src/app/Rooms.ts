export class Rooms{
    roomName:string;
    roomPrice:string;
    roomimage:any;
    description:string;
  

    constructor(roomName:string,roomPrice:string,roomimage:any,description:string)
    {
            this.roomName=roomName;
            this.roomPrice=roomPrice;
            this.roomimage=roomimage;
            this.description=description;
    }
}