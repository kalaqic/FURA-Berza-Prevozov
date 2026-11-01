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
      displayNameKey: "smallVehicle",
      cubicMeters: 12.15 // calculated as length * width * height
    },
    
    // Medium dimensions (average van)
    medium: {
      length: 5.5,
      width: 2.0,
      height: 2.2,
      displayNameKey: "mediumVehicle",
      cubicMeters: 24.2
    },
    
    // Large dimensions (average truck)
    large: {
      length: 8.0,
      width: 2.5,
      height: 2.8,
      displayNameKey: "largeVehicle",
      cubicMeters: 56.0
    }
  };
  
  // Function to get dimension object by size
  function getDimensionsBySize(size) {
    return vehicleDimensions[size] || vehicleDimensions.medium;
  }
  
  // Function to get all available sizes for select dropdowns
  function getAvailableSizes() {
    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'sl';
    const trans = window.translations && window.translations[currentLang] ? window.translations[currentLang] : {};
    
    return Object.keys(vehicleDimensions).map(key => ({
      value: key,
      displayName: trans[vehicleDimensions[key].displayNameKey] || vehicleDimensions[key].displayNameKey
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

// ---------------------------------------------------------------------------
// Custom dimensions (users type length / width / height themselves).
// The size templates above are kept ONLY so that old rides keep working.
// ---------------------------------------------------------------------------

// Sensible upper limits in metres - catches values typed in centimetres (e.g. 450)
const DIMENSION_LIMITS = { length: 25, width: 5, height: 6 };

// "4,5" / "4.5" / " 4,50 m " -> 4.5 ; anything invalid -> NaN
function parseDimensionInput(value) {
  if (value === null || value === undefined) return NaN;
  const cleaned = String(value).trim().replace(/\s*m$/i, '').replace(',', '.');
  if (cleaned === '' || !/^\d*\.?\d+$/.test(cleaned)) return NaN;
  return parseFloat(cleaned);
}

// Read and validate the three inputs. Returns { ok, dims } or { ok:false, field }.
function readDimensionInputs(lengthId, widthId, heightId) {
  const ids = { length: lengthId, width: widthId, height: heightId };
  const dims = {};
  for (const key of ['length', 'width', 'height']) {
    const el = document.getElementById(ids[key]);
    const val = parseDimensionInput(el ? el.value : '');
    if (!(val > 0) || val > DIMENSION_LIMITS[key]) {
      return { ok: false, field: el };
    }
    dims[key] = Math.round(val * 100) / 100;
  }
  dims.cubicMeters = Math.round(dims.length * dims.width * dims.height * 100) / 100;
  return { ok: true, dims };
}

// Dimensions of any ride, new or old:
//  - new rides and most old rides store vehicleDimensions {length,width,height}
//  - very old rides may only have vehicleSize small/medium/large
function getRideDimensions(ride) {
  if (!ride) return null;
  const d = ride.vehicleDimensions;
  if (d) {
    const length = parseFloat(String(d.length).replace(',', '.'));
    const width = parseFloat(String(d.width).replace(',', '.'));
    const height = parseFloat(String(d.height).replace(',', '.'));
    if (length > 0 && width > 0 && height > 0) {
      return { length, width, height };
    }
  }
  if (ride.vehicleSize && vehicleDimensions[ride.vehicleSize]) {
    const p = vehicleDimensions[ride.vehicleSize];
    return { length: p.length, width: p.width, height: p.height };
  }
  return null;
}

// Number in the user's language: 4.5 -> "4,5" (sl, de, ...) or "4.5" (en)
function formatDimensionNumber(n) {
  const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'sl';
  const locale = { sl: 'sl-SI', en: 'en-GB', sr: 'sr-Latn-RS', it: 'it-IT', de: 'de-DE', bs: 'bs-BA', hr: 'hr-HR', me: 'sr-Latn-ME' }[lang] || 'sl-SI';
  try {
    return Number(n).toLocaleString(locale, { maximumFractionDigits: 2 });
  } catch (e) {
    return String(Math.round(n * 100) / 100);
  }
}

// "4,5 m × 1,8 m × 1,5 m"
function formatDimensions(dims) {
  if (!dims) return '';
  return `${formatDimensionNumber(dims.length)} m × ${formatDimensionNumber(dims.width)} m × ${formatDimensionNumber(dims.height)} m`;
}

// Does the ride's vehicle meet the minimum length/width/height from search?
// Empty minimums are ignored. Rides without known dimensions only pass when no minimum is set.
function rideMeetsMinDimensions(ride, mins) {
  if (!mins) return true;
  const active = ['length', 'width', 'height'].filter(k => mins[k] > 0);
  if (active.length === 0) return true;
  const dims = getRideDimensions(ride);
  if (!dims) return false;
  return active.every(k => dims[k] + 1e-9 >= mins[k]);
}

window.DIMENSION_LIMITS = DIMENSION_LIMITS;
window.parseDimensionInput = parseDimensionInput;
window.readDimensionInputs = readDimensionInputs;
window.getRideDimensions = getRideDimensions;
window.formatDimensionNumber = formatDimensionNumber;
window.formatDimensions = formatDimensions;
window.rideMeetsMinDimensions = rideMeetsMinDimensions;
