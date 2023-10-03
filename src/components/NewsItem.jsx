/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const NewsItem = ({
  newsItems: {
    source: { name },
    title,
    description,
    urlToImage,
    publishedAt,
    url,
  },
}) => {
  if (!title || title === "[Removed]") {
    return;
  } else {
    return (
      <article className="rounded-lg flex flex-col gap-2 w-[384px] min-h-[500px] m-4 shadow-lg">
        <section className="w-full h-1/2 bg-black rounded-lg">
          <img
            src={urlToImage || "/src/assets/page-not-found-688965_1280.png"}
            alt="logo"
            className="w-full h-[244px] object-cover rounded-t-lg"
          />
        </section>
        <section className="p-3 flex gap-3 flex-col justify-between h-full items-center">
          <h2 className="text-2xl font-medium text-center">{title}</h2>
          <p className="text-center font-normal mb-2">{description}</p>
          <p className="self-start font-medium text-md ml-2">
            {new Date(publishedAt).toLocaleString()}
          </p>
          <div className="flex items-center justify-between px-2  w-full">
            <p className="font-bold text-gray-800 text-lg">{name}</p>
            {description && (
              <Link
                to={url}
                target="_blank"
                rel="no-referrer"
                className="bg-orange-500 text-white rounded-lg p-3 w-max"
              >
                Read More
              </Link>
            )}
          </div>
        </section>
      </article>
    );
  }
};

export default NewsItem;
