import { Link } from "react-router-dom";
import banner from '../../assets/banner.jpg';

const Banner = () => {
  return (
    <div>
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={banner}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Get A Good Physique</h1>
            <p className="py-6 lg:w-3/4">
            Empower your fitness journey with FitScheduler. Connect with expert trainers, book personalized sessions, and join a vibrant community dedicated to health and wellness. Your path to a healthier, more active lifestyle starts here.
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link
              to={'/classes'}
                rel="noopener noreferrer"
                href="#"
                className="px-8 btn py-3 text-lg font-semibold rounded bg-violet-600 text-gray-50"
              >
                Classes
              </Link>
              <Link
              to={'/trainer'}
                rel="noopener noreferrer"
                className="px-8 py-3 text-lg btn font-semibold border rounded border-gray-800"
              >
                Trainer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
