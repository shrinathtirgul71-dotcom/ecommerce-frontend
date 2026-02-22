import React, { useState, useContext } from 'react';
import './profile.css';
import { LoginContext } from '../context/ContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import HistoryIcon from '@mui/icons-material/History';

const BASE_URL = "https://ecommerce-backend-1-b285.onrender.com";

const Profile = () => {
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();

    const [editName, setEditName] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [newName, setNewName] = useState(account?.fname || '');
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUpdateName = async () => {
        if (!newName || newName.length < 2) {
            setNameError('Name must be at least 2 characters');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/updatename`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ fname: newName })
            });

            const data = await res.json();

            if (res.status === 201) {
                setAccount(data);
                localStorage.setItem('user', JSON.stringify(data));
                toast.success('Name updated successfully!', { position: 'top-center' });
                setEditName(false);
                setNameError('');
            } else {
                toast.error('Failed to update name', { position: 'top-center' });
            }
        } catch (error) {
            toast.error('Network error. Please try again.', { position: 'top-center' });
        }
    };

    const handleUpdatePassword = async () => {
        if (!passwords.currentPassword) {
            setPasswordError('Please enter current password');
            return;
        }
        if (!passwords.newPassword || passwords.newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters');
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/updatepassword`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                })
            });

            const data = await res.json();

            if (res.status === 201) {
                toast.success('Password updated successfully!', { position: 'top-center' });
                setEditPassword(false);
                setPasswordError('');
                setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                toast.error(data.error || 'Failed to update password', { position: 'top-center' });
            }
        } catch (error) {
            toast.error('Network error. Please try again.', { position: 'top-center' });
        }
    };

    const joinDate = account?.createdAt
        ? new Date(account.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : 'N/A';

    return (
        <div className='profile_section'>
            <div className='profile_container'>
                <div className='profile_header'>
                    <div className='profile_avatar'>
                        {account?.fname?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className='profile_header_info'>
                        <h1>{account?.fname}</h1>
                        <p>{account?.email}</p>
                    </div>
                </div>

                <div className='profile_card'>
                    <h2>Account Information</h2>
                    <div className='profile_info_row'>
                        <span>Mobile</span>
                        <span>{account?.mobile || 'N/A'}</span>
                    </div>
                    <div className='profile_info_row'>
                        <span>Email</span>
                        <span>{account?.email}</span>
                    </div>
                    <div className='profile_info_row'>
                        <span>Member Since</span>
                        <span>{joinDate}</span>
                    </div>
                </div>

                <div className='profile_card'>
                    <div className='profile_card_header'>
                        <h2><EditIcon style={{ fontSize: 20, marginRight: 8 }} />Edit Name</h2>
                        <button onClick={() => setEditName(!editName)} className='edit_toggle_btn'>
                            {editName ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                    {editName && (
                        <div className='profile_edit_form'>
                            <input
                                type='text'
                                value={newName}
                                onChange={(e) => { setNewName(e.target.value); setNameError(''); }}
                                placeholder='Enter new name'
                                className={nameError ? 'input_error' : ''}
                            />
                            {nameError && <p className='error_msg'>⚠️ {nameError}</p>}
                            <button onClick={handleUpdateName} className='save_btn'>Save Changes</button>
                        </div>
                    )}
                </div>

                <div className='profile_card'>
                    <div className='profile_card_header'>
                        <h2><LockIcon style={{ fontSize: 20, marginRight: 8 }} />Change Password</h2>
                        <button onClick={() => setEditPassword(!editPassword)} className='edit_toggle_btn'>
                            {editPassword ? 'Cancel' : 'Edit'}
                        </button>
                    </div>
                    {editPassword && (
                        <div className='profile_edit_form'>
                            <input type='password' placeholder='Current Password'
                                value={passwords.currentPassword}
                                onChange={(e) => { setPasswords({ ...passwords, currentPassword: e.target.value }); setPasswordError(''); }}
                            />
                            <input type='password' placeholder='New Password (min 6 characters)'
                                value={passwords.newPassword}
                                onChange={(e) => { setPasswords({ ...passwords, newPassword: e.target.value }); setPasswordError(''); }}
                            />
                            <input type='password' placeholder='Confirm New Password'
                                value={passwords.confirmPassword}
                                onChange={(e) => { setPasswords({ ...passwords, confirmPassword: e.target.value }); setPasswordError(''); }}
                            />
                            {passwordError && <p className='error_msg'>⚠️ {passwordError}</p>}
                            <button onClick={handleUpdatePassword} className='save_btn'>Update Password</button>
                        </div>
                    )}
                </div>

                <div className='profile_card profile_orders' onClick={() => navigate('/orderhistory')}>
                    <HistoryIcon style={{ fontSize: 24, marginRight: 10 }} />
                    <h2>View Order History</h2>
                    <span>→</span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
