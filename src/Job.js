import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Job({ job, lastChild }) {
    const [showDetails, setDetails] = useState(false);
    return (
        <Card className='mb-4'>
            <Card.Body>
                <div className='d-flex justify-content-between align-items-start'>
                    <div className='flex-fill'>
                        <Card.Title>
                            {job.title} - <span className='text-muted font-weight-light'>{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>
                            {new Date(job.created_at).toLocaleDateString(undefined, {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })} &nbsp;
                            <span className='small'>{
                                new Date(job.created_at).toLocaleTimeString()
                            }</span>
                        </Card.Subtitle>
                        <Badge variant='secondary'>{job.type}</Badge>
                        <Badge variant='secondary' className='ml-2'>{job.location}</Badge>

                        <div className='job-how_to_apply' style={{ wordBreak: 'break-word' }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    
                    <img className='img-thumbnail d-none d-md-block job-poster' src={job.company_logo} alt={job.company} />
                </div>
                
                <Card.Text>
                    <Button 
                        variant='primary' type='button' 
                        onClick={
                            () => setDetails( prevShowDetails => !prevShowDetails )
                        }
                    >
                            {showDetails ? 'Hide Details' : 'View Details'}
                        </Button>
                </Card.Text>

                <Collapse in={showDetails}>
                    <div className='mt-4'>
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}
