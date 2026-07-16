function WhyChooseUs() {
  const features = [
    {
      title: "Secure Payments",
      icon: "🔒",
      description:
        "Your payment is protected until the service is completed.",
    },
    {
      title: "Verified Professionals",
      icon: "✅",
      description:
        "Every provider is verified before joining the platform.",
    },
    {
      title: "Save Time",
      icon: "⚡",
      description:
        "Find nearby professionals in just a few clicks.",
    },
    {
      title: "Less Stress",
      icon: "😊",
      description:
        "Hire with confidence using reviews and ratings from real customers.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-700">
          Why Choose The Nigeria Market Services?
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12">
          We make it easier, safer, and faster to hire trusted professionals anywhere in Nigeria.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>

              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
