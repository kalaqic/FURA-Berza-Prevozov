/**
 * Vehicle dimensions standardization for FURA website
 * Provides predefined dimensions for different vehicle sizes
 */

// Predefined vehicle dimension sizes
const vehicleDimensions = {
    // Small dimensions (average car)
    small: {
      length: 4.5,
      width: 1.8,
      height: 1.5,
      displayName: "Male dimenzije (auto)",
      cubicMeters: 12.15 // calculated as length * width * height
    },
    
    // Medium dimensions (average van)
    medium: {
      length: 5.5,
      width: 2.0,
      height: 2.2,
      displayName: "Srednje dimenzije (kombi)",
      cubicMeters: 24.2
    },
    
    // Large dimensions (average truck)
    large: {
      length: 8.0,
      width: 2.5,
      height: 2.8,
      displayName: "Velike dimenzije (kamion)",
      cubicMeters: 56.0
    }
  };
  
  // Function to get dimension object by size
  function getDimensionsBySize(size) {
    return vehicleDimensions[size] || vehicleDimensions.medium;
  }
  
  // Function to get all available sizes for select dropdowns
  function getAvailableSizes() {
    return Object.keys(vehicleDimensions).map(key => ({
      value: key,
      displayName: vehicleDimensions[key].displayName
    }));
  }
  
  // Function to get dimension display text (e.g. "5.5m × 2.0m × 2.2m (24.2 m³)")
  function getDimensionDisplayText(size) {
    const dim = getDimensionsBySize(size);
    return `${dim.length}m × ${dim.width}m × ${dim.height}m (${dim.cubicMeters} m³)`;
  }
  
  // Make functions available globally
  window.vehicleDimensions = vehicleDimensions;
  window.getDimensionsBySize = getDimensionsBySize;
  window.getAvailableSizes = getAvailableSizes;
  window.getDimensionDisplayText = getDimensionDisplayText;