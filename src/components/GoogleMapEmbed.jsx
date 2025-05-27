import React from 'react';

const GoogleMapEmbed = ({ location }) => {
  if (!location) return null;

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(location)}`;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Google Map for {location}</h2>
      <iframe
        title="Google Map"
        width="100%"
        height="250"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      />
    </div>
  );
};

export default GoogleMapEmbed;