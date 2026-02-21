import React, { useContext, useEffect, useState } from 'react';
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';        
import HistoryIcon from '@mui/icons-material/History';      
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/ContextProvider";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";


const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [text, setText] = useState("");
    const [liopen, setLiopen] = useState(true);
    const { products } = useSelector(state => state.getproductsdata);
    const [dropen, setDropen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleopen = () => {
        setDropen(true);
    }

    const handledrclosee = () => {
        setDropen(false);
    }

    const getdetailvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            setAccount(null);
            localStorage.removeItem('user');
        } else {
            setAccount(data);
        }
    };

    const logoutUser = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                credentials: "include"
            });

            if (res.status === 201 || res.status === 200) {
                setAccount(null);
                localStorage.removeItem('user');
                handleClose();
                toast.success("Logged out successfully! See you soon 👋", {
                    position: "top-center"
                });
                setTimeout(() => { navigate('/'); }, 1500);
            } else {
                toast.error("Logout failed. Please try again.", { position: "top-center" });
            }
        } catch (error) {
            toast.error("Network error. Please check your connection.", { position: "top-center" });
        }
    };

    const getText = (items) => {
        setText(items);
        setLiopen(false);
    }

    useEffect(() => {
        getdetailvaliduser();
    }, []);

    return (
        <header>
            <nav>
                <div className='left'>
                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>

                    <Drawer open={dropen} onClose={handledrclosee}>
                        <Rightheader logclose={handledrclosee} />
                    </Drawer>

                    <div className='navlogo'>
                        <NavLink to='/'> <img src='assest/amazon_PNG25.png' alt='Amazon Logo' /> </NavLink>
                    </div>
                    <div className='nav_searchbar'>
                        <input
                            type='text'
                            name=''
                            onChange={(e) => getText(e.target.value)}
                            placeholder="search Your products"
                            id=''
                        />
                        <div className='search_icon'>
                            <SearchIcon id='search' />
                        </div>

                        {text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product =>
                                        product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                                    ).map(product => (
                                        <ListItem key={product.id}>
                                            <NavLink
                                                to={`/getproductsone/${product.id}`}
                                                onClick={() => setLiopen(true)}
                                            >
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
                </div>
                <div className='right'>
                    <div className='nav_btn'>
                        <NavLink to='/login'> Sign In </NavLink>
                    </div>
                    <div className='cart_btn'>
                        {
                            account ? <NavLink to="/buynow">
                                <Badge badgeContent={account?.carts?.length || 0} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink> : <NavLink to="/login">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                            </NavLink>
                        }
                        <p>Cart</p>
                    </div>
                    {
                        account ? (
                            <>
                                <Avatar
                                    className='avtar2'
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {account?.fname?.[0]?.toUpperCase() || ""}
                                </Avatar>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {/* 👇 Profile link added */}
                                    <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                                        <PersonIcon style={{ fontSize: 16, marginRight: 8 }} />
                                        My Profile
                                    </MenuItem>

                                    {/* 👇 Order History link added */}
                                    <MenuItem onClick={() => { navigate('/orderhistory'); handleClose(); }}>
                                        <HistoryIcon style={{ fontSize: 16, marginRight: 8 }} />
                                        Order History
                                    </MenuItem>

                                    <MenuItem onClick={logoutUser}>
                                        <LogoutIcon style={{ fontSize: 16, marginRight: 8 }} />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Avatar className='avtar'></Avatar>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;