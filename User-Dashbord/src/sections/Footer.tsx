export const Footer = () => {
    return (


        <footer className="bg-white rounded-lg shadow dark:bg-zinc-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white uppercase">BlockForge</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Connect</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Contribution</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Dashboard</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-xl text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Blockforge</a>. All Rights Reserved.</span>
            </div>
        </footer>


    );
};