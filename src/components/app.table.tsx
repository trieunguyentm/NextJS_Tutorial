import React from 'react';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import ModalBlog from './modalBlog';
import { Skeleton } from '@mui/material';

interface Data {
    id: number;
    title: string;
    author: string;
    content: string;
}

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};

const AppTable = () => {
    const { data: listData, error, isLoading } = useSWR<Data[]>('http://localhost:8000/blogs', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    const [action, setAction] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [showModalAddBlog, setShowModalAddBlog] = useState<boolean>(false);

    const handleAdd = () => {
        setShowModalAddBlog(true);
        setAction("ADD");
    }

    const handleEdit = (id: number, title: string, author: string, content: string) => {
        setShowModalAddBlog(true);
        setAction("EDIT");
        setId(id);
        setTitle(title);
        setAuthor(author);
        setContent(content); 
    }

    if (error) {
        return "An error has occurred";
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
            }}
            >
                {isLoading ? <Skeleton variant='rounded' width={80} animation='wave' /> : <h3>Table Blogs</h3>}
                {isLoading ?
                    <Skeleton variant='rounded' width={80} height={40} animation='wave' />
                    :
                    <Button onClick={handleAdd}>
                        Add Blog
                    </Button>
                }
            </div>
            {isLoading ?
                <Skeleton variant='rounded' style={{ minHeight: '300px', marginBottom: '30px' }} /> :
                (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData &&
                                listData?.sort((a: Data, b: Data) => b.id - a.id).map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                onClick={() => handleEdit(item.id, item.title, item.author, item.content)}
                                                variant='primary'
                                                style={{ margin: '4px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button variant='secondary' style={{ margin: '4px' }}>View</Button>
                                            <Button variant='danger' style={{ margin: '4px' }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                )
            }
            <ModalBlog
                showModalAddBlog={showModalAddBlog}
                setShowModalAddBlog={setShowModalAddBlog}
                actionProp={action}
                idProp={id}
                titleProp={title}
                authorProp={author}
                contentProp={content}
            />
        </>
    );
};

export default AppTable;
