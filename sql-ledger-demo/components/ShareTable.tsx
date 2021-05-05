function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ShareTable(props) {
    const shared = Array.from(props.data);
    if (shared.length === 0) return <b>Error: No data returned from server</b>;
    return (
        <div>
            <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {shared.map((dataElement) => (
                    <li key={dataElement['id']} className="col-span-1 flex shadow-sm rounded-md">
                        <div
                            className={classNames(
                                dataElement['bgColor'],
                                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                            )}
                        >
                            {dataElement['Unit']}
                        </div>
                        <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                    {dataElement['type']}
                                </span>
                                <p className="text-gray-500">{dataElement['PartnerName']}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
