import './userList.scss';
import '../../../assets/css/style.scss';

import { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../../../redux/userRedux/apiCalls';
import LoadingSpin from 'react-loading-spin';

export default function UserList() {
    const dispatch = useDispatch();
    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);
    const users = useSelector((state) => state.user.users);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const [open, setOpen] = useState(false);
    const [openID, setOpenID] = useState(false);
    const [ids, setIds] = useState([]);
    const isFetching = useSelector((state) => state.user.isFetching);
    // const isFetching = 1;

    const handleDelete = (id) => {
        if (id === currentUser._id) {
            alert(`Khong the xoa tai khoan ${currentUser._id}`);
        } else {
            deleteUser(id, dispatch);
        }
    };
    const multipleDelete = (ids) => {
        ids.map((id) => {
            if (id === currentUser._id) {
                alert(`Khong the xoa tai khoan ${currentUser._id}`);
            } else {
                deleteUser(id, dispatch);
            }
            return 0;
        });
    };
    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'user',
            headerName: 'User',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.img} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'isAdmin',
            headerName: 'IsAdmin',
            width: 100,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 130,
            renderCell: (params) => {
                return (
                    <Link to={'/user/' + params.row._id}>
                        <button className="editBtn">Edit</button>
                    </Link>
                );
            },
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => {
                const handleOpen = (e) => {
                    setOpenID(e.target.dataset.id);
                    setOpen(true);
                };
                const handleClose = () => setOpen(false);
                if (open && openID === params.row._id) {
                    return (
                        <>
                            <button
                                onClick={() => {
                                    handleDelete(openID);
                                }}
                                data-id={params.row._id}
                                className="deleteBtn"
                            >
                                Yes
                            </button>
                            <button onClick={handleClose} className="editBtn">
                                No
                            </button>
                        </>
                    );
                } else {
                    return (
                        <button onClick={handleOpen} className="deleteBtn" data-id={params.row._id}>
                            Delete
                        </button>
                    );
                }
            },
        },
    ];

    return (
        <div className="userList">
            {isFetching && (
                <div className={'ExampleOfUsage'}>
                    <LoadingSpin />
                </div>
            )}
            {!isFetching && (
                <>
                    <button
                        onClick={() => {
                            multipleDelete(ids);
                        }}
                        className="deleteBtn"
                    >
                        Delete
                    </button>
                    <DataGrid
                        className="gridList"
                        rows={users}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        checkboxSelection
                        onSelectionModelChange={(itm) => setIds(itm)}
                    />
                </>
            )}
        </div>
    );
}
