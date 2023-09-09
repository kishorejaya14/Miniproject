import React from 'react'
import Login from './Login'
// import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import User from './User'
import Profile from './Profile'
import Home from './Home'
import AddUser from './AddUser'
import EditUser from './EditUser'
import Start from './Start'
import UserLogin from './UserLogin'
import UserDetail from './UserDetail'
import AddBooks from './AddBooks'
import UserDashboad from './UserDashboad'
import UserHome from './UserHome'
import TakeBook from './TakeBook'
import ReturnBook from './ReturnBook'
import Borrow from './Borrow'
import Register from './Register'
import UserProfile from './UserProfile'
import UpdateCount from './UpdateCount'
import ProfileUpdate from './ProfileUpdate'
import DeleteBooks from './DeleteBooks'
// const path=require('path')


function App() {
  // const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='/addbooks' element={<AddBooks/>}></Route>
      <Route path='/deletebooks' element={<DeleteBooks/>}></Route>
        <Route path='/user' element={<User/>}></Route>
        <Route path='/profile/:username' element={<Profile/>}></Route>
        <Route path='/create' element={<AddUser/>}></Route>
        <Route path='/updatecount/:bookname' element={<UpdateCount/>}></Route>
        <Route path='/useredit/:username' element={<EditUser/>}></Route>
        <Route path='/profileupdate/:username' element={<ProfileUpdate/>}></Route>
        {/* <Route path='' element={<AddBooks/>}></Route> */}
      </Route>
      <Route path='/login' element={<Login/>}></Route> 
      <Route path='/start' element={<Start/>}></Route> 
      <Route path='/userlogin' element={<UserLogin/>}></Route> 
      <Route path='/register'element={<Register/>}></Route>
    </Routes>
    <Routes>
    <Route path='/userdashboard'element={<UserDashboad/>}>
    <Route path='/userdashboard/userhome'element={<UserHome/>}></Route>
    <Route path='/userdashboard/takebook'element={<TakeBook/>}></Route>
    <Route path='/userdashboard/returnbook'element={<ReturnBook/>}></Route>
    <Route path='/userdashboard/userdetail/:username' element={<UserDetail/>}></Route> 
    <Route path='/userdashboard/borrow/:bookname'element={<Borrow/>}></Route>
    
    </Route>
    </Routes>
   </BrowserRouter>
   
  )
}

export default App
