export default function HeaderTitle(props) {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <props.icon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {props.title}
        </h1>
        {props.children}
      </div>
    </header>
  );
}
