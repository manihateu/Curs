

const Modal = ({ handleClose, children, isOpen }: any) => {
  if (isOpen) {
    return (
      <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]'>
        <div className='w-1/2 h-1/2 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl'>
          <svg
            className='w-[20px] h-[20px] absolute right-[18px] top-[18px] cursor-pointer'
            onClick={handleClose}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.39 20.39"
          >
            <title>close</title>
            <line
              x1="19.39"
              y1="19.39"
              x2="1"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="19.39"
              x2="19.39"
              y2="1"
              fill="none"
              stroke="#5c3aff"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </svg>
          {children}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal