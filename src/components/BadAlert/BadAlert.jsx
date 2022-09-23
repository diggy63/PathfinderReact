import Alert from 'react-bootstrap/Alert';

export default function BadAlert({err}){
    return(
        <>
          <Alert key='danger' variant='danger'>
            {err}
          </Alert>
      </>
    )
}