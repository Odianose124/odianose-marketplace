function DetectLocationButton({
  onLocationDetected,
}) {
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support location services.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        onLocationDetected({
          latitude,
          longitude,
        });
      },

      (error) => {
        console.error(error);

        alert("Unable to get your current location.");
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  return (
    <button
      type="button"
      onClick={detectLocation}
      className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl p-4 transition"
    >
      📍 Use My Current Location
    </button>
  );
}

export default DetectLocationButton;