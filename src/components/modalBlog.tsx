import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { mutate } from 'swr';

interface IPropsModal {
    showModalAddBlog: boolean,
    setShowModalAddBlog: (value: boolean) => void,
    actionProp: string,
    idProp: number,
    titleProp: string,
    authorProp: string,
    contentProp: string,
}

const ModalBlog = (props: IPropsModal) => {
    const { showModalAddBlog, setShowModalAddBlog, actionProp, idProp, titleProp, authorProp, contentProp } = props;

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [typeButton, setTypeButton] = useState<string>("");

    useEffect(() => {
        switch (actionProp) {
            case 'ADD': {
                setTitle("");
                setAuthor("");
                setContent("");
                setTypeButton("Add");
                break;
            }
            case 'EDIT': {
                setTitle(titleProp);
                setAuthor(authorProp);
                setContent(contentProp);
                setTypeButton("Edit");
                break;
            }
        }
    }, [actionProp, titleProp, authorProp, contentProp]);

    const handleSubmitBlog = async () => {
        if (title === "" || author === "" || content === "") {
            toast.info("Please enter information");
            return;
        } else {
            setLoading(true);
            setTitle("");
            setAuthor("");
            setContent("");
            let url = 'http://localhost:8000/blogs';
            let body = {
                title,
                author,
                content,
            };
            let headers = {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            };
            if (actionProp === 'ADD') {
                try {
                    await axios.post(url, body, { headers });
                    setShowModalAddBlog(false);
                    toast.success("Add blog successfully !");
                    mutate('http://localhost:8000/blogs');
                } catch (error) {
                    toast.error("Fail !");
                    console.error('Error adding blog:', error);
                } finally {
                    setLoading(false);
                }
            }
            else if (actionProp === 'EDIT') {
                try {
                    url = `http://localhost:8000/blogs/${idProp}`
                    await axios.put(url, body, { headers });
                    setShowModalAddBlog(false);
                    toast.success("Edit blog successfully !");
                    mutate('http://localhost:8000/blogs');
                } catch (error) {
                    toast.error("Fail !");
                    console.error('Error Editing blog:', error);
                } finally {
                    setLoading(false);
                }
            }
        }
    }

    return (
        <>
            <Modal
                show={showModalAddBlog}
                onHide={() => setShowModalAddBlog(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{typeButton} Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="titleControl">
                            <Form.Label><strong>Title</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title of blog"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="authorControl">
                            <Form.Label><strong>Author</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author of blog"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="contentControl">
                            <Form.Label><strong>Content</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter content of blog"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalAddBlog(false)}>
                        Close
                    </Button>
                    {loading ? <CircularProgress color="success" size={30} /> : <Button variant="primary" onClick={handleSubmitBlog}>{typeButton}</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalBlog;