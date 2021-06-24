import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

function constructPanel(header, message, isOpen, setIsOpen) {
  return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">Vehicle Information</Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                              className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setIsOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300">
                          { header }
                        </p>
                      </div>
                    </div>
                    <div className="relative flex-1 py-6 px-4 sm:px-6">
                      <div className="absolute inset-0 py-6 px-4 sm:px-6">
                        <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" >{message}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )
}

export default function SlideOver(props) {
  let [isOpen, setIsOpen] = [props.open,props.setIsOpen];
  const guid = props.guid;
  const { data, error } = useSWR(`/api/ledger/${guid}`, fetcher);

  if (error) {
    return constructPanel("Error","Error loading data in confidential ledger.",isOpen,setIsOpen);
  }

  if (!data) {
    return constructPanel("Loading",`Loading confidential ledger data for id ${guid}`,isOpen,setIsOpen);
  }

  return constructPanel(props.header,JSON.stringify(data),isOpen,setIsOpen);
}