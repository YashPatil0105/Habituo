// import React from 'react';
// import { useRef, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { setCredentials } from '../features/authSlice';
// import { useLoginMutation } from '../features/authApiSlice';


// const Login = () => {
//     const userRef = useRef();
//     const errRef = useRef();
//     const [user, setUser] = useState('');
//     const [pwd , setPwd] = useState('');
//     const [errMsg , setErrMsg ] = useState('');
//     const navigate = useNavigate();

//     const [login , {isLoading} ] = useState('');
//     const dispatch = useDispatch();

//     useEffect(() => {
//         setErrMsg('');
//     },[user, pwd]);

//     const handleSubmit  = async (e) => {  
//         e.preventDefault()

//         try{
//             const userData = await login({user, pwd}).unwrap();
//             dispatch(setCredentials({...userData, user}));
//             setUser('');
//             setPwd('');
//             navigate('/home')

//         }catch (err){
//             if(!err?.response){
//                 setErrMsg('No server Response');
//             }else if ( err.response?.status === 400){
//                 setErrMsg('Missing Username or Password');
//             }else if (err.response?.status === 401){
//                 setErrMsg('Unathorized');
//             }else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }

//     }

//     const handleUserInput = (e) => setUser(e.target.value);
//     const handlePwdInput = (e) => setPwd(e.target.value);

    
//     const content = isLoading ? <h1>Loading...</h1> : (
//         <section className="login">
//             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

//             <h1>Employee Login</h1>

//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     ref={userRef}
//                     value={user}
//                     onChange={handleUserInput}
//                     autoComplete="off"
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     onChange={handlePwdInput}
//                     value={pwd}
//                     required
//                 />
//                 <button>Sign In</button>
//             </form>
//         </section>
//     )

//     return content;
// }

// export default Login;
// import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setCredentials } from '../features/authSlice';
// import { useLoginMutation } from '../features/authApiSlice';

// const Login = () => {
//     const userRef = useRef();
//     const errRef = useRef();
//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const navigate = useNavigate();

//     const [login, { isLoading }] = useLoginMutation();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const userData = await login({ user, pwd }).unwrap();
//             dispatch(setCredentials({ ...userData, user }));
//             setUser('');
//             setPwd('');
//             navigate('/');
//         } catch (err) {
//             if (!err?.originalStatus) {
//                 setErrMsg('No Server Response');
//             } else if (err.originalStatus?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.originalStatus?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             if(errRef.current){
//             errRef.current.focus();
//             }
//         }
//     };

//     const handleUserInput = (e) => setUser(e.target.value);
//     const handlePwdInput = (e) => setPwd(e.target.value);

//     const content = isLoading ? (
//         <h1 className="text-2xl font-bold text-center text-blue-500">Loading...</h1>
//     ) : (
//         <section className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
//                 <p
//                     ref={errRef}
//                     className={`text-red-500 text-center ${errMsg ? "block" : "hidden"}`}
//                     aria-live="assertive"
//                 >
//                     {errMsg}
//                 </p>

//                 <h1 className="text-2xl font-bold text-center text-gray-800">Employee Login</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label htmlFor="username" className="block text-gray-700">Username:</label>
//                         <input
//                             type="text"
//                             id="username"
//                             ref={userRef}
//                             value={user}
//                             onChange={handleUserInput}
//                             autoComplete="off"
//                             required
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="password" className="block text-gray-700">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             onChange={handlePwdInput}
//                             value={pwd}
//                             required
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//                     >
//                         Sign In
//                     </button>
//                 </form>
//             </div>
//         </section>
//     );

//     return content;
// };

// export default Login;
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../features/authSlice';
import { useLoginMutation } from '../features/authApiSlice';
import { User, Lock, Loader2, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ user, pwd }).unwrap();
            dispatch(setCredentials({ ...userData, user }));
            setUser('');
            setPwd('');
            navigate('/');
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            if(errRef.current){
                errRef.current.focus();
            }
        }
    };

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="relative">
                {/* Background decorators */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                
                {/* Main card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700"
                >
                    {/* Decorative SVG */}
                    <div className="absolute top-0 right-0 w-32 h-32">
                        <svg viewBox="0 0 100 100" className="opacity-20">
                            <circle cx="75" cy="25" r="20" className="fill-blue-500" />
                            <path d="M 0 100 L 100 0" stroke="currentColor" className="stroke-purple-500" strokeWidth="0.5" />
                            <path d="M 20 80 L 80 20" stroke="currentColor" className="stroke-blue-500" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold mb-8 text-white text-center">Login</h2>

                    {errMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg"
                        >
                            <p ref={errRef} className="text-red-500 text-center text-sm" aria-live="assertive">
                                {errMsg}
                            </p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-gray-300 block text-sm font-medium">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    value={user}
                                    onChange={handleUserInput}
                                    autoComplete="off"
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-gray-300 block text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="password"
                                    id="password"
                                    onChange={handlePwdInput}
                                    value={pwd}
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-2 px-4 hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>Sign In</span>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            New user?{' '}
                            <Link 
                                to="/register" 
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;