import toothLogin from "../assets/tooth.png";

const LoginForm = () => {
  return (
    <form className="w-full h-full md:w-[20vw] md:h-[60vh] bg-slate-200 ml-0 md:mt-5 md:-ml-[10vw] rounded-lg py-8 px-8 flex flex-col gap-5 items-center font-belleza shadow-xl">
      {/* img */}
      <div className="text-center flex flex-col items-center tracking-tight  font-semibold">
        <img src={toothLogin} className="h-[20vh] w-[20vw] md:h-12 md:w-12 " />
        <i className="opacity-75">Dentist Clinic</i>
      </div>
      {/* Username Input */}
      <div className="text-gray-800 text-[2.5em] md:text-xl font-semibold text-center flex flex-col gap-1">
        Username:
        <input type="text" className="w-full rounded-lg h-5" />
      </div>

      {/* Password Input */}
      <div className="text-gray-800 text-[2.5em] md:text-xl font-semibold text-center flex flex-col gap-1">
        Password:
        <input type="password" className="w-full rounded-lg h-5" />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="px-6 py-3 bg-pink-500 hover:bg-pink-400 rounded-xl font-bold text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
