export default function Panel({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="bg-gray-50 px-4 py-5 sm:p-6">{children}</div>
      </div>
    )
  }