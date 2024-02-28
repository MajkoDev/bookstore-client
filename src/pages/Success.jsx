import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="h-[45vh] flex flex-col justify-center items-center">
      <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <h1 className="text-center font-semibold text-3xl">
        Your Payment Has Been Successful.
      </h1>
      <Link
        to="/products"
        className="text-center font-light mt-3 hover:underline"
      >
        Let's get back to shop.
      </Link>
    </div>
  );
};

export default SuccessPage;
