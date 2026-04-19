import site from "./site";

export const heroData = {
  name: site.siteName,
  formattedName: site.siteName.toLowerCase().split(' ').join(' &nbsp;'),
  city: site.location.city,
  country: site.location.country,
  coordinates: [site.location.lng, site.location.lat] as [number, number],
  statusMessage: "available",
  map: {
    darkStyle: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    lightStyle: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    zoom: 17,
    pitch: 52,
    bearing: -15,
  }
};
