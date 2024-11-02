import logo from '../assets/logo.jpg';

export default function Header () {
    return (
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} class="h-8" alt="Platform Logo" />
            </a>
        </div>
        </nav>
    )
};