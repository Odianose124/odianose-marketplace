function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Search",
      description: "Search for the service you need near your location.",
    },
    {
      number: "2",
      title: "Chat & Get a Quote",
      description: "Chat with verified professionals and receive a quotation.",
    },
    {
      number: "3",
      title: "Pay Securely",
      description: "Make payment safely through the platform.",
    },
    {
      number: "4",
      title: "Job Completed",
      description: "Confirm the job is done and leave a review.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-700">
          How It Works
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Booking a trusted professional is simple.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center bg-gray-50 p-8 rounded-2xl shadow"
            >
              <div className="w-16 h-16 mx-auto bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {step.number}
              </div>

              <h3 className="text-xl font-bold mt-6">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
