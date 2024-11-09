// // Register.js
// import React, { useState } from 'react';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:8000/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ user: username, pwd: password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setMessage(`Success: ${data.success}`);
//             } else {
//                 setMessage(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             setMessage('Failed to register. Please try again later.');
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Register;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Loader2 } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username, pwd: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Success: ${data.success}`);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('Failed to register. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="relative">
                {/* Background decorator */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                
                {/* Main card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700"
                >
                    <div className="absolute top-0 right-0 w-32 h-32">
                        <svg viewBox="0 0 100 100" className="opacity-20">
                            <circle cx="75" cy="25" r="20" className="fill-blue-500" />
                            <path d="M 0 100 L 100 0" stroke="currentColor" className="stroke-purple-500" strokeWidth="0.5" />
                            <path d="M 20 80 L 80 20" stroke="currentColor" className="stroke-blue-500" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold mb-8 text-white text-center">Register</h2>
                    
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-gray-300 block text-sm font-medium">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-300 block text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-2 px-4 hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <span>Register</span>
                            )}
                        </button>
                    </form>

                    {message && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 text-center ${
                                message.includes('Success') ? 'text-green-400' : 'text-red-400'
                            }`}
                        >
                            {message}
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Register;