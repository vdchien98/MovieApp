import './episode.scss';
import '../../../assets/css/style.scss';

import { useParams } from 'react-router-dom';
import Input from '../../../components/input/Input';
import FormInput from '../../../components/form/FormInput';
import { Button, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEpisode, getEpisodes, deleteEpisode, updateEpisode } from '../../../redux/episodeRedux/apiCalls';
import { DataGrid } from '@material-ui/data-grid';
import InputImg from '../../../components/inputImg/InputImg';

export default function Episode() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openID, setOpenID] = useState(false);
    const [action, setAction] = useState(true);
    const [ids, setIds] = useState([]);
    const multipleDelete = (ids) => {
        ids.map((id) => {
            deleteEpisode(id, dispatch);
            return 0;
        });
    };
    const handleDelete = (id) => {
        deleteEpisode(id, dispatch);
    };
    const movie = useSelector((state) => {
        return state.movie.movies.find((movie) => movie.slug === slug);
    });
    const episodes = useSelector((state) => state.episode.episodes);
    const [value, setValue] = useState(1);
    const [inputs, setInputs] = useState();
    useEffect(() => {
        getEpisodes(movie._id, dispatch);
    }, [dispatch, movie]);
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleAdd = (e) => {
        e.preventDefault();
        const movieUpdate = {
            ...inputs,
            movieId: movie._id,
        };
        addEpisode(movieUpdate, dispatch);
        getEpisodes(movie._id, dispatch);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const movieUpdate = {
            ...inputs,
        };
        updateEpisode(movieUpdate, dispatch);
    };
    const handleAction = () => {
        setAction(false);
    };
    const Add = (
        <>
            <Grid container spacing={2}>
                <Input
                    type="number"
                    name="title"
                    label="Tap"
                    onChange={(e) => {
                        const newValue = Math.min(Math.max(e.target.value, 1), movie.movieLength);
                        setValue(newValue);
                        setInputs((prev) => {
                            return { ...prev, [e.target.name]: e.target.value };
                        });
                    }}
                    value={value}
                />
                <Input type="text" name="video" label="Link video" onChange={handleChange} />
                <Input type="text" name="trailer" label="Link trailer" onChange={handleChange} />
                <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="banner" />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit btn" onClick={handleAdd}>
                Add
            </Button>
        </>
    );
    const Update = (
        <>
            <Grid container spacing={2}>
                <Input type="text" name="video" label="Link video" onChange={handleChange} />
                <Input type="text" name="trailer" label="Link trailer" onChange={handleChange} />
                <InputImg setInputs={setInputs} inputs={inputs} onChange={handleChange} name="banner" />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit btn" onClick={handleUpdate}>
                Update
            </Button>
        </>
    );
    const columns = [
        { field: 'title', headerName: 'Tap', width: 200 },
        { field: 'video', headerName: 'Link Video', width: 200 },
        { field: 'trailer', headerName: 'Link trailer', width: 150 },
        {
            field: 'edit',
            headerName: 'Sửa',
            width: 130,
            renderCell: (params) => {
                return (
                    <button
                        className="editBtn"
                        onClick={() => {
                            handleAction();
                        }}
                    >
                        Edit
                    </button>
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
        <div className="main">
            <div className="titleContainer">
                <h1>{movie.title}</h1>
            </div>
            <button
                onClick={() => {
                    multipleDelete(ids);
                }}
                className="deleteBtn"
            >
                Delete
            </button>
            <div className="a">
                <DataGrid
                    rows={episodes}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row._id}
                    checkboxSelection
                    onSelectionModelChange={(itm) => setIds(itm)}
                />
            </div>
            <Grid container justifyContent="center" alignItems="stretch">
                {action ? <FormInput label="Thêm tập phim" components={Add} /> : ''}
                {!action ? <FormInput label="Update" components={Update} /> : ''}
            </Grid>
        </div>
    );
}
