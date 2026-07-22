import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/villager/layout/Layout'
import Home from './components/villager/pages/Home'
import About from './components/villager/pages/About'
import Contact from './components/villager/pages/Contact'
import Services from './components/villager/pages/Services'
import Testimonials from './components/villager/pages/Testimonials'
import Blog from './components/villager/pages/Blog'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/admin/Pages/Dashboard'
import AdminLayout from './components/admin/AdminLayout/AdminLayout'
import ManageVillagers from './components/admin/villager/ManageVillagers'
import ManageCategories from './components/admin/category/ManageCategories'
import ManageComplaints from './components/admin/complaints/ManageComplaints'
import ManageSchemes from './components/admin/Schemes/ManageSchemes'
import ManageEvents from './components/admin/Events/ManageEvents'
import AddCategory from './components/admin/category/AddCategory'
import EditCategory from './components/admin/category/EditCategory'
import ViewComplaint from './components/villager/complaint/ViewComplaint'
import AddComplaint from './components/villager/complaint/AddComplaint'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Layout />}>

            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/complaints' element={<ViewComplaint />} />
            <Route path='/complaint/add' element={<AddComplaint />} />
            <Route path='/Services' element={<Services />} />
            <Route path='/testimonials' element={<Testimonials />} />
            <Route path='/Blog' element={<Blog />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/register' element={<Register />} />


          </Route>

          <Route path='/admin' element={<AdminLayout/>}>
          
            <Route index element={<Dashboard/>}></Route>
            <Route path="villagers" element={<ManageVillagers/>}></Route>
            <Route path="categories" element={<ManageCategories/>}></Route>
            <Route path="category/add" element={<AddCategory/>}></Route>
            <Route path="category/edit/:id" element={<EditCategory/>}></Route>
            <Route path="complaints" element={<ManageComplaints/>}></Route>
            <Route path="Schemes" element={<ManageSchemes/>}></Route>
            <Route path="Events" element={<ManageEvents/>}></Route>
            

          
          </Route>

        </Routes>

      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
