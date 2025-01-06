import { Link } from "react-router-dom";
import notFound from "../../assets/images/error.svg"
import { Helmet } from "react-helmet";
export default function Notfound() {


  return (
    <>
    <Helmet>
      <title>Page Not Found</title>
    </Helmet>
      <section className="notfound py-5 flex justify-center items-center flex-col">
          <h2 className="text-primary-500 text-2xl font-semibold">Page Not Found</h2>
          <img src={notFound} alt="d" />
          <Link to="/" className="btn w-fit mt-2">Back to Home</Link>
      </section>
    </>
  );
}
