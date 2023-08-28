import React from 'react';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import axios from 'axios';

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

    if (error) {
        return "An error has occurred";
    }

    if (isLoading) {
        console.log('Loading....');
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {listData &&
                    listData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.content}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
};

export default AppTable;
