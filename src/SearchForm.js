import React from 'react';
import {Form, Col} from 'react-bootstrap';

export default function SearchForm({ params, onParamChange}) {
    //const { description = '', location = '', full_time = false } = params || {};
    return (
        <Form>
            <Form.Row className='align-items-end'>
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' onChange={onParamChange} value={params.description} name='description' />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type='text' onChange={onParamChange} value={params.location} name='location' />
                </Form.Group>

                <Form.Group as={Col} xs='auto' className='mb-4'>
                    <Form.Check type='checkbox' onChange={onParamChange} value={params.full_time} name='full_time' id='full-time' label='Only Full Time' />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}
