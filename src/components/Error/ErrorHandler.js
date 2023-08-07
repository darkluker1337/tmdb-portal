import './ErrorPage.css';
export function ErrorHandler({ error }) {
  return (
    <div role='alert' className='Error'>
      <h1>An error occurred:</h1>
      <h1>{error.message}</h1>
    </div>
  );
}
