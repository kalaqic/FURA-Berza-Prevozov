/**
 * Location data for FURA website
 * Contains countries and cities data with coordinates
 */

// List of available countries
const countries = [
    'Slovenija', 
    'Hrvatska', 
    'Srbija', 
    'Bosna i Hercegovina'
];

// Cities data by country
const citiesByCountry = {
    'Slovenija': [
        // Major cities
        'Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Koper', 'Novo Mesto', 
        'Velenje', 'Nova Gorica', 'Ptuj', 'Murska Sobota', 'Domžale',
        'Škofja Loka', 'Kamnik', 'Jesenice', 'Trbovlje', 'Izola',
        'Krško', 'Portorož', 'Bled', 'Postojna', 'Brežice', 'Idrija',
        'Ilirska Bistrica', 'Lendava', 'Radovljica', 'Ajdovščina',
        'Kočevje', 'Slovenska Bistrica', 'Tržič', 'Grosuplje',

        // Smaller cities and towns
        'Litija', 'Sežana', 'Žalec', 'Ribnica', 'Ljutomer', 'Gornja Radgona',
        'Slovenj Gradec', 'Lenart', 'Moravče', 'Šmarje pri Jelšah', 'Šentjur',
        'Laško', 'Radeče', 'Sevnica', 'Hrastnik', 'Zagorje ob Savi'
    ],
    'Hrvatska': [
        // Major cities
        'Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Slavonski Brod',
        'Šibenik', 'Dubrovnik', 'Karlovac', 'Varaždin', 'Sisak', 'Vinkovci',
        'Požega', 'Našice', 'Đakovo', 'Čakovec', 'Samobor', 'Makarska',

        // Smaller cities and towns
        'Pula', 'Koprivnica', 'Bjelovar', 'Virovitica', 'Kutina', 'Križevci',
        'Crikvenica', 'Opatija', 'Umag', 'Rovinj', 'Poreč', 'Gospić', 
        'Metković', 'Sinj', 'Kaštela', 'Vodice', 'Biograd na Moru',
        'Novigrad', 'Kastav', 'Delnice', 'Nova Gradiška',
    ],
    'Srbija': [
        // Major cities
        'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Pančevo', 
        'Zrenjanin', 'Šabac', 'Čačak', 'Smederevo', 'Novi Pazar', 'Leskovac', 
        'Užice', 'Kruševac', 'Vranje', 'Sombor', 'Valjevo', 'Sremska Mitrovica', 
        'Jagodina', 'Loznica', 'Požarevac', 'Pirot', 'Kikinda', 'Vršac',
        'Zaječar', 'Kraljevo', 'Bor', 'Prijepolje',

        // Smaller cities and towns
        'Negotin', 'Prokuplje', 'Sjenica', 'Trstenik', 'Paraćin', 'Ćuprija',
        'Novi Beograd', 'Zemun', 'Raška', 'Aleksandrovac', 'Zlatibor', 
        'Kopaonik', 'Arilje', 'Ivanjica', 'Bajina Bašta'
    ],
    'Bosna i Hercegovina': [
        // Major cities
        'Sarajevo', 'Banja Luka', 'Tuzla', 'Zenica', 'Mostar', 'Prijedor', 
        'Bijeljina', 'Brčko', 'Doboj', 'Bihać', 'Trebinje', 'Travnik', 
        'Cazin', 'Livno', 'Foča', 'Goražde', 'Srebrenica', 
        'Bugojno', 'Višegrad', 'Konjic', 'Ljubuški', 'Jablanica', 'Gacko', 
        'Mrkonjić Grad', 'Neum', 'Zvornik', 'Sanski Most', 'Velika Kladuša', 
        'Jajce',

        // Smaller cities and towns
        'Vitez', 'Žepče', 'Tešanj', 'Orašje', 'Gradačac', 'Gračanica', 
        'Lukavac', 'Kakanj', 'Zavidovići', 'Srebrenik', 'Ključ', 'Olovo', 
        'Vareš', 'Pale', 'Bosanska Krupa', 'Bosanski Petrovac', 
        'Bosanski Šamac', 'Gradiška', 'Petrovo'
    ]
};

// Comprehensive coordinates for cities by country
const cityCoordinates = {
    'Slovenija': {
        // Major cities
        'Ljubljana': { lat: 46.0569, lng: 14.5058 },
        'Maribor': { lat: 46.5547, lng: 15.6467 },
        'Celje': { lat: 46.2335, lng: 15.2677 },
        'Kranj': { lat: 46.2397, lng: 14.3552 },
        'Koper': { lat: 45.5489, lng: 13.7301 },
        'Novo Mesto': { lat: 45.8010, lng: 15.1710 },
        'Velenje': { lat: 46.3589, lng: 15.1109 },
        'Nova Gorica': { lat: 45.9547, lng: 13.6483 },
        'Ptuj': { lat: 46.4200, lng: 15.8700 },
        'Murska Sobota': { lat: 46.6625, lng: 16.1664 },
        'Domžale': { lat: 46.1372, lng: 14.5944 },
        'Škofja Loka': { lat: 46.1650, lng: 14.3067 },
        'Kamnik': { lat: 46.2256, lng: 14.6119 },
        'Jesenice': { lat: 46.4308, lng: 14.0564 },
        'Trbovlje': { lat: 46.1550, lng: 15.0525 },
        'Izola': { lat: 45.5367, lng: 13.6606 },
        'Krško': { lat: 45.9589, lng: 15.4911 },
        'Portorož': { lat: 45.5147, lng: 13.5908 },
        'Bled': { lat: 46.3683, lng: 14.1136 },
        'Postojna': { lat: 45.7769, lng: 14.2069 },
        'Brežice': { lat: 45.9053, lng: 15.5908 },
        'Idrija': { lat: 46.0017, lng: 14.0300 },
        'Ilirska Bistrica': { lat: 45.5672, lng: 14.2406 },
        'Lendava': { lat: 46.5647, lng: 16.4536 },
        'Radovljica': { lat: 46.3428, lng: 14.1744 },
        'Ajdovščina': { lat: 45.8872, lng: 13.9094 },
        'Kočevje': { lat: 45.6417, lng: 14.8633 },
        'Slovenska Bistrica': { lat: 46.3931, lng: 15.5728 },
        'Tržič': { lat: 46.3625, lng: 14.3092 },
        'Grosuplje': { lat: 45.9553, lng: 14.6586 },
        
        // Smaller cities
        'Litija': { lat: 46.0594, lng: 14.8303 },
        'Sežana': { lat: 45.7078, lng: 13.8764 },
        'Žalec': { lat: 46.2522, lng: 15.1653 },
        'Ribnica': { lat: 45.7381, lng: 14.7361 },
        'Ljutomer': { lat: 46.5217, lng: 16.1969 },
        'Gornja Radgona': { lat: 46.6739, lng: 15.9911 },
        'Slovenj Gradec': { lat: 46.5108, lng: 15.0803 },
        'Lenart': { lat: 46.5761, lng: 15.8314 },
        'Moravče': { lat: 46.1369, lng: 14.7458 },
        'Šmarje pri Jelšah': { lat: 46.2292, lng: 15.5192 },
        'Šentjur': { lat: 46.2167, lng: 15.3972 },
        'Laško': { lat: 46.1511, lng: 15.2356 },
        'Radeče': { lat: 46.0678, lng: 15.1844 },
        'Sevnica': { lat: 46.0106, lng: 15.3161 },
        'Hrastnik': { lat: 46.1406, lng: 15.0847 },
        'Zagorje ob Savi': { lat: 46.1342, lng: 14.9947 }
    },
    'Hrvatska': {
        // Major cities
        'Zagreb': { lat: 45.8150, lng: 15.9819 },
        'Split': { lat: 43.5081, lng: 16.4402 },
        'Rijeka': { lat: 45.3271, lng: 14.4422 },
        'Osijek': { lat: 45.5511, lng: 18.6931 },
        'Zadar': { lat: 44.1194, lng: 15.2322 },
        'Slavonski Brod': { lat: 45.1603, lng: 18.0142 },
        'Šibenik': { lat: 43.7350, lng: 15.8952 },
        'Dubrovnik': { lat: 42.6507, lng: 18.0944 },
        'Karlovac': { lat: 45.4929, lng: 15.5553 },
        'Varaždin': { lat: 46.3044, lng: 16.3378 },
        'Sisak': { lat: 45.4853, lng: 16.3728 },
        'Vinkovci': { lat: 45.2881, lng: 18.8056 },
        'Požega': { lat: 45.3319, lng: 17.6733 },
        'Našice': { lat: 45.4947, lng: 18.0950 },
        'Đakovo': { lat: 45.3100, lng: 18.4103 },
        'Čakovec': { lat: 46.3897, lng: 16.4294 },
        'Samobor': { lat: 45.8031, lng: 15.7114 },
        'Makarska': { lat: 43.2956, lng: 17.0164 },
        
        // Smaller cities
        'Pula': { lat: 44.8666, lng: 13.8496 },
        'Koprivnica': { lat: 46.1639, lng: 16.8336 },
        'Bjelovar': { lat: 45.8981, lng: 16.8425 },
        'Virovitica': { lat: 45.8322, lng: 17.3839 },
        'Kutina': { lat: 45.4792, lng: 16.7767 },
        'Križevci': { lat: 46.0217, lng: 16.5425 },
        'Crikvenica': { lat: 45.1731, lng: 14.6911 },
        'Opatija': { lat: 45.3375, lng: 14.3053 },
        'Umag': { lat: 45.4367, lng: 13.5256 },
        'Rovinj': { lat: 45.0811, lng: 13.6389 },
        'Poreč': { lat: 45.2269, lng: 13.5936 },
        'Gospić': { lat: 44.5469, lng: 15.3742 },
        'Metković': { lat: 43.0539, lng: 17.6489 },
        'Sinj': { lat: 43.7011, lng: 16.6394 },
        'Kaštela': { lat: 43.5519, lng: 16.3825 },
        'Vodice': { lat: 43.7622, lng: 15.7789 },
        'Biograd na Moru': { lat: 43.9350, lng: 15.4425 },
        'Novigrad': { lat: 45.3167, lng: 13.5628 },
        'Kastav': { lat: 45.3733, lng: 14.3481 },
        'Delnice': { lat: 45.4000, lng: 14.8000 },
        'Nova Gradiška': { lat: 45.2586, lng: 17.3814 }
    },
    'Srbija': {
        // Major cities
        'Beograd': { lat: 44.7866, lng: 20.4489 },
        'Novi Sad': { lat: 45.2514, lng: 19.8369 },
        'Niš': { lat: 43.3209, lng: 21.8958 },
        'Kragujevac': { lat: 44.0142, lng: 20.9794 },
        'Subotica': { lat: 46.1000, lng: 19.6650 },
        'Pančevo': { lat: 44.8708, lng: 20.6403 },
        'Zrenjanin': { lat: 45.3836, lng: 20.3736 },
        'Šabac': { lat: 44.7480, lng: 19.6940 },
        'Čačak': { lat: 43.8914, lng: 20.3497 },
        'Smederevo': { lat: 44.6631, lng: 20.9317 },
        'Novi Pazar': { lat: 43.1375, lng: 20.5144 },
        'Leskovac': { lat: 42.9981, lng: 21.9461 },
        'Užice': { lat: 43.8589, lng: 19.8425 },
        'Kruševac': { lat: 43.5833, lng: 21.3319 },
        'Vranje': { lat: 42.5472, lng: 21.8994 },
        'Sombor': { lat: 45.7731, lng: 19.1230 },
        'Valjevo': { lat: 44.2667, lng: 19.8833 },
        'Sremska Mitrovica': { lat: 44.9728, lng: 19.6122 },
        'Jagodina': { lat: 43.9771, lng: 21.2603 },
        'Loznica': { lat: 44.5378, lng: 19.2231 },
        'Požarevac': { lat: 44.6114, lng: 21.1867 },
        'Pirot': { lat: 43.1519, lng: 22.5986 },
        'Kikinda': { lat: 45.8295, lng: 20.4612 },
        'Vršac': { lat: 45.1172, lng: 21.3039 },
        'Zaječar': { lat: 43.9053, lng: 22.2845 },
        'Kraljevo': { lat: 43.7242, lng: 20.6872 },
        'Bor': { lat: 44.0689, lng: 22.0956 },
        'Prijepolje': { lat: 43.3911, lng: 19.6433 },
        
        // Smaller cities
        'Negotin': { lat: 44.2264, lng: 22.5306 },
        'Prokuplje': { lat: 43.2342, lng: 21.5881 },
        'Sjenica': { lat: 43.2731, lng: 20.0008 },
        'Trstenik': { lat: 43.6172, lng: 21.0028 },
        'Paraćin': { lat: 43.8608, lng: 21.4097 },
        'Ćuprija': { lat: 43.9300, lng: 21.3711 },
        'Novi Beograd': { lat: 44.8108, lng: 20.4183 },
        'Zemun': { lat: 44.8431, lng: 20.4011 },
        'Raška': { lat: 43.2869, lng: 20.6161 },
        'Aleksandrovac': { lat: 43.4567, lng: 21.0475 },
        'Zlatibor': { lat: 43.7294, lng: 19.7031 },
        'Kopaonik': { lat: 43.2839, lng: 20.8119 },
        'Arilje': { lat: 43.7569, lng: 20.0958 },
        'Ivanjica': { lat: 43.5792, lng: 20.2314 },
        'Bajina Bašta': { lat: 43.9711, lng: 19.5675 }
    },
    'Bosna i Hercegovina': {
        // Major cities
        'Sarajevo': { lat: 43.8563, lng: 18.4131 },
        'Banja Luka': { lat: 44.7722, lng: 17.1910 },
        'Tuzla': { lat: 44.5438, lng: 18.6761 },
        'Zenica': { lat: 44.2031, lng: 17.9078 },
        'Mostar': { lat: 43.3422, lng: 17.8080 },
        'Prijedor': { lat: 44.9808, lng: 16.7133 },
        'Bijeljina': { lat: 44.7587, lng: 19.2164 },
        'Brčko': { lat: 44.8725, lng: 18.8092 },
        'Doboj': { lat: 44.7347, lng: 18.0878 },
        'Bihać': { lat: 44.8117, lng: 15.8700 },
        'Trebinje': { lat: 42.7119, lng: 18.3436 },
        'Travnik': { lat: 44.2264, lng: 17.6636 },
        'Cazin': { lat: 44.9692, lng: 15.9428 },
        'Livno': { lat: 43.8281, lng: 17.0078 },
        'Foča': { lat: 43.5056, lng: 18.7956 },
        'Goražde': { lat: 43.6686, lng: 18.9753 },
        'Srebrenica': { lat: 44.1025, lng: 19.2931 },
        'Bugojno': { lat: 44.0581, lng: 17.4517 },
        'Višegrad': { lat: 43.7828, lng: 19.2931 },
        'Konjic': { lat: 43.6522, lng: 17.9597 },
        'Ljubuški': { lat: 43.1972, lng: 17.5472 },
        'Jablanica': { lat: 43.6603, lng: 17.7600 },
        'Gacko': { lat: 43.1669, lng: 18.5350 },
        'Mrkonjić Grad': { lat: 44.4167, lng: 17.0833 },
        'Neum': { lat: 42.9247, lng: 17.6147 },
        'Zvornik': { lat: 44.3861, lng: 19.1033 },
        'Sanski Most': { lat: 44.7667, lng: 16.6667 },
        'Velika Kladuša': { lat: 45.1853, lng: 15.8047 },
        'Jajce': { lat: 44.3417, lng: 17.2717 },
        
        // Smaller cities
        'Vitez': { lat: 44.1542, lng: 17.7900 },
        'Žepče': { lat: 44.4267, lng: 18.0375 },
        'Tešanj': { lat: 44.6114, lng: 17.9861 },
        'Orašje': { lat: 45.0578, lng: 18.6939 },
        'Gradačac': { lat: 44.8781, lng: 18.4278 },
        'Gračanica': { lat: 44.7033, lng: 18.3106 },
        'Lukavac': { lat: 44.5397, lng: 18.5369 },
        'Kakanj': { lat: 44.1331, lng: 18.1225 },
        'Zavidovići': { lat: 44.4456, lng: 18.1478 },
        'Srebrenik': { lat: 44.7075, lng: 18.4894 },
        'Ključ': { lat: 44.5317, lng: 16.7772 },
        'Olovo': { lat: 44.1286, lng: 18.5850 },
        'Vareš': { lat: 44.1639, lng: 18.3281 },
        'Pale': { lat: 43.8167, lng: 18.5667 },
        'Bosanska Krupa': { lat: 44.8825, lng: 16.1511 },
        'Bosanski Petrovac': { lat: 44.5511, lng: 16.3650 },
        'Bosanski Šamac': { lat: 45.0600, lng: 18.4678 },
        'Gradiška': { lat: 45.1458, lng: 17.2544 },
        'Petrovo': { lat: 44.6236, lng: 18.3697 }
    }
};

// Calculate distance between two coordinates using Haversine formula (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Find cities within a certain distance from a given city
function findNearbyCity(country, city, maxDistance = 100) {  // Default changed to 100km
    if (!cityCoordinates[country] || !cityCoordinates[country][city]) {
        console.warn(`No coordinates found for ${city}, ${country}`);
        return [];
    }
    
    const cityCoord = cityCoordinates[country][city];
    const nearbyCities = [];
    
    // Search in the same country
    for (const [cityName, coords] of Object.entries(cityCoordinates[country])) {
        if (cityName === city) continue; // Skip the same city
        
        const distance = calculateDistance(
            cityCoord.lat, cityCoord.lng,
            coords.lat, coords.lng
        );
        
        if (distance <= maxDistance) {
            nearbyCities.push({
                city: cityName,
                country: country,
                distance: distance
            });
        }
    }
    
    // Also search in neighboring countries
    for (const otherCountry of countries) {
        if (otherCountry === country) continue; // Skip same country
        
        // For each city in the other country
        for (const [cityName, coords] of Object.entries(cityCoordinates[otherCountry] || {})) {
            const distance = calculateDistance(
                cityCoord.lat, cityCoord.lng,
                coords.lat, coords.lng
            );
            
            if (distance <= maxDistance) {
                nearbyCities.push({
                    city: cityName,
                    country: otherCountry,
                    distance: distance
                });
            }
        }
    }
    
    // Sort by distance
    nearbyCities.sort((a, b) => a.distance - b.distance);
    
    return nearbyCities;
}

// Export the data for use in other modules
window.locationData = {
    countries,
    citiesByCountry,
    cityCoordinates,
    calculateDistance,
    findNearbyCity
};