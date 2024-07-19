import { Link } from "react-router-dom"
import notFoundimg from "./Data/images-app/undraw_page_not_found_re_e9o6.svg";
export default function NotFound() {
  document.title = "404 | Page not found"
    return (
      <>
        <main className="grid h-[70vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="text-2xl flex justify-center items-center font-semibold text-indigo-600">
              <img src={notFoundimg} className="h-40 sm:h-60  w-40 sm:w-60" alt="" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <Link to={"/"} className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }
  