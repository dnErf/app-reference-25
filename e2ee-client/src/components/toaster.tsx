import type { DismissOptions, DismissInterface, InstanceOptions } from "flowbite"
import { Dismiss } from "flowbite"
import { useEffect, useRef } from "react"

export { Toaster } 

const options: DismissOptions = {
    transition: 'transition-opacity',
    duration: 1000,
    timing: 'ease-out',

    // callback functions
    onHide: (context, targetEl) => {
        console.log('element has been dismissed')
    }
};

const instanceOptions: InstanceOptions = {
    id: 'targetElement',
    override: true
};

type Attrs = {
    id: string;
}

function Toaster(props: Attrs) {
    const toast = useRef(null)

    useEffect(() => {
        const dismiss: DismissInterface = new Dismiss(toast.current, toast.current, options, instanceOptions);
        dismiss.hide();
    }, [])
    
    return (
        <div ref={toast} id={`toast-undo-${props.id}`} className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
            <div className="text-sm font-normal">
                Added to Cart.
            </div>
            <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
                {/* <a className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700" href="#">Undo</a> */}
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target={`#toast-undo-${props.id}`} aria-label="Close">
                <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}