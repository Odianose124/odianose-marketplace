function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-3xl">

          <span className="bg-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            🇳🇬 Trusted Across Nigeria
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-8 leading-tight">
            Need a Trusted Professional?
            <br />
            We've Got You Covered.
          </h1>

          <p className="mt-8 text-xl text-green-100 leading-9">
            Hire verified electricians, mechanics, plumbers,
            cleaners, AC technicians, carpenters and more
            anywhere in Nigeria.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <button className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100">
              Find a Service
            </button>

            <button className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-700">
              Become a Provider
            </button>

          </div>

          <div className="flex flex-wrap gap-10 mt-14">

            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p>Verified Professionals</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">25K+</h2>
              <p>Completed Jobs</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">36 States</h2>
              <p>Nationwide Coverage</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
