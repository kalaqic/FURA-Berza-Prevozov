/**
 * Firestore rides database functionality for FURA website
 * Replaces the mock database with Firestore integration
 */

// Initialize the rides collection reference
const ridesCollection = window.db.collection('rides');

// Get all rides from Firestore
async function getAllRides() {
  try {
    const snapshot = await ridesCollection.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting rides from Firestore:', error);
    return [];
  }
}

// Get rides by type from Firestore
async function getRidesByType(type) {
  try {
    const snapshot = await ridesCollection.where('type', '==', type).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting ${type} rides from Firestore:`, error);
    return [];
  }
}

// Get a single ride by ID from Firestore
async function getRideById(id) {
  try {
    const doc = await ridesCollection.doc(id).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      };
    } else {
      console.log('No ride found with ID:', id);
      return null;
    }
  } catch (error) {
    console.error('Error getting ride from Firestore:', error);
    return null;
  }
}

// Create a new ride in Firestore
async function createRide(rideData) {
  try {
    // Add creation date and user info
    const userData = firebase.auth().currentUser;
    
    const rideWithMetadata = {
      ...rideData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userData.uid,
      userEmail: userData.email
    };
    
    const docRef = await ridesCollection.add(rideWithMetadata);
    return {
      success: true,
      id: docRef.id,
      message: 'Ride created successfully'
    };
  } catch (error) {
    console.error('Error creating ride in Firestore:', error);
    return {
      success: false,
      message: error.message || 'Error creating ride'
    };
  }
}

// Update a ride in Firestore
async function updateRide(id, rideData) {
  try {
    // Add update timestamp
    const rideWithMetadata = {
      ...rideData,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    await ridesCollection.doc(id).update(rideWithMetadata);
    return {
      success: true,
      message: 'Ride updated successfully'
    };
  } catch (error) {
    console.error('Error updating ride in Firestore:', error);
    return {
      success: false,
      message: error.message || 'Error updating ride'
    };
  }
}

// Delete a ride from Firestore
async function deleteRide(id) {
  try {
    await ridesCollection.doc(id).delete();
    return {
      success: true,
      message: 'Ride deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting ride from Firestore:', error);
    return {
      success: false,
      message: error.message || 'Error deleting ride'
    };
  }
}

// Search rides with filters
async function searchRides(filters) {
  try {
    let query = ridesCollection;
    
    // Apply filters
    if (filters.rideType && filters.rideType !== 'all') {
      query = query.where('type', '==', filters.rideType);
    }
    
    if (filters.fromCountry) {
      query = query.where('fromCountry', '==', filters.fromCountry);
    }
    
    if (filters.toCountry) {
      query = query.where('toCountry', '==', filters.toCountry);
    }
    
    if (filters.fromCity) {
      query = query.where('fromCity', '==', filters.fromCity);
    }
    
    if (filters.toCity) {
      query = query.where('toCity', '==', filters.toCity);
    }
    
    // For date filtering, we need to do this in memory since Firestore
    // doesn't allow complex queries on multiple fields
    const snapshot = await query.get();
    let results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Additional filtering for more complex conditions
    if (filters.date) {
      const dateTimeInfo = parseSearchDateTime(filters.date);
      
      if (dateTimeInfo) {
        results = results.filter(ride => {
          // Match the date part
          if (ride.date !== dateTimeInfo.date) {
            return false;
          }
          
          // If time is provided, check time as well
          if (dateTimeInfo.time) {
            const rideTimeMinutes = convertTimeToMinutes(ride.time);
            const searchTimeMinutes = convertTimeToMinutes(dateTimeInfo.time);
            
            // Consider a match if within 30 minutes
            return Math.abs(rideTimeMinutes - searchTimeMinutes) <= 30;
          }
          
          // If no time provided, any time on the matching date is fine
          return true;
        });
      }
    }
    
    if (filters.vehicleType) {
      results = results.filter(ride => 
        ride.vehicleType === filters.vehicleType || ride.vehicleType === 'any');
    }
    
    if (filters.vehicleSize) {
      results = results.filter(ride => ride.vehicleSize === filters.vehicleSize);
    }
    
    if (filters.refrigerated) {
      results = results.filter(ride => ride.hasRefrigerator);
    }
    
    return results;
  } catch (error) {
    console.error('Error searching rides in Firestore:', error);
    return [];
  }
}

// Helper function to parse search date and time (same as in original database.js)
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

// Helper function to convert HH:MM time to minutes (same as in original database.js)
function convertTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  
  const timeParts = timeStr.split(':');
  if (timeParts.length !== 2) return 0;
  
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  
  return hours * 60 + minutes;
}

// Initialize the database with sample data if empty (for testing purposes)
async function initializeDatabase() {
  try {
    const snapshot = await ridesCollection.limit(1).get();
    
    if (snapshot.empty) {
      console.log('Rides collection is empty, initializing with sample data');
      
      // Import sample rides from database.js if it exists
      if (typeof rides !== 'undefined') {
        const batch = firebase.firestore().batch();
        
        rides.forEach(ride => {
          const newRideRef = ridesCollection.doc();
          batch.set(newRideRef, {
            ...ride,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
        
        await batch.commit();
        console.log('Sample rides imported to Firestore');
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call initialization on script load
document.addEventListener('DOMContentLoaded', async function() {
  if (firebase.auth().currentUser) {
    await initializeDatabase();
  } else {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        await initializeDatabase();
      }
    });
  }
});

// Make functions globally available
window.getAllRides = getAllRides;
window.getRidesByType = getRidesByType;
window.getRideById = getRideById;
window.createRide = createRide;
window.updateRide = updateRide;
window.deleteRide = deleteRide;
window.searchRides = searchRides;