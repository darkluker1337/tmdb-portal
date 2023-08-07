import './Loader.css';
export function Loader({ loading }) {
  return (
    <>
      <div>
        {loading ? (
          <div className='preloader'>
            <div className='spinner'></div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
