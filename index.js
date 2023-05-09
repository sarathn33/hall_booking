const express=require("express");
const app=express();
const PORT=5050;
app.use(express.json());

const rooms=[{
    id:1,
    room_name:"room1",
    seats:100,
    amenities:"AC,water purifier",
    price:15000
},
{
    id:2,
    room_name:"room2",
    seats:150,
    amenities:"AC,water purifier,wifi,food",
    price:25000
}]

const customers=[{
    name:"sarath",
    room_name:"room1",
    date: "2022-11-15",
    start_time:"11:30",
    end_time:"03:30",
    room_id:"1",
    status:"booked",
},
    {
    name:"darshan",
    room_name:"room2",
    date:"2022-06-12",
    start_time:"12:45",
    end_time:"02:30",
    room_id:"2",
    status:"booked",
}]
//starting website
app.get("/",(req,res)=>{
    res.send({message:"hello Welcome to hall Booking Website!",
            to_create_room : "/add-room",
            to_book_room : "/customer/book",
            booked_rooms : "/room/details",
            booked_customer : "/customer/details"});
})

//booking a room 
app.post("/customer/book",(req,res)=>{
    let id=customers.length+1;
    req.body.room_id = id;
    try {
        req.body.date=new Date(req.body.date);
        const data={
            name:req.body.name,
            room_name:req.body.room_name,
            date:req.body.date,
            start_time:req.body.start_time,
            end_time:req.body.end_time,
            room_id:req.body.room_id,
            status:"booked",
        }
        for(const book of customers){
            if(
               book.room_name==req.body.room_name && 
               book.date.getTime() ==req.body.date.getTime() &&
                book.start_time.getTime() == req.body.start_time.getTime()
            ){
                return res.send("the room is not availabe at this time slot")
            }else{
                customers.push(data);
                return res.send("booking a room was successful")
            }
        }
    } catch (error) {
        res.send("internal error")
    }
       
      
    
   
})

//creating a room 
app.post("/add_room",(req,res)=>{
    const id=rooms.length+1;
    req.body.room_id = id;
    const newroom={
        id:req.body.id,
        room_name:req.body.room_name,
        seats:req.body.seats,
        amenities:req.body.amenities,
        price:req.body.price
    }
    rooms.push(newroom);
    res.send("room created sucessfully!");
})
 
//room details

app.get("/room/details",(req,res) => {
    const roomArr=[];


    customers.forEach((customer)=>{
        const roomdet={};
    
      roomdet.room_name = customer.room_name,
      roomdet.status = customer.status,
      roomdet.name = customer.name,
      roomdet.date = customer.date,
      roomdet.start_time = customer.start_time,
      roomdet.end_time = customer.end_time
    roomArr.push(roomdet);
    })
res.send(roomArr)
  
})

//customer details

app.get("/customer/details", (req,res)=>{
    const customerArr=[];

    customers.forEach((customer)=>{
        const customdet={};
        customdet.name = customer.name,
        customdet.room_name = customer.room_name,
        customdet.date = customer.date,
        customdet.start_time = customer.start_time,
        customdet.end_time = customer.end_time
    customerArr.push(customdet);
    })
    res.send(customerArr);
})


app.listen(PORT,()=>console.log("your server listening on port"+PORT));