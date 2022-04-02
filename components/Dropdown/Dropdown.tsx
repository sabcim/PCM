import { NextComponentType } from "next";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import Link from "next/link";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

interface optionType {
    name: string
    href?: string
    onClick?: () => void
}

interface propsType {
    triggerName: string
    options: optionType[]
}

const Dropdown = (props: propsType) => {

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex text-white justify-center w-full rounded-md border-2 border-gray-300 shadow-sm px-4 py-2 text-sm font-medium">
                    {props.triggerName}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    {props.options.map((option, index) => {
                        return <Menu.Item key={index}>
                        {({ active }) => (
                            <Link
                            href={option.href ? option.href : ''}
                            >
                                <a
                                onClick={option.onClick ? option.onClick : () => {}}
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                                id={option.name.toLowerCase().split(" ").join("-")}
                                >
                                    {option.name}
                                </a>
                            </Link>
                        )}
                        </Menu.Item>

                    })}
                </div>
                </Menu.Items>
            </Transition>
            </Menu>
        </>
    )
}

export default Dropdown