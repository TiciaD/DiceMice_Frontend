"use client"

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react'

export interface Option {
  id: string;
  label: string;
}

interface DropdownProps {
  label: string;
  placeholder: string;
  options: Option[];
  defaultSelectedOption?: Option;
  onChange?: (selectedOption: Option) => void;
}

const Dropdown = ({
  label,
  placeholder,
  options,
  defaultSelectedOption,
  onChange,
}: DropdownProps) => {
  const [selected, setSelected] = useState<Option | undefined>(defaultSelectedOption);

  const handleChange = (option: Option) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className='flex flex-col'>
        <Label className="block text-sm/6 font-medium text-gray-900">{label}</Label>
        <div className="relative mt-2">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="col-start-1 row-start-1 truncate pr-6">{selected?.label || placeholder}</span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{option.label}</span>

                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  )
}

export default Dropdown