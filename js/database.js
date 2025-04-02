/**
 * Mock database for FURA website
 * This file contains sample data for testing and development
 */

// Sample rides data
const rides = [
    // "Nudim prevoz" rides
    {
        id: 1,
        type: "offering", // nudim prevoz
        fromCountry: "Slovenija",
        toCountry: "Srbija",
        fromCity: "Ljubljana",
        toCity: "Beograd",
        date: "2025-03-20",
        time: "08:00",
        formattedDate: "20.03.2025",
        formattedTime: "08:00 AM",
        displayDate: "20/03/2025",
        displayTime: "08:00 AM",
        vehicleType: "car", // avto
        vehicleTypeDisplay: "Avto",
        vehicleDimensions: {
            length: 4.5,
            width: 1.8,
            height: 1.5
        },
        hasRefrigerator: false,
        description: "Potujem na poslovni sestanek v Beograd. Imam prostor za 3 sopotnike ali manjši tovor.",
        image: null,
        contact: {
            name: "Janez Novak",
            email: "janez.novak@gmail.com",
            phone: "+386 31 123 456"
        }
    },
    {
        id: 2,
        type: "offering", // nudim prevoz
        fromCountry: "Slovenija",
        toCountry: "Avstrija",
        fromCity: "Maribor",
        toCity: "Graz",
        date: "2025-03-22",
        time: "14:30",
        formattedDate: "22.03.2025",
        formattedTime: "14:30 PM",
        displayDate: "22/03/2025",
        displayTime: "02:30 PM",
        vehicleType: "van", // kombi
        vehicleTypeDisplay: "Kombi",
        vehicleDimensions: {
            length: 5.2,
            width: 2.0,
            height: 2.2
        },
        hasRefrigerator: true,
        description: "Prevažam pohištvo v Graz. Imam približno 8 kubičnih metrov prostora za dodatni tovor.",
        image: null,
        contact: {
            name: "Marko Kovač",
            email: "marko.kovac@gmail.com",
            phone: "+386 41 987 654"
        }
    },
    {
        id: 3,
        type: "offering", // nudim prevoz
        fromCountry: "Slovenija",
        toCountry: "Hrvaška",
        fromCity: "Koper",
        toCity: "Rijeka",
        date: "2025-03-25",
        time: "10:00",
        formattedDate: "25.03.2025",
        formattedTime: "10:00 AM",
        displayDate: "25/03/2025",
        displayTime: "10:00 AM",
        vehicleType: "truck", // tovornjak
        vehicleTypeDisplay: "Tovornjak",
        vehicleDimensions: {
            length: 7.5,
            width: 2.5,
            height: 2.8
        },
        hasRefrigerator: false,
        description: "Redno prevažam blago med Koprom in Rijeko. Na voljo je približno 15 kubičnih metrov prostora.",
        image: null,
        contact: {
            name: "Peter Horvat",
            email: "peter.horvat@gmail.com",
            phone: "+386 51 234 567"
        }
    },
    {
        id: 4,
        type: "offering", // nudim prevoz
        fromCountry: "Slovenija",
        toCountry: "Italija",
        fromCity: "Nova Gorica",
        toCity: "Trst",
        date: "2025-03-18",
        time: "16:00",
        formattedDate: "18.03.2025",
        formattedTime: "16:00 PM",
        displayDate: "18/03/2025",
        displayTime: "04:00 PM",
        vehicleType: "car", // avto
        vehicleTypeDisplay: "Avto",
        vehicleDimensions: {
            length: 4.2,
            width: 1.8,
            height: 1.4
        },
        hasRefrigerator: false,
        description: "Dnevno potujem v Trst na delo. Imam prostor za 2-3 sopotnike.",
        image: null,
        contact: {
            name: "Ana Kranjec",
            email: "ana.kranjec@gmail.com",
            phone: "+386 70 345 678"
        }
    },
    {
        id: 5,
        type: "offering", // nudim prevoz
        fromCountry: "Slovenija",
        toCountry: "Madžarska",
        fromCity: "Murska Sobota",
        toCity: "Budimpešta",
        date: "2025-03-30",
        time: "07:30",
        formattedDate: "30.03.2025",
        formattedTime: "07:30 AM",
        displayDate: "30/03/2025",
        displayTime: "07:30 AM",
        vehicleType: "van", // kombi
        vehicleTypeDisplay: "Kombi",
        vehicleDimensions: {
            length: 5.5,
            width: 2.1,
            height: 2.3
        },
        hasRefrigerator: true,
        description: "Prevažam hladilno blago v Budimpešto. Ima prostora za dodatni tovor, ki potrebuje hlajenje.",
        image: null,
        contact: {
            name: "Matej Perko",
            email: "matej.perko@gmail.com",
            phone: "+386 31 876 543"
        }
    },
    
    // "Iščem prevoz" rides
    {
        id: 6,
        type: "looking", // iščem prevoz
        fromCountry: "Slovenija",
        toCountry: "Srbija",
        fromCity: "Ljubljana",
        toCity: "Novi Sad",
        date: "2025-04-02",
        time: "09:00",
        formattedDate: "02.04.2025",
        formattedTime: "09:00 AM",
        displayDate: "02/04/2025",
        displayTime: "09:00 AM",
        vehicleType: "any", // poljubno vozilo
        vehicleTypeDisplay: "Poljubno vozilo",
        vehicleDimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        hasRefrigerator: false,
        description: "Potrebujem prevoz za dva kovčka in možnost prevoza za eno osebo.",
        image: null,
        contact: {
            name: "Nina Zupan",
            email: "nina.zupan@gmail.com",
            phone: "+386 41 765 432"
        }
    },
    {
        id: 7,
        type: "looking", // iščem prevoz
        fromCountry: "Slovenija",
        toCountry: "Avstrija",
        fromCity: "Celje",
        toCity: "Dunaj",
        date: "2025-03-28",
        time: "12:00",
        formattedDate: "28.03.2025",
        formattedTime: "12:00 PM",
        displayDate: "28/03/2025",
        displayTime: "12:00 PM",
        vehicleType: "van", // kombi
        vehicleTypeDisplay: "Kombi",
        vehicleDimensions: {
            length: 2.0,
            width: 1.5,
            height: 1.4
        },
        hasRefrigerator: false,
        description: "Potrebujem prevoz za manjše pohištvo (kavč in miza). Skupna teža približno 100 kg.",
        image: null,
        contact: {
            name: "Tina Krajnc",
            email: "tina.krajnc@gmail.com",
            phone: "+386 70 432 109"
        }
    },
    {
        id: 8,
        type: "looking", // iščem prevoz
        fromCountry: "Slovenija",
        toCountry: "Hrvaška",
        fromCity: "Ptuj",
        toCity: "Zagreb",
        date: "2025-04-05",
        time: "15:30",
        formattedDate: "05.04.2025",
        formattedTime: "15:30 PM",
        displayDate: "05/04/2025",
        displayTime: "03:30 PM",
        vehicleType: "car", // avto
        vehicleTypeDisplay: "Avto",
        vehicleDimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        hasRefrigerator: false,
        description: "Potrebujem prevoz za dve osebi in en manjši kovček.",
        image: null,
        contact: {
            name: "Luka Vidmar",
            email: "luka.vidmar@gmail.com",
            phone: "+386 51 321 654"
        }
    },
    {
        id: 9,
        type: "looking", // iščem prevoz
        fromCountry: "Slovenija",
        toCountry: "Italija",
        fromCity: "Jesenice",
        toCity: "Udine",
        date: "2025-04-10",
        time: "08:45",
        formattedDate: "10.04.2025",
        formattedTime: "08:45 AM",
        displayDate: "10/04/2025",
        displayTime: "08:45 AM",
        vehicleType: "truck", // tovornjak
        vehicleTypeDisplay: "Tovornjak",
        vehicleDimensions: {
            length: 3.5,
            width: 2.2,
            height: 2.0
        },
        hasRefrigerator: false,
        description: "Potrebujem prevoz za gradbeni material (opeke). Skupna teža približno 1500 kg.",
        image: null,
        contact: {
            name: "Jože Breznik",
            email: "joze.breznik@gmail.com",
            phone: "+386 41 567 890"
        }
    },
    {
        id: 10,
        type: "looking", // iščem prevoz
        fromCountry: "Slovenija",
        toCountry: "Madžarska",
        fromCity: "Lendava",
        toCity: "Szombathely",
        date: "2025-04-15",
        time: "11:00",
        formattedDate: "15.04.2025",
        formattedTime: "11:00 AM",
        displayDate: "15/04/2025",
        displayTime: "11:00 AM",
        vehicleType: "van", // kombi
        vehicleTypeDisplay: "Kombi",
        vehicleDimensions: {
            length: 1.5,
            width: 1.0,
            height: 1.0
        },
        hasRefrigerator: true,
        description: "Potrebujem prevoz za sveže sadje. Potrebno hlajenje.",
        image: null,
        contact: {
            name: "Maja Kotnik",
            email: "maja.kotnik@gmail.com",
            phone: "+386 31 890 123"
        }
    },
    
    // DODATNE "Nudim prevoz" fure
    {
        id: 11,
        type: "offering",
        fromCountry: "Slovenija",
        toCountry: "Nemčija",
        fromCity: "Kranj",
        toCity: "München",
        date: "2025-04-05",
        time: "06:00",
        formattedDate: "05.04.2025",
        formattedTime: "06:00 AM",
        displayDate: "05/04/2025",
        displayTime: "06:00 AM",
        vehicleType: "van",
        vehicleTypeDisplay: "Kombi",
        vehicleDimensions: {
            length: 5.0,
            width: 2.2,
            height: 2.3
        },
        hasRefrigerator: false,
        description: "Redno potovanje v München za dostavo. Imam prostor za dodatne pakete ali manjši tovor, približno 5 kubičnih metrov.",
        image: null,
        contact: {
            name: "David Kovačič",
            email: "david.kovacic@gmail.com",
            phone: "+386 41 333 777"
        }
    },
    {
        id: 12,
        type: "offering",
        fromCountry: "Slovenija",
        toCountry: "Francija",
        fromCity: "Ljubljana",
        toCity: "Pariz",
        date: "2025-04-12",
        time: "22:00",
        formattedDate: "12.04.2025",
        formattedTime: "22:00 PM",
        displayDate: "12/04/2025",
        displayTime: "10:00 PM",
        vehicleType: "truck",
        vehicleTypeDisplay: "Tovornjak",
        vehicleDimensions: {
            length: 8.0,
            width: 2.5,
            height: 3.0
        },
        hasRefrigerator: true,
        description: "Tedenski prevoz v Pariz. Vozilo ima hladilnik, primerno za prevoz občutljivega blaga. Na voljo okrog 10 kubikov prostora.",
        image: null,
        contact: {
            name: "Simon Gregorič",
            email: "simon.gregoric@logistika.si",
            phone: "+386 40 123 789"
        }
    },
    {
        id: 13,
        type: "offering",
        fromCountry: "Slovenija",
        toCountry: "Češka",
        fromCity: "Maribor",
        toCity: "Praga",
        date: "2025-04-08",
        time: "04:30",
        formattedDate: "08.04.2025",
        formattedTime: "04:30 AM",
        displayDate: "08/04/2025",
        displayTime: "04:30 AM",
        vehicleType: "car",
        vehicleTypeDisplay: "Avto",
        vehicleDimensions: {
            length: 4.8,
            width: 1.9,
            height: 1.5
        },
        hasRefrigerator: false,
        description: "Potujem poslovno v Prago in lahko vzamem do 3 sopotnike ali manjšo prtljago (max 4 kovčki).",
        image: null,
        contact: {
            name: "Laura Gregorc",
            email: "laura.gregorc@gmail.com",
            phone: "+386 30 987 654"
        }
    },
    
    // DODATNE "Iščem prevoz" fure
    {
        id: 14,
        type: "looking",
        fromCountry: "Slovenija",
        toCountry: "Španija",
        fromCity: "Ljubljana",
        toCity: "Barcelona",
        date: "2025-05-01",
        time: "08:00",
        formattedDate: "01.05.2025",
        formattedTime: "08:00 AM",
        displayDate: "01/05/2025",
        displayTime: "08:00 AM",
        vehicleType: "truck",
        vehicleTypeDisplay: "Tovornjak",
        vehicleDimensions: {
            length: 4.0,
            width: 2.2,
            height: 2.0
        },
        hasRefrigerator: false,
        description: "Potrebujem prevoz za umetniške instalacije na razstavo v Barceloni. Skupna teža približno 600kg, dimenzije variabilne.",
        image: null,
        contact: {
            name: "Maja Kos",
            email: "maja.kos@art.si",
            phone: "+386 51 456 789"
        }
    },
    {
        id: 15,
        type: "looking",
        fromCountry: "Slovenija",
        toCountry: "Poljska",
        fromCity: "Velenje",
        toCity: "Varšava",
        date: "2025-04-20",
        time: "14:00",
        formattedDate: "20.04.2025",
        formattedTime: "14:00 PM",
        displayDate: "20/04/2025",
        displayTime: "02:00 PM",
        vehicleType: "van",
        vehicleTypeDisplay: "Kombi",
        vehicleDimensions: {
            length: 3.0,
            width: 1.8,
            height: 1.7
        },
        hasRefrigerator: false,
        description: "Potrebujem prevoz elektronske opreme (5 zapakitanih računalnikov in monitorjev) na sejem v Varšavo.",
        image: null,
        contact: {
            name: "Rok Novak",
            email: "rok.novak@techco.si",
            phone: "+386 40 111 222"
        }
    },
    {
        id: 16,
        type: "looking",
        fromCountry: "Slovenija",
        toCountry: "Grčija",
        fromCity: "Koper",
        toCity: "Atene",
        date: "2025-06-15",
        time: "10:30",
        formattedDate: "15.06.2025",
        formattedTime: "10:30 AM",
        displayDate: "15/06/2025",
        displayTime: "10:30 AM",
        vehicleType: "any",
        vehicleTypeDisplay: "Poljubno vozilo",
        vehicleDimensions: {
            length: 0.5,
            width: 0.5,
            height: 0.5
        },
        hasRefrigerator: true,
        description: "Potrebujem prevoz specialnega medicinskega materiala, ki zahteva hladilnik. Majhna škatla (50x50x50cm), ampak nujno potrebuje konstantno hlajenje.",
        image: null,
        contact: {
            name: "Dr. Jana Mlakar",
            email: "jana.mlakar@bolnica.si",
            phone: "+386 31 444 555"
        }
    }
];

// Function to get all rides
function getAllRides() {
    return rides;
}

// Function to get rides by type
function getRidesByType(type) {
    return rides.filter(ride => ride.type === type);
}

// Function to get rides by ID
function getRideById(id) {
    return rides.find(ride => ride.id === parseInt(id));
}

// Funkcija za pretragu fura sa filterima
function searchRides(filters) {
    let results = [...rides];
    
    // Filter by type if specified
    if (filters.rideType && filters.rideType !== 'all') {
        results = results.filter(ride => ride.type === filters.rideType);
    }
    
    // Filter by countries
    if (filters.fromCountry) {
        results = results.filter(ride => 
            ride.fromCountry.toLowerCase().includes(filters.fromCountry.toLowerCase()));
    }
    
    if (filters.toCountry) {
        results = results.filter(ride => 
            ride.toCountry.toLowerCase().includes(filters.toCountry.toLowerCase()));
    }
    
    // Filter by cities
    if (filters.fromCity) {
        results = results.filter(ride => 
            ride.fromCity.toLowerCase().includes(filters.fromCity.toLowerCase()));
    }
    
    if (filters.toCity) {
        results = results.filter(ride => 
            ride.toCity.toLowerCase().includes(filters.toCity.toLowerCase()));
    }
    
    // Filter by date if specified
    if (filters.date) {
        const dateTimeInfo = parseSearchDateTime(filters.date);
        
        if (dateTimeInfo) {
            results = results.filter(ride => {
                // Match the date part first
                if (ride.date !== dateTimeInfo.date) {
                    return false;
                }
                
                // If time is provided, check time as well
                if (dateTimeInfo.time) {
                    // Convert both times to minutes for comparison
                    const rideTimeMinutes = convertTimeToMinutes(ride.time);
                    const searchTimeMinutes = convertTimeToMinutes(dateTimeInfo.time);
                    
                    // Consider a match if within 30 minutes (or adjust tolerance as needed)
                    return Math.abs(rideTimeMinutes - searchTimeMinutes) <= 30;
                }
                
                // If no time provided, any time on the matching date is fine
                return true;
            });
        }
    }
    
    // Filter by vehicle type if specified
    if (filters.vehicleType) {
        results = results.filter(ride => 
            ride.vehicleType === filters.vehicleType || ride.vehicleType === 'any');
    }
    
    // Filter by refrigeration if required
    if (filters.refrigerated) {
        results = results.filter(ride => ride.hasRefrigerator);
    }
    
    return results;
}

// Helper function to parse search date and time
// Helper function to parse search date and time
function parseSearchDateTime(searchDateText) {
    if (!searchDateText) return null;
    
    console.log('Parsing date text:', searchDateText);
    
    let date, time;
    
    // Handle different formats
    if (searchDateText.includes(' ob ')) {
        // Format with "ob": "DD.MM.YYYY ob HH:MM"
        const parts = searchDateText.split(' ob ');
        const dateParts = parts[0].split('.');
        
        if (dateParts.length !== 3) return null;
        
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        
        date = `${year}-${month}-${day}`;
        time = parts[1];
    } else if (searchDateText.includes(' ')) {
        // Format with space: "DD.MM.YYYY HH:MM"
        const parts = searchDateText.split(' ');
        const dateParts = parts[0].split('.');
        
        if (dateParts.length !== 3) {
            // Try with slash format: "DD/MM/YYYY HH:MM"
            const slashParts = parts[0].split('/');
            if (slashParts.length === 3) {
                const day = slashParts[0].padStart(2, '0');
                const month = slashParts[1].padStart(2, '0');
                const year = slashParts[2];
                
                date = `${year}-${month}-${day}`;
                time = parts[1];
            } else {
                return null;
            }
        } else {
            const day = dateParts[0].padStart(2, '0');
            const month = dateParts[1].padStart(2, '0');
            const year = dateParts[2];
            
            date = `${year}-${month}-${day}`;
            time = parts[1];
        }
    } else {
        // Format without time: "DD.MM.YYYY" or "DD/MM/YYYY"
        let dateParts;
        
        if (searchDateText.includes('.')) {
            dateParts = searchDateText.split('.');
        } else if (searchDateText.includes('/')) {
            dateParts = searchDateText.split('/');
        } else {
            return null;
        }
        
        if (dateParts.length !== 3) return null;
        
        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');
        const year = dateParts[2];
        
        date = `${year}-${month}-${day}`;
        time = null;
    }
    
    console.log('Parsed date and time:', { date, time });
    return { date, time };
}

// Helper function to convert HH:MM time to minutes for easy comparison
function convertTimeToMinutes(timeStr) {
    if (!timeStr) return 0;
    
    const timeParts = timeStr.split(':');
    if (timeParts.length !== 2) return 0;
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    
    return hours * 60 + minutes;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        getAllRides,
        getRidesByType,
        getRideById,
        searchRides
    };
}