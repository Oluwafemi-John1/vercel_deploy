const studentModel = require('../models/user.model');

const cloudinary = require('cloudinary').v2;

const nodemailer = require('nodemailer')

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  

const getUserLandingPage = (req,res) => {
    res.send(
        [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",

            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
            },
            {
                "id": 3,
                "name": "Clementine Bauch",
                "username": "Samantha",
            },
            [
                {
                    "name": "Rice",
                    "category" : "Grains",
                    "price" : 10
                },
                {
                    "name": "Wheat",
                    "category" : "Grains",
                    "price" : 20
                }
            ]
        ]
    )
}

const getStudentInfo = (req,res) => {
    // console.log(req.body);
    let form = new studentModel(req.body)
    form.save()
    .then((response)=>{
        console.log({message:"Successfully signed up", response});
        res.send({message:"successfully signed up",status:true})
    })
    .catch((err)=>{
        console.log({message:"Error signing up", err});
        res.send({message:"error occurred",status:false})
    })
}

const getUploadedFile = (req,res) => {
    // console.log(req.body.setFile);
    let myFile = req.body.setFile
    const resCloud = cloudinary.uploader.upload(myFile, {public_id: "flier"})

    resCloud
    .then((data) => {
        console.log(data);
        console.log(data.secure_url);
        let link = data.secure_url;
        res.send({message:"Uploaded", link})
    })
    .catch((err) => {
        console.log(err);
    });
}


const saveFile = (req,res) => {
    console.log(req.body);
    let imago = req.body.myImage
    // res.send("successfully uploaded")

    const resImage = cloudinary.uploader.upload(imago, {public_id: "car"})

    resImage
    .then((data) => {
        console.log(data);
        console.log(data.secure_url);
        let cloudLink = data.secure_url;
        res.send({message:"successfully uploaded", cloudLink})
    })
    .catch((err) => {
        console.log(err);
    });

}

const getNodeMailer = (req,res) => {
    res.send({message:"Successful", status:true})
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.USER,
            pass : process.env.PASS
        }
    })

    let mailOptions = {
        from : process.env.USER,
        to : ['oluwafemijohn1000@gmail.com', 'aremuelija@gmail.com', 'samdoze1@gmail.com'],
        subject : 'Nodemailer check, Do you read me? Over!',
        text : 'Hope this meets you well?',
        html : "<h1>This is what happens when you use nodemailer</h1>",
        attachments : [
            {
                filename : "calculator",
                path : "https://res.cloudinary.com/dxgvsnxsj/image/upload/v1684921145/calculator.jpg"
            },
            {
                filename : "file.html",
                path : "index.html"
            }
        ]
    }

    transporter.sendMail(mailOptions)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })

}
module.exports = {getUserLandingPage, getStudentInfo, getUploadedFile, saveFile, getNodeMailer}