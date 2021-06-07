
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router';

const navigation = [
  { name: 'About', href: '/' },
  { name: 'Simulate', href: '/simulate' },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function isCurrentPage(href, pathname) {
  if  (href==="/") {
    if (pathname === "/") {
      return true;
    } else {
      return false;
    }
  }
  return (pathname.search(href) === 0);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/oltiva-logo.png"
                    alt="Oltiva"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/oltiva-logo.png"
                    alt="Oltiva"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isCurrentPage(item.href,router.pathname) ? 'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={isCurrentPage(item.href,router.pathname) ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isCurrentPage(item.href,router.pathname) ? 'bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6'
                      )}
                      aria-current={isCurrentPage(item.href,router.pathname) ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
            </div>
          </Disclosure.Panel>

        </>
      )}

    </Disclosure>
    <div className="mt-6 sm:mt-0 sm:py-12">{children}</div>
    </>
  );
}
