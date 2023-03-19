import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
];

export default function Pagination({ setOffset, productNumberLimit, totalItems }) {
  const pivot = 3;
  const itemsArray = [];
  const [current, setCurrent] = useState(1);
  const totalNumberPages = Math.ceil(totalItems / productNumberLimit);
  const final = Math.min(Math.max(pivot * 2 + 2, pivot + current + 1), totalNumberPages + 1);
  const initial = Math.min(Math.max(final - (pivot * 2 + 1), 1), Math.max(current - pivot, 1));

  for (let i = initial; i < final; i++) {
    itemsArray.push(
      <a
        key={`Page-${i}`}
        onClick={() => {
          setCurrent(i);
          setOffset((i - 1) * productNumberLimit);
        }}
        href="#"
        aria-current="page"
        className={`${getShade(i)} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
      >
        {i}
      </a>
    );
  }

  function getShade(i) {
    return i === current ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
  }

  const startButton = () => {
    setCurrent(1);
    setOffset(0);
  };

  const prevButton = () => {
    if (current > 1) {
      setCurrent(current - 1);
      setOffset((current - 2) * productNumberLimit);
    }
  };

  const nextButton = () => {
    if (current < totalNumberPages) {
      setCurrent(current + 1);
      setOffset(current * productNumberLimit);
    }
  };

  const endButton = () => {
    setCurrent(totalNumberPages);
    setOffset((totalNumberPages - 1) * productNumberLimit);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing &nbsp;<span className="font-medium">{productNumberLimit * (current - 1) + 1} &nbsp;</span>to &nbsp;{' '}
          <span className="font-medium"> {current * productNumberLimit < totalItems ? current * productNumberLimit : totalItems} &nbsp;</span>of &nbsp;
          <span className="font-medium"> {totalItems} &nbsp; </span> results
        </p>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
                onClick={startButton}
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <span className="sr-only">Start</span>
                <ChevronDoubleLeftIcon className="h-5 w-5"aria-hidden="true" />
            </a>
            <a
                onClick={prevButton}
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                <span className="sr-only">Start</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {itemsArray}
         
            <a 
                 onClick={nextButton}
                 href="#" 
                 className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a 
                onClick={endButton}
                href="#" 
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
