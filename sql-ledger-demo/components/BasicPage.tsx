import HeaderTitle from "./HeaderTitle";

export default function BasicPage(props) {
    return (
        <div className="py-10">
            <HeaderTitle title={props.title} icon={props.icon}>{props.headerChildren}</HeaderTitle>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        {" "}
                        <div className="flow-root">
                            <ul className="-mb-8">
                                {props.children}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
