import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

interface Data {
    id: number;
    title: string;
    author: string;
    content: string;
}

const AppTable = () => {
    const [listData, setListData] = useState<Data[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/blogs');
                setListData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
