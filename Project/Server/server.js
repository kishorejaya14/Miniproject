import express, { json, response } from "express";
import mysql from 'mysql2'
import cors from 'cors'
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import axios from 'axios';
import multer from "multer";
import path from "path";
import { connected } from "process";
const app=express();
app.use(cors(
    {
        origin:["http://localhost:5173"],
        methods: ["POST","GET","PUT"],
        credentials:true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host:'localhost',
    user: "root",
    password: "Srikanth@11032001",
    database: 'rgulib_db'
})
const storage=multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'public/images')
    },
    filename:(req,file,cb) => {
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
}) 
const upload = multer({
    storage: storage
})
con.connect(function(err){
    if(err){
        console.log("Error in Connection");
    }else{
        console.log("Connected");
    }
})

app.get('/getuser',(req,res) =>{
    const sql= "SELECT email,username,image FROM register";
    con.query(sql,(err,result) => {
        if(err) return res.json({Error: "Get user error in sql"});
        return res.json({Status:"Success",Result:result})
    })
})
app.get('/getbooks',(req,res)=>{
    const sql="select id, name,author,count from books";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Error: "get books error in sql"});
        // console.log(result);
        return res.json({Status:"Success",Result:result})
    })
})
app.get('/leavebooks',(req,res)=>{
  console.log(req.body.id);
  console.log(req.body.name);
  console.log(req.body.author);
  const sql="delete from books where id=? and name=? and author=?";
  con.query(sql,[req.body.id,req.body.name,req.body.author],(err,result)=>{
      if(err) return res.json({Error: "get books error in sql"});
      // console.log(result);
      return res.json({Status:"Success",Result:result})
  })
})
app.get('/getborrowbooks',(req,res)=>{
  const sql="select bookname from borrow";
  con.query(sql,(err,result)=>{
      if(err) return res.json({Error: "get books error in sql"});
      // console.log(result);
      return res.json({Status:"Success",Result:result})
  })
})

const verifyUser=(req,res,next) => {
    const token =req.cookies.token;
    if(!token){
        console.log(token);
        return res.json({Error: "You are not Authenticated"});
    }else{
        jwt.verify(token,"anu",(err,decoded) => {
            if(err) return res.json({Error:" Token Wrong"});
            req.role=decoded.role;
            req.username=decoded.username;
            next();
        })
    }
}
app.get('/dashboard',verifyUser,(req,res)=>{
    return res.json({Status:"Success",role:req.role,username:req.username})
})
app.get('/userdashboard',verifyUser,(req,res)=>{
    return res.json({Status:"Success",role:req.role,username:req.username})
})
app.get('/getborrowedbooks', verifyUser, (req, res) => {
  const username = req.username; // Fetch the username from the request

  const sql = "SELECT * FROM borrow WHERE username = ?";
  con.query(sql, [username], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error fetching borrowed books." });
    }
    return res.json({ Status: "Success", Result: result });
  });
});

app.post('/returnbook', verifyUser, (req, res) => {
  const username = req.username; // Fetch the username from the request
  const bookName = req.body.bookName;

  console.log("user"+req.bookName);

  const sqlDeleteBorrow = "DELETE FROM borrow WHERE username = ? AND bookname = ?";
  const sqlUpdateBookCount = "UPDATE books SET count = count + 1 WHERE name = ?";

  con.query(sqlDeleteBorrow, [username, bookName], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Failed to delete record from borrow table." });
    }

    if (result.affectedRows === 0) {
      return res.json({ Status: "Error", Error: "No matching record found in borrow table." });
    }

    con.query(sqlUpdateBookCount, [bookName], (err, result) => {
      if (err) {
        return res.json({ Status: "Error", Error: "Failed to update book count." });
      }

      if (result.affectedRows === 0) {
        return res.json({ Status: "Error", Error: "No matching record found in books table." });
      }

      return res.json({ Status: "Success" });
    });
  });
});

app.get('/adminCount',(req,res)=>{
    const sql3="Select count(id) as admin from users";
    con.query(sql3,(err,result)=>{
        if(err) return res.json({ Error: "Error in running query"});
        return res.json(result);
    })
})
app.get('/userCount',(req,res)=>{
    const sql3="Select count(username) as user from register";
    con.query(sql3,(err,result)=>{
        if(err) return res.json({ Error: "Error in running query"});
        return res.json(result);
    })
})
app.get('/bookCount',(req,res)=>{
    const sql3="Select count(id) as books from Books";
    con.query(sql3,(err,result)=>{
        if(err) return res.json({ Error: "Error in running query"});
        return res.json(result);
    })
})
app.post('/insertborrow',upload.single('image'),(req,res) => {
    const sql="insert into borrow(username,email,bookname) values(?,?,?)";
    const sql2="update books set count=count-1 where name=?";
    console.log(req.body);
    // if(err) return  res.json({ Status:"Error"});
    const values=[
          req.body.username,
          req.body.email,
          req.body.bookname,
    ]
    con.query(sql2,[req.body.bookname],(err,result) =>{
        if(err) return res.json({Status:"Error", Error: "Error in updating query"});
        if(result.length>0){
            console.log(result[0].count);
        }
    })
    con.query(sql,values,(err,result) =>{
        if(err) return res.json({Status : "Error",Error:"Inside signup query"});
        return res.json({Status:"Success"});
    })
})
app.post('/login',(req,res)=>{
  const sql="SELECT * FROM  users Where email=? AND password=?";
  con.query(sql,[req.body.email,req.body.password],(err,result) => {
    if(err) return res.json({Status:"Error", Error: "Error in running query"});
    if(result.length>0){
        console.log(result[0].email)
        const id=result[0].email;
        const token=jwt.sign({role:"admin",username:result[0].username},"anu",{expiresIn:'1d'});
        res.cookie('token',token);
        // res.cookie('token', token, { sameSite: 'none', secure: true })
        return res.json({Status:"Success",username:result[0].username})
    }else{
        return res.json({Status:"Error" ,Error: "wrong Email or Password"});
    }
  })
})
app.post('/userlogin',(req,res)=>{
    const sql="SELECT * FROM  register Where email=? ";
    con.query(sql,[req.body.email],(err,result) => {
      if(err) return res.json({Status:"Error", Error: "Error in running query"});
      if(result.length>0){
         bcrypt.compare(req.body.password.toString(),result[0].password,(err,response)=>{
            if(err) return  res.json({Error:"Password error"});
            if(response){
            console.log(result[0].email)
        //   const id=result[0].email;
          const token=jwt.sign({role:"user",username:result[0].username},"anu",{expiresIn:'1d'});
          res.cookie('token',token);
          // res.cookie('token', token, { sameSite: 'none', secure: true })
          return res.json({Status:"Success",username:result[0].username})
            }else{
                return res.json({Error:"Wrong email or password"})
            }
         })
         
      }
    })
  })

// app.get('/admin/:username',(req,res) => {
//     const username=req.params.username;
//     const sql="select * from users where username= ?";
//     con.query(sql,[username],(err,result) => {
//         if(err) return res.json({Error:"Get user error in sql"});
//         return res.json({Status:"Success",Result:result})
//     })
// })
// app.get('/edituser/:username', (req, res) => {
//     const username = req.params.username;
//     console.log("username in useredit:" + username);
//     const sql = "select bookname from borrow where username=?";
    
//     con.query(sql, [username], (err, queryResult) => {
//       if (err) {
//         console.error("Error fetching user details:", err);
//         return res.json({ Error: "An error occurred while fetching user details" });
//       }
//       if(result.length>0){
//       return res.json({ Status: "Success", Result: queryResult });
//       }
//       else{
//         return res.json({Status:"Success",Result:null});
//       }
//     });
//   });
app.get('/useredit/:username', (req, res) => {
    const username = req.params.username;
    console.log("username in useredit:" + username);
    const sql = "SELECT bookname FROM borrow WHERE username=?";
    
    con.query(sql, [username], (err, result) => {
      if (err) {
        console.error("Error fetching user details:", err);
        return res.json({ Error: "An error occurred while fetching user details" });
      }
  
      if (result.length > 0) {
        const booksTaken = result.map(row => row.bookname);
        console.log(booksTaken);
        return res.json({ Status: "Success", Result: booksTaken });
      } else {
        return res.json({ Status: "User not found" });
      }
    });
  });
  
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    // console.log("Username get: " + username);
  
    const sql = "SELECT * FROM users WHERE username = ?";
    con.query(sql, [username], (err, result) => {
      if (err) {
        console.error("Error fetching user details:", err);
        return res.json({ Error: "An error occurred while fetching user details" });
      }
  
      if (result.length > 0) {
        const user = result[0];
        return res.json({ Status: "Success", Result: user });
      } else {
        return res.json({ Status: "User not found" });
      }
    });
  });
app.post('/register',upload.single('image'),(req,res) => {
    console.log(req.body);
    console.log(req.file);
    const sql2="INSERT INTO register VALUES(?,?,?,?,?)";
    bcrypt.hash(req.body.password.toString(),10,(err,hash)=>{
        if(err) return  res.json({ Status:"Error" ,Error:"Error in hashing password"});
        const values= [
            req.body.email,
            req.body.username,
            hash,
            req.body.address,
            req.file.filename,
        ]
        con.query(sql2,[req.body.email,req.body.username,hash,req.body.address,req.file.filename],(err,result) =>{
            if(err) return res.json({Status : "Error",Error:"Inside signup query"});
            return res.json({Status:"Success"});
        })
    })
})
// app.get('/userdashboard/userdetail/:username',(req,res) => {
//     // const username=req.params.username;
//     const username=req.body.username;
//     console.log("uername get"+username);
//     const sql="select * from register where username= ?";
//     con.query(sql,[username],(err,result) => {
//         if(err) return res.json({Error:"Get user error in sql"});
//         console.log("result"+result);
//         return res.json({Status:"Success",Result:result})
//     })
// })
app.get('/userdashboard/userdetail/:username', (req, res) => {
    const username = req.params.username;
    console.log("Username get: " + username);
  
    const sql = "SELECT * FROM register WHERE username = ?";
    con.query(sql, [username], (err, result) => {
      if (err) {
        console.error("Error fetching user details:", err);
        return res.json({ Error: "An error occurred while fetching user details" });
      }
  
      if (result.length > 0) {
        const user = result[0];
        console.log(user);
        return res.json({ Status: "Success", Result: user });
      } else {
        return res.json({ Status: "User not found" });
      }
    });
  });
  app.get('/userdashboard/getmail/:username', (req, res) => {
    const username = req.params.username;
    console.log("Username get: " + username);
  
    const sql = "SELECT email FROM register WHERE username = ?";
    con.query(sql, [username], (err, result) => {
      if (err) {
        console.error("Error fetching user details:", err);
        return res.json({ Error: "An error occurred while fetching user details" });
      }
  
      if (result.length > 0) {
        const user = result[0];
        console.log("email:"+user);
        return res.json({ Status: "Success", Result: user });
      } else {
        return res.json({ Status: "User not found" });
      }
    });
  });
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})
app.post('/create',upload.single('image'),(req,res) => {
    console.log(req.body);
    console.log(req.file);
    const sql2="INSERT INTO register VALUES(?,?,?,?,?)";
    bcrypt.hash(req.body.password.toString(),10,(err,hash)=>{
        if(err) return  res.json({ Status:"Error" ,Error:"Error in hashing password"});
        const values= [
            req.body.email,
            req.body.username,
            hash,
            req.body.address,
            req.file.filename,
        ]
        con.query(sql2,[req.body.email,req.body.username,hash,req.body.address,req.file.filename],(err,result) =>{
            if(err) return res.json({Status : "Error",Error:"Inside signup query"});
            return res.json({Status:"Success"});
        })
    })
})
app.post('/updatebookcount',upload.single('image'),(req,res)=>{
  console.log('ai');
  console.log(req.body.bookname);
  console.log(req.body.count);
  console.log('devi')
  const sql="update books set count=? where name=?"
  con.query(sql,[req.body.count,req.body.bookname],(err,result)=>{
    if(err) return res.json({Status:"Error",Error:"Error in update query"});
    return res.json({Status:"Success"});
  })
})
app.post('/updatepassword',upload.single('image'),(req,res)=>{
  console.log('ai');
  console.log(req.body.username);
  console.log(req.body.password);
  console.log('devi')
  const sql="update users set password=? where username=?"
  con.query(sql,[req.body.password,req.body.username],(err,result)=>{
    if(err) return res.json({Status:"Error",Error:"Error in update query"});
    return res.json({Status:"Success"});
  })
})
app.post('/addbooks',upload.single('image'),(req,res) => {
    console.log(req.body);
    const sql2="INSERT INTO books VALUES(?,?,?,?)";
    
        // if(err) return  res.json({ Status:"Error" ,Error:"Error in hashing password"});
        const values= [
            req.body.id,
            req.body.name,
            req.body.author,
            req.body.count,
            
        ]
        con.query(sql2,[req.body.id,req.body.name,req.body.author,req.body.count],(err,result) =>{
            if(err) return res.json({Status : "Error",Error:"Inside signup query"});
            return res.json({Status:"Success"});
        });
    
});
// const port=8082;
app.listen(8082,()=>{
    console.log("Running");
})