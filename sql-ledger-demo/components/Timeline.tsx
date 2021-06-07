import {
  CheckIcon,
  MinusCircleIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function returnAppropriateIcon(operation) {
  switch (operation) {
    case "INSERT":
      return <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />;
    case "DELETE":
      return (
        <MinusCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
      );
    case "UPDATE":
      return <RefreshIcon className="h-5 w-5 text-white" aria-hidden="true" />;
  }
}

export default function Timeline(props) {
  const timeline = Array.from(props.feed);
  if (timeline.length === 0) return <b>Error: No data returned from server</b>;

  return (
    <>
      {timeline.map((event, eventIdx) => (
        <li key={event["id"]}>
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
                    "bg-gray-400",
                    "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                  )}
                >
                  {returnAppropriateIcon(event["ledger_operation_type_desc"])}
                </span>
              </div>
              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {event["content"]} {event["DataType"]} with{" "}
                    <span className="font-medium text-gray-900">
                      {event["PartnerName"]}
                    </span>
                    .
                  </p>
                </div>
                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                  <time dateTime={event["LastUpdateDateTime"]}>
                    {event["LastUpdateDateTime"]}
                  </time>{" "}
                  (currently {event["DataStatus"]})
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
