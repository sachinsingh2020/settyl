import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyDetails } from '../redux/actions/user';
import Home from './Home';
import AdminPage from './AdminPage';

const RedirectedPage = () => {
    const dispatch = useDispatch();

    const { me } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getMyDetails());
        // eslint-disable-next-line
    }, [])
    return (
        me && me.role === 'admin' ? <AdminPage /> : <Home />
    )
}

export default RedirectedPage
