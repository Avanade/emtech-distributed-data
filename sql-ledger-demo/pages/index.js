import {
  ClockIcon,
  EyeIcon,
  LibraryIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Control",
    description: "You choose what data to share, and how it should be used.",
    icon: LibraryIcon,
  },
  {
    name: "Timeliness",
    description:
      "No indefinite sharing. Choose how long to share your data for.",
    icon: ClockIcon,
  },
  {
    name: "Visibility",
    description: "See how, where, and why your data was used.",
    icon: EyeIcon,
  },
  {
    name: "The Hot Seat",
    description:
      "Control your data at any time. Anonymity, blanking, or wiping... it's yours after all.",
    icon: ShieldExclamationIcon,
  },
];

export default function Home() {
  return (
    <>
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <h1 className="text-3xl font-bold leading-tight text-indigo-900">
            Oltiva Actif
          </h1>
        </div>
      </div>
      <div className="bg-indigo-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Privacy is Healthy
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-indigo-200">
            We're generating more data every day, in the journey to the
            quantified self. But we don't know how our data is used, or even if
            we'll end up in an ad. Use Oltiva Actif to control your data, and
            know how it's used - privacy is healthy.
          </p>
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
                  <p className="mt-2 text-base text-indigo-200">
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
