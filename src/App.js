import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container, Alert } from 'react-bootstrap';

//Own components
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

import './App.css';

function App() {
  const [params, setParams] = useState({description: '', location: '', full_time: false});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange (e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);

    setParams(prevParams => {
      return {...prevParams, [param]: value }
    })
  }
  return (
    <Container className='my-4'>
      <h1 className="display-4 page-title">Github Jobs</h1>

      {!error > 0 && <SearchForm params={params} onParamChange={handleParamChange} />}

      {loading && !error && 
        <Alert variant='info' className='h4 font-weight-normal'>
          <span className='mr-4'><i className="fa fa-spin fa-spinner" aria-hidden="true"></i></span>
          Loading...
        </Alert>
      }

      {error && <Alert variant='danger' className='h4 font-weight-normal'>
        <span className='mr-4'><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
        Error. Try reloading the page.
        </Alert>}

      {jobs.length > 0 && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}

      {!loading && !error && jobs &&
        jobs.map((job) => {
          return (
            <Job key={job.id} job={job} />
          )
        })
      }

      {jobs && jobs.length > 0 && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />}
    </Container>
  );
}

export default App;
