import React from 'react';
import {Pagination} from 'react-bootstrap';

export default function JobsPagination({ page, setPage, hasNextPage }) {
    return (
        <Pagination>
            {page > 1 && <Pagination.Prev onClick={() => setPage(prevPage => prevPage - 1)} /> }

            {page > 1 && <Pagination.Item onClick={() => setPage(prevPage => 1)}>1</Pagination.Item>}

            {page > 2 && <Pagination.Ellipsis />}

            {page > 2 && <Pagination.Item onClick={() => setPage(prevPage => prevPage - 1)}>{page - 1}</Pagination.Item> }

            <Pagination.Item active>{page}</Pagination.Item>

            {hasNextPage && <Pagination.Item onClick={() => setPage(prevPage => prevPage + 1)}>{page + 1}</Pagination.Item>}

            {hasNextPage && <Pagination.Next onClick={() => setPage(prevPage => prevPage + 1)} /> }
        </Pagination>
    )
}
