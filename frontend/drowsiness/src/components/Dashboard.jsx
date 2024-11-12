// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import DataTable from './DataTable';
import './Dashboard.css'


export const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);
    const [user_name, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let user = localStorage.getItem("localData");
    let userData = JSON.parse(user);
    const navigate = useNavigate();
    const createDriver = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        const formData = new FormData(e.target);
        let user = localStorage.getItem("localData");
        let userData = JSON.parse(user);
        let data = {
            driver_name: formData.get('driver_name'),
            vehicle_no: formData.get('vehicle_no'),
            user_id: userData[0]._id,
            email: formData.get('email-driver'), // Accessing the email from the form
            password: formData.get('password-driver'), // Accessing the password from the form
        };

        try {
            const response = await axios.post('http://localhost:8001/url/add-driver', data);
            fetchData();     
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Sign In failed: ' + error.response.data.message);
        }
    };
    useEffect(() => {        
        fetchData();
        
    }, []); 
    const fetchData = async () => {
        try {
            let user = localStorage.getItem("localData");
            let userData = JSON.parse(user);
            setUserName(userData[0].name)
            let data = {
                user_id: userData[0]._id,
            };

            const response = await axios.post("http://localhost:8001/url/get-driver", data);           
            setData(response && response.data && response.data.EncryptedResponse && response.data.EncryptedResponse.data ? response.data.EncryptedResponse.data : response && response.EncryptedResponse ? response.EncryptedResponse :''); // Set the fetched data to state
        } catch (error) {
            setError(error.message); // Set error if request fails
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const logout=()=>{
        localStorage.removeItem('localData');
        navigate('/')
    }
    return (
        <>
            <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">

                <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                    <div className="container-fluid">

                        <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
                           <h3>
                             {user_name ? user_name:''}
                            </h3>
                            {/* <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" alt="..." /> */}
                        </a>
                        <div className="navbar-user d-lg-none">

                            <div className="dropdown">

                                <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="avatar-parent-child">
                                        <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar- rounded-circle" />
                                        <span className="avatar-child avatar-badge bg-success"></span>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                                    <a href="#" className="dropdown-item">Profile</a>
                                    <a href="#" className="dropdown-item">Settings</a>
                                    <a href="#" className="dropdown-item">Billing</a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">Logout</a>
                                </div>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse" id="sidebarCollapse">

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="bi bi-house"></i> Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="bi bi-bar-chart"></i> Analitycs
                                    </a>
                                </li>
                                {/* <li className="nav-item">
                                 <a className="nav-link" href="#">
                                     <i className="bi bi-chat"></i> Messages
                                     <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>
                                 </a>
                             </li> */}
                                {/* <li className="nav-item">
                                 <a className="nav-link" href="#">
                                     <i className="bi bi-bookmarks"></i> Collections
                                 </a>
                             </li> */}
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="bi bi-people"></i> Users
                                    </a>
                                </li>
                            </ul>
                            <hr className="navbar-divider my-5 opacity-20" />


                            <div className="mt-auto"></div>

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <i className="bi bi-person-square"></i> Account
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={logout}>
                                        <i className="bi bi-box-arrow-left"></i> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="h-screen flex-grow-1 overflow-y-lg-auto">

                    <header className="bg-surface-primary border-bottom pt-6">
                        <div className="container-fluid pb-4">
                            <div className="mb-npx">
                                <div className="row align-items-center">
                                    <div className="col-sm-6 col-12 mb-4 mb-sm-0">

                                        <h1 className="h2 mb-0 ls-tight">Admin</h1>
                                    </div>
                                    <div className="col-sm-6 col-12 text-sm-end">
                                        <div className="mx-n1">

                                            <a onClick={openModal} className="btn d-inline-flex btn-sm btn-primary mx-1">
                                                <span className=" pe-2">
                                                    <i className="bi bi-plus"></i>
                                                </span>
                                                <span>Add Drivers</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </header>
                    <main className="py-6 bg-surface-secondary">
                        <div className="container-fluid">

                            <div className="row g-6 mb-6">

                                <div className="col-xl-4 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total No of Drivers</span>
                                                    <span className="h3 font-bold mb-0">{data && data.length ? data.length :0}</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                        <i className="bi bi-people"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                                    <i className="bi bi-arrow-up me-1"></i>30%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total hours</span>
                                                    <span className="h3 font-bold mb-0">1.40</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                                                        <i className="bi bi-clock-history"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-danger text-danger me-2">
                                                    <i className="bi bi-arrow-down me-1"></i>-5%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-sm-6 col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Work load</span>
                                                    <span className="h3 font-bold mb-0">95%</span>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                                                        <i className="bi bi-minecart-loaded"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mb-0 text-sm">
                                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                                    <i className="bi bi-arrow-up me-1"></i>10%
                                                </span>
                                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow border-0 mb-7">
                                <div className="card-header">
                                    <h5 className="mb-0">Drivers</h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-nowrap">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Vehicle no</th>
                                                <th scope="col-2">Offer</th>
                                                <th scope="col">Meeting</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            

                                                {data && data.map((item) => <tr key={item && item.email ? item.email : ""}>
                                                    <td>{item && item.name ? item.name : ""}</td>
                                                    <td>{item && item.email ? item.email : ""}</td>
                                                    <td>{item && item.vehicle_no ? item.vehicle_no : ""}</td>
                                                    <td>
                                                    <span className="badge badge-lg badge-dot">
                                                        <i className="bg-success"></i>Scheduled
                                                    </span>
                                                </td>
                                                    <td className="text-end">
                                                    <a href="#" className="btn btn-sm btn-neutral">View</a>
                                                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                                </tr>
                                                )}

                                        </tbody>
                                        
                                    </table>
                                </div>
                               
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content slide-down" onClick={(e) => e.stopPropagation()}>

                        <form onSubmit={createDriver}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Driver Name</label>
                                <input type="text" className="form-control" id="driver_name" name="driver_name" />
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email-driver" name="email-driver"
                                    autoComplete="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Vehicle No.</label>
                                <input type="text" className="form-control" id="vehicle_no" name="vehicle_no" />
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password-driver" id="password-driver" autoComplete="current-password" />
                            </div>

                            <button type="submit" className="btn btn-primary"  >Add</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
// export default Dashboard;
