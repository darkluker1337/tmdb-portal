import './ErrorPage.css'
export const ShowError = (error) => {
  return (
    <>
      <div className='showError'>
        <h1>SMTH GET WRONG:</h1>
        <h1>{error}</h1>
      </div>
    </>
  );
};
