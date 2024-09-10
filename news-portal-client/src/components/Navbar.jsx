import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const nav = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState("")
    const menuRef = useRef(null); // Reference to the dropdown menu
    const buttonRef = useRef(null); // Reference to the user menu button

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        nav("/?search=" + search)
    }, [search])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        nav('/login')
    }

    const handleSearch = (event) => {
        event.preventDefault()
        nav("/?search=" + search)
    }

    return (
        <nav className="bg-gray-800 h-12">
            <div className="w-full px-5">
                <div className="relative grid grid-cols-3 items-center h-12">

                    {/* Logo */}
                    <Link to='/' className="text-white font-bold text-lg">Kabar-Kabari</Link>

                    {/* Search  */}
                    <div className='flex justify-center'>
                        <form className="w-[200px]" onSubmit={handleSearch}>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input name='search' type="search" value={search} onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Nuclear Bomb ..." required />
                            </div>
                        </form>
                    </div>

                    {/* Login / Menu */}
                    <div className='flex justify-end'>
                        {!localStorage.getItem('token') ?
                            <Link to='/login' className='text-white'>Login</Link>
                            :
                            <div className="flex items-center sm:static sm:inset-auto">
                                <p className="text-gray-100 hidden md:block">{localStorage.getItem('username') !== 'null' ? localStorage.getItem('username') : localStorage.getItem('email')}</p>
                                <div className="relative ml-3">
                                    <button
                                        type="button"
                                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        onClick={toggleMenu}
                                        aria-expanded={isMenuOpen}
                                        aria-haspopup="true"
                                        ref={buttonRef}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                                            alt="User Avatar"
                                        />
                                    </button>

                                    <div
                                        ref={menuRef}
                                        className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMenuOpen ? '' : 'hidden'}`}
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex="-1"

                                    >
                                        <NavLink
                                            to="/cms/add-article"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Post Article
                                        </NavLink>
                                        <NavLink
                                            to="/cms/my-articles"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            My Articles
                                        </NavLink>
                                        <NavLink
                                            to="/cms/all-articles"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            All Articles
                                        </NavLink>
                                        <NavLink
                                            to="/cms/all-categories"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            All Categories
                                        </NavLink>

                                        {(localStorage.getItem('role') === 'Admin') &&
                                            <NavLink
                                                to="/cms/add-staff"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                tabIndex="-1"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Create Staff
                                            </NavLink>
                                        }
                                        <a
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
