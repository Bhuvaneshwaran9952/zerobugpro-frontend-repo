import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from "../src/Component/Home/Home";
import Studentlist from './Component/Studentlist/Studentlist';
import AddStudent from './Component/AddStudent/AddStudent';
import UpdateStudent from './Component/UpdateStudent/UpdateStudent';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from '../src/Redux/Store';
import Navbar from './Component/Navbar/navbar';
import Trainer from './Component/Trainer/Trainer';
import TrainerUserList from './Component/TrainerUserList/TrainerUserList';
import TrainerUpdate from './Component/TrainerUpdate/TrainerUpdate';
import TrainerAssign from './Component/TrainerAssign/TrainerAssign';
import ViewPage from './Component/ViewPage/ViewPage';
import PaymentDetails from './Component/StudentPayment/PaymentDetails';
import PaymentForm from './Component/StudentPayment/PaymentForm';
import PaymentUpdate from './Component/StudentPayment/PaymentUpdate';
import TrainerPayment from './Component/TrainerPayment/TrainerPayment';
import TrainerPaymentForm from './Component/TrainerPayment/TrainerPaymentForm';
import TrainerPaymentUpdate from './Component/TrainerPayment/TrainerPaymentUpdate';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/studentlist' element={<Studentlist></Studentlist>}></Route>
            <Route path='/studentlist/add' element={<AddStudent></AddStudent>}></Route>
            <Route path='/studentlist/edit/:code' element={<UpdateStudent></UpdateStudent>}></Route>
            <Route path="/trainer" element={<TrainerUserList />} />
            <Route path='/trainer/traineruserlist' element={<Trainer />} />
            <Route path="/trainerupdate/:id" element={<TrainerUpdate />} />
            <Route path='/trainerassign' element={<TrainerAssign />} />
            <Route path="/trainerassign/:trainerId" element={<TrainerAssign />} />
            <Route path="/viewpage" element={<ViewPage />} />
            <Route path="/viewpage/:trainerId" element={<ViewPage />} />
            <Route path="/paymentdetails" element={<PaymentDetails />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            <Route path="/paymentupdate/:id" element={<PaymentUpdate />} />
            <Route path='/trainerpayment' element={<TrainerPayment/>}/>
            <Route path='/trainerpaymentform' element={<TrainerPaymentForm/>}/>
            <Route path='/trainerpaymentupdate/:id' element={<TrainerPaymentUpdate/>}/>
          </Routes>
        </BrowserRouter>
        <ToastContainer className="toast-position"
          position="bottom-right">
        </ToastContainer>
      </div>
    </Provider>
  );
}

export default App;
