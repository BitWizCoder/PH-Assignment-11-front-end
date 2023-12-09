import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <section className="bg-white border-gray-200 dark:bg-gray-900 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 ">
            <div>
              <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                An Education platform for learners
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black dark:text-white lg:mt-8 sm:text-6xl xl:text-8xl">
                Connect, learn And become Experts
              </h1>
              <p className="mt-4 text-base text-black dark:text-white lg:mt-8 sm:text-xl">
                Grow your career fast with the right way.
              </p>

              <Link
                to={'/signup'}
                title=""
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                role="button"
              >
                Join for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>

              <p className="mt-5 text-gray-600 dark:text-gray-400">
                Already joined us?{" "}
                <Link
                  to={'/login'}
                  title=""
                  className="text-black dark:text-gray-500 transition-all duration-200 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div>
              <img
                className="w-full"
                src={'education.svg'}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
