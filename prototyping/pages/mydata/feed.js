import { ShareIcon, CheckIcon } from "@heroicons/react/solid";

const timeline = [
  {
    id: 1,
    content: "Shared data with",
    target: "Wandsworth Health",
    href: "#",
    date: "Apr 26",
    datetime: "2021-04-26",
    icon: CheckIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Shared data with",
    target: "Wandsworth Health",
    href: "#",
    date: "Apr 26",
    datetime: "2021-04-26",
    icon: CheckIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 3,
    content: "Shared data with",
    target: "Wandsworth Health",
    href: "#",
    date: "Apr 26",
    datetime: "2021-04-26",
    icon: CheckIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 4,
    content: "Shared data with",
    target: "Wandsworth Health",
    href: "#",
    date: "Apr 26",
    datetime: "2021-04-26",
    icon: CheckIcon,
    iconBackground: "bg-gray-400",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShareFeed() {
  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <ShareIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Data Shared Over Time
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            {" "}
            <div className="flow-root">
              <ul className="-mb-8">
                {timeline.map((event, eventIdx) => (
                  <li key={event.id}>
                    <div className="relative pb-8">
                      {eventIdx !== timeline.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={classNames(
                              event.iconBackground,
                              "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                            )}
                          >
                            <event.icon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {event.content}{" "}
                              <a
                                href={event.href}
                                className="font-medium text-gray-900"
                              >
                                {event.target}
                              </a>
                              .
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time dateTime={event.datetime}>{event.date}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
