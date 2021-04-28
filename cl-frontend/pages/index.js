import {
  EyeIcon,
  RssIcon,
  TruckIcon,
  LockClosedIcon,
  BeakerIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Security",
    description:
      "Ensure your vehicle is securely monitored, without tampering.",
    icon: LockClosedIcon,
  },
  {
    name: "Rules of the Road",
    description:
      "Know your safety - track your distance from vehicles around you.",
    icon: TruckIcon,
  },
  {
    name: "Visibility",
    description: "Share your data with insurers on a need to know basis.",
    icon: EyeIcon,
  },
  {
    name: "The Hot Seat",
    description: "See your driving history and telemetry in a real-time feed.",
    icon: RssIcon,
  },
];

export default function Home() {
  return (
    <>
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <h1 className="text-3xl font-bold leading-tight text-purple-900">
            Oltiva SafeDrive
          </h1>
        </div>
      </div>
      <div className="bg-purple-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Connected Vehicles are en-route
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-purple-200">
            The rules of the road are changing. Drivers can be human, or they
            can be robotic. How do we ensure safety? How do we attribute
            responsibility? Oltiva SafeDrive uses state of the art Confidential
            Ledger technology to securely store the state of the car and the
            surrounding environment, to assign responsibility, and preserve
            privacy.
          </p>
          <a
            type="button"
            href="/simulate"
            className="mt-2 inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <BeakerIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Watch the simulation
          </a>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-purple-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
