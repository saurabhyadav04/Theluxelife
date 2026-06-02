import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const { setShowUserLogin, setUser, axios, navigate } = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const { data } = await axios.post(`/api/user/${state}`, {
                name, email, password
            });

            if (data.success) {
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div
            onClick={() => setShowUserLogin(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >

            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#e8dccf] overflow-hidden"
            >

                {/* Top Accent */}
                <div className="h-2 bg-[#1b2a4a]" />

                <div className="p-8 md:p-10">

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <p
                            className="uppercase tracking-[0.25em] text-xs text-[#1b2a4a] font-semibold mb-3"
                        >
                            Welcome to LuxeLife
                        </p>

                        <h2
                            className="text-3xl font-bold text-[#3f1f0a]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {state === "login" ? "Sign In" : "Create Account"}
                        </h2>

                        <p className="text-gray-500 mt-3 text-sm">
                            {state === "login"
                                ? "Access your account and continue shopping."
                                : "Join us and discover premium gifting experiences."}
                        </p>
                    </div>

                    {/* Name Field */}
                    {state === "register" && (
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-[#3f1f0a] mb-2">
                                Full Name
                            </label>

                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1b2a4a] focus:ring-2 focus:ring-[#1b2a4a]/20 outline-none transition-all"
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-[#3f1f0a] mb-2">
                            Email Address
                        </label>

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1b2a4a] focus:ring-2 focus:ring-[#1b2a4a]/20 outline-none transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#3f1f0a] mb-2">
                            Password
                        </label>

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1b2a4a] focus:ring-2 focus:ring-[#1b2a4a]/20 outline-none transition-all"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1b2a4a] hover:bg-[#ae8758] text-white py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        {state === "register" ? "Create Account" : "Sign In"}
                    </button>

                    {/* Switch Login/Register */}
                    <div className="text-center mt-6">
                        {state === "register" ? (
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <span
                                    onClick={() => setState("login")}
                                    className="text-[#1b2a4a] font-semibold cursor-pointer hover:underline"
                                >
                                    Sign In
                                </span>
                            </p>
                        ) : (
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setState("register")}
                                    className="text-[#1b2a4a] font-semibold cursor-pointer hover:underline"
                                >
                                    Create Account
                                </span>
                            </p>
                        )}
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Login