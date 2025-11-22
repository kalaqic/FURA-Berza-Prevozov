/**
 * Translation system for FURA website
 * Supports Slovenian (sl), English (en), and Serbian (sr)
 */

// Translation data
const translations = {
  sl: {
    // Header
    login: "Prijavi se",
    register: "Registracija",
    logout: "Odjavi se",
    profile: "Moj profil",
    profilePageTitle: "FURA - Moj profil",
    myProfile: "Moj profil",
    personalData: "Osebni podatki",
    loadingUser: "Spoznavanje uporabnika...",
    enterFirstName: "Vnesite ime",
    enterLastName: "Vnesite priimek",
    enterEmail: "Vnesite email",
    enterUsername: "Vnesite uporabniško ime",
    saveChanges: "Shrani spremembe",
    myRides: "Moje fure",
    loadingRides: "Nalaganje vaših fur...",
    loginRequiredProfile: "Za dostop do profila se morate prijaviti.",
    noPublishedRides: "Nimate še objavljenih fur.",
    createRide: "Vpisi svojo furo",
    createRidePageTitle: "FURA - Vpisi svoj prevoz",
    createRideTitle: "Vpisi svoj prevoz",
    backToSearch: "Nazaj na iskanje",
    backToProfile: "Nazaj na profil",
    fromCountry: "Iz države",
    toCountry: "V državo",
    fromCity: "Iz mesta",
    toCity: "V mesto",
    enterVehicleType: "Vnesite vrsto vozila",
    vehicleDimensions: "Dimenzije vozila",
    vehicleHasRefrigerator: "Vozilo ima hladilnik",
    transportPrice: "Cena prevoza",
    amount: "Znesek",
    currency: "Valuta",
    enterAmount: "Vnesite znesek",
    enterAdditionalInfo: "Vnesite dodatne informacije o prevozu",
    publishRide: "Objavi prevoz",
    customVehicle: "Drugo...",
    vlačilec: "Vlačilec",
    
    // Search Panel
    searchTitle: "Isci/Nudi Prevoz",
    allRides: "Vse fure",
    lookingForRide: "Iščem prevoz",
    offeringRide: "Nudim prevoz",
    from: "Iz",
    to: "V",
    country: "Država",
    city: "Mesto",
    selectCountry: "Izberi državo",
    selectCity: "Izberi mesto",
    enterPhoneNumber: "Vnesite telefonsko številko",
    date: "Datum",
    dateTime: "Datum in ura",
    dateOnly: "Brez ure",
    searchRide: "Poišči prevoz",
    resetFilters: "Ponastavi filtre",
    advancedSearch: "Napredno iskanje",
    
    // Advanced Search
    vehicleType: "Prevozno sredstvo",
    allVehicleTypes: "Vse vrste vozil",
    dimensions: "Dimenzije",
    allDimensions: "Vse dimenzije",
    smallVehicle: "Majhno vozilo",
    mediumVehicle: "Srednje vozilo",
    largeVehicle: "Veliko vozilo",
    refrigeratedOnly: "Samo vozila s hladilnikom",
    
    // Results
    showingRides: "Prikazujem",
    rides: "prevozov",
    exactMatches: "točnih",
    approximateMatches: "približnih",
    nearbyMatches: "bližnjih",
    noRidesFound: "Ni najdenih prevozov z izbranimi filtri.",
    noResults: "Ni najdenih prevozov za to smer.",
    noResultsSuggestion: "Poskusite z drugačnimi filtri ali preverite kasneje.",
    nearbyResultsHeader: "Prevoze v bližini ({count}) - od/do mest blizu {fromCity} ali {toCity}:",
    distanceTooltip: "{distance}km od iskane lokacije {searchCity}",
    searchValidationMessage: "Prosimo izberite mest 'Od' in 'Do' za iskanje prevoza.",
    searchValidationTooltip: "Izberi mesta za iskanje prevoza",
    
    // Table Headers
    fromLocation: "OD",
    toLocation: "DO",
    date: "DATUM",
    time: "URA",
    vehicle: "VRSTA VOZILA",
    rideType: "TIP FURE",
    
    // Ride Types
    offeringTransport: "Nudim prevoz",
    lookingForTransport: "Iščem prevoz",
    flexible: "Prilagodljivo",
    
    // Modal - Login
    loginTitle: "Prijava",
    emailOrUsername: "Email ali uporabniško ime",
    password: "Geslo",
    loginButton: "Prijava",
    noAccount: "Nimate računa?",
    registerLink: "Registrirajte se",
    
    // Modal - Register
    registerTitle: "Registracija",
    firstName: "Ime",
    lastName: "Priimek",
    email: "Email",
    username: "Uporabniško ime",
    phone: "Telefon",
    confirmPassword: "Potrdite geslo",
    registerButton: "Registracija",
    haveAccount: "Že imate račun?",
    loginLink: "Prijavite se",
    
    // Email Verification
    emailVerificationTitle: "Potrditev e-poštnega naslova",
    verificationCodeSent: "Poslali smo vam potrditveno kodo na",
    enterVerificationCode: "Vnesite 6-mestno kodo spodaj za dokončanje registracije.",
    verificationCode: "Potrditvena koda:",
    verifyEmail: "Potrdi e-pošto",
    resendCode: "Pošlji novo kodo",
    wrongEmail: "Napačen e-poštni naslov?",
    codeValid15Min: "Koda je veljavna 15 minut.",
    checkSpamFolder: "Če niste prejeli e-pošte, preverite mapo \"Nezaželena pošta\" ali zahtevajte novo kodo.",
    
    // Change Email
    changeEmailTitle: "Sprememba e-poštnega naslova",
    enterNewEmail: "Vnesite nov e-poštni naslov za prejemanje potrditvene kode:",
    confirmChange: "Potrdi spremembo",
    cancel: "Prekliči",
    
    // Ride Details
    rideDetailsTitle: "Informacije o prevozu",
    rideTypeLabel: "Vrsta prevoza",
    departure: "Odhod",
    destination: "Destinacija",
    dateAndTime: "Datum in ura",
    vehicleInfo: "Vozilo",
    refrigerator: "Hladilnik",
    description: "Opis",
    price: "Cena",
    contact: "Kontakt",
    close: "Zapri",
    editRide: "Uredi furo",
    deleteRide: "Izbriši furo",
    contactOwner: "Kontaktiraj",
    myRide: "Moja fura",
    yes: "Da",
    no: "Ne",
    free: "Besplatno",
    negotiable: "Po dogovoru",
    fixedPrice: "Fiksna cena",
    at: "ob",
    noDescription: "Ni opisa",
    noData: "Ni podatka",
    notAvailable: "Ni na voljo",
    confirmDeleteRide: "Ali ste prepričani, da želite izbrisati to furo?",
    contactingOwner: "Kontaktiranje lastnika fure...",
    
    // Messages
    loginRequired: "Za ogled podrobnosti se morate prijaviti.",
    loginSuccessful: "Uspešna prijava!",
    logoutSuccessful: "Uspešno ste se odjavili.",
    registrationSuccessful: "Registracija uspešna! Preverite e-pošto za potrditveno kodo.",
    emailVerified: "E-poštni naslov je uspešno potrjen! Dobrodošli na FURA!",
    emailUpdated: "E-poštni naslov je bil uspešno posodobljen. Nova potrditvena koda je bila poslana.",
    newCodeSent: "Nova potrditvena koda je bila poslana na vaš e-poštni naslov.",
    rideDeleted: "Fura uspešno izbrisana!",
    errorDeletingRide: "Napaka pri brisanju fure",
    noExactRidesFound: "Nismo našli točnih prevozov za vašo pot. Prikazujemo približne prevoze v bližini.",
    maxDistance: "Največ km stran",
    timeTolerance: "Toleranca ure",
    
    // Vehicle Types
    avtotransporter: "Avtotransporter",
    avtovleka: "Avtovleka", 
    furgon: "Furgon",
    kombi: "Kombi",
    vlačilec: "Vlačilec",
    truck: "Tovornjak",
    van: "Kombi/Van",
    car: "Avto",
    "car-transporter": "Avtotransporter", 
    "car-tow": "Avtovleka",
    any: "Poljubno vozilo",
    custom: "Drugo",
    other: "Drugo",
    // Add actual database display values as keys
    avto: "Avto",
    tovornjak: "Tovornjak", 
    kamion: "Kamion",
    "poljubno vozilo": "Poljubno vozilo",
    
    // Country Names
    slovenija: "Slovenija",
    hrvatska: "Hrvatska",
    srbija: "Srbija",
    bosna_i_hercegovina: "Bosna in Hercegovina",
    albanija: "Albanija",
    avstrija: "Avstrija",
    belgija: "Belgija",
    bolgarija: "Bolgarija",
    češka: "Češka",
    črna_gora: "Črna gora",
    danska: "Danska",
    estonija: "Estonija",
    finska: "Finska",
    francija: "Francija",
    grčija: "Grčija",
    irska: "Irska",
    italija: "Italija",
    latvija: "Latvija",
    litva: "Litva",
    luksemburg: "Luksemburg",
    madžarska: "Madžarska",
    malta: "Malta",
    nemčija: "Nemčija",
    nizozemska: "Nizozemska",
    poljska: "Poljska",
    portugalska: "Portugalska",
    romunija: "Romunija",
    severna_makedonija: "Severna Makedonija",
    slovaška: "Slovaška",
    španija: "Španija",
    švedska: "Švedska",
    švica: "Švica",
    ukrajina: "Ukrajina",
    združeno_kraljestvo: "Združeno kraljestvo",
    
    // Footer
    footerDescription: "Platforma za iskanje in nudenje prevozov po Sloveniji in sosednjih državah.",
    legalTitle: "Pravne informacije",
    privacyPolicy: "Pravilnik o zasebnosti",
    termsConditions: "Splošni pogoji",
    about: "O nas",
    contact: "Kontakt",
    supportTitle: "Podpora",
    help: "Pomoč",
    faq: "Pogosta vprašanja",
    contactUs: "Kontaktirajte nas",
    followUs: "Sledite nam",
    allRightsReserved: "Vse pravice pridržane.",
    backToHome: "Nazaj na domačo",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Pravilnik o zasebnosti",
    lastUpdated: "Nazadnje posodobljeno: 1. december 2024",
    introductionTitle: "1. Uvod",
    introductionText: "FURA (\"mi\", \"nas\", \"naš\") spoštuje vašo zasebnost in je zavezana k zaščiti vaših osebnih podatkov. Ta pravilnik o zasebnosti vas obvešča o tem, kako zbiramo, uporabljamo in varovamo vaše podatke, ko uporabljate našo platformo za iskanje in nudenje prevozov.",
    dataCollectionTitle: "2. Katere podatke zbiramo",
    registrationDataTitle: "2.1 Podatki ob registraciji",
    registrationDataItem1: "Ime in priimek",
    registrationDataItem2: "E-poštni naslov",
    registrationDataItem3: "Uporabniško ime",
    registrationDataItem4: "Telefonska številka",
    registrationDataItem5: "Geslo (šifrirano)",
    rideDataTitle: "2.2 Podatki o prevozih",
    rideDataItem1: "Lokacije odhoda in prihoda",
    rideDataItem2: "Datum in čas prevoza",
    rideDataItem3: "Informacije o vozilu (tip, dimenzije)",
    rideDataItem4: "Opis prevoza",
    rideDataItem5: "Cenovne informacije",
    dataUsageTitle: "3. Kako uporabljamo vaše podatke",
    dataUsageItem1: "Za omogočanje registracije in prijave v sistem",
    dataUsageItem2: "Za objavljanje in iskanje prevozov",
    dataUsageItem3: "Za komunikacijo med uporabniki glede prevozov",
    dataUsageItem4: "Za varnost in zaščito platforme",
    dataUsageItem5: "Za izboljšanje naših storitev",
    dataUsageItem6: "Za pošiljanje verifikacijskih e-poštnih sporočil",
    dataSharingTitle: "4. Deljenje podatkov",
    dataSharingText: "Ne prodajamo vaših podatkov tretjim osebam. Vaši podatki se delijo samo:",
    dataSharingItem1: "Z drugimi uporabniki, ko objavite prevoz (ime, telefon, e-pošta za komunikacijo)",
    dataSharingItem2: "S ponudniki storitev, ki nam pomagajo delovati (npr. Firebase, EmailJS)",
    dataSharingItem3: "Ko to zahteva zakonodaja",
    dataSecurityTitle: "5. Varnost podatkov",
    dataSecurityText: "Uporabljamo Firebase za varno shranjevanje podatkov z naslednjimi varnostnimi ukrepi:",
    dataSecurityItem1: "Šifriranje podatkov med prenosom (HTTPS)",
    dataSecurityItem2: "Šifriranje gesell",
    dataSecurityItem3: "Varnostna pravila Firebase",
    dataSecurityItem4: "Redne varnostne posodobitve",
    userRightsTitle: "6. Vaše pravice",
    userRightsText: "Imate pravico do:",
    userRightsItem1: "Dostopa do svojih podatkov",
    userRightsItem2: "Popravka netočnih podatkov",
    userRightsItem3: "Brisanja svojega računa in podatkov",
    userRightsItem4: "Prenosa podatkov",
    userRightsItem5: "Ugovora obdelavi podatkov",
    cookiesTitle: "7. Piškotki",
    cookiesText: "Uporabljamo lokalno shranjevanje (localStorage) za:",
    cookiesItem1: "Shranjevanje jezikovnih nastavitev",
    cookiesItem2: "Začasno shranjevanje podatkov za verifikacijo e-pošte",
    cookiesItem3: "Izboljšanje uporabniške izkušnje",
    dataRetentionTitle: "8. Hramber podatkov",
    dataRetentionText: "Vaše podatke hranimo, dokler je vaš račun aktiven. Po brisanju računa so podatki trajno odstranjeni v 30 dneh.",
    contactTitle: "9. Kontakt",
    contactText: "Za vprašanja o zasebnosti nas kontaktirajte na:",
    changesTitle: "10. Spremembe pravilnika",
    changesText: "Pridržujemo si pravico do posodobitve tega pravilnika. O spremembah vas bomo obvestili preko e-pošte ali na platformi.",
    
    // Terms and Conditions Page
    termsConditionsTitle: "Splošni pogoji uporabe",
    acceptanceTitle: "1. Sprejem pogojev",
    acceptanceText: "Z uporabo platforme FURA se strinjate s temi splošnimi pogoji uporabe. Če se ne strinjate s pogoji, platforme ne smete uporabljati.",
    serviceDescriptionTitle: "2. Opis storitve",
    serviceDescriptionText: "FURA je platforma, ki omogoča uporabnikom objavljanje in iskanje prevozov. Platforma deluje kot posrednik med uporabniki in ne izvaja prevoznih storitev.",
    userObligationsTitle: "3. Obveznosti uporabnikov",
    registrationObligationsTitle: "3.1 Registracija",
    registrationObligation1: "Zagotoviti morate točne in resnične podatke",
    registrationObligation2: "Obvezni ste ohraniti varnost svojega gesla",
    registrationObligation3: "Za uporabo računa je odgovorna samo registrirana oseba",
    registrationObligation4: "Obvezni ste potrditi svoj e-poštni naslov",
    behaviorObligationsTitle: "3.2 Vedenje na platformi",
    behaviorObligation1: "Spoštovati morate druge uporabnike",
    behaviorObligation2: "Prepovedano je objavljanje lažnih oglasov",
    behaviorObligation3: "Prepovedana je uporaba žaljivega jezika",
    behaviorObligation4: "Spoštovati morate dogovorjene termine",
    ridePostingTitle: "4. Objavljanje prevozov",
    ridePosting1: "Podatki o prevozu morajo biti točni",
    ridePosting2: "Cene morajo biti jasno navedene",
    ridePosting3: "Kontaktni podatki morajo biti pravilni",
    ridePosting4: "Prepovedano je diskriminatorno ravnanje",
    ridePosting5: "Ohranjamo si pravico odstraniti neprimerne objave",
    safetyTitle: "5. Varnost",
    safetyText: "Uporabniki so odgovorni za lastno varnost. FURA priporoča:",
    safety1: "Preverite voznika/sopotnika pred vožnjo",
    safety2: "Delite informacije o vožnji z zaupanja vredno osebo",
    safety3: "Zaupajte svojim občutkom",
    safety4: "V sili pokličite policijo (113)",
    paymentsTitle: "6. Plačila",
    paymentsText: "FURA ne obravnava plačil med uporabniki. Vsa plačila se izvajajo neposredno med uporabniki.",
    liabilityTitle: "7. Omejitev odgovornosti",
    liabilityText: "FURA ne prevzema odgovornosti za:",
    liability1: "Škodo nastalo med prevozom",
    liability2: "Vedenje drugih uporabnikov",
    liability3: "Točnost objavljenih podatkov",
    liability4: "Tehnične motnje platforme",
    liability5: "Spore med uporabniki",
    prohibitedTitle: "8. Prepovedana uporaba",
    prohibitedText: "Prepovedano je:",
    prohibited1: "Komercialna uporaba brez dovoljenja",
    prohibited2: "Zloraba osebnih podatkov drugih uporabnikov",
    prohibited3: "Objavljanje nezakonitih vsebin",
    prohibited4: "Motenje delovanja platforme",
    prohibited5: "Ustvarjanje lažnih računov",
    moderationTitle: "9. Moderiranje",
    moderationText: "FURA si pridržuje pravico:",
    moderation1: "Odstraniti neprimerne objave",
    moderation2: "Začasno ali trajno blokirati uporabnike",
    moderation3: "Spremljati aktivnost na platformi",
    moderation4: "Sporočiti nezakonito vedenje pristojnim organom",
    intellectualPropertyTitle: "10. Intelektualna lastnina",
    intellectualPropertyText: "Vsa vsebina platforme FURA je zaščitena z avtorskimi pravicami. Uporabniki zagotavljajo, da imajo pravico do vsebine, ki jo objavljajo.",
    terminationTitle: "11. Prenehanje uporabe",
    terminationText: "Svoj račun lahko kadarkoli izbrišete v nastavitvah profila. FURA si pridržuje pravico prekiniti dostop uporabnikom, ki kršijo te pogoje.",
    disputesTitle: "12. Reševanje sporov",
    disputesText: "Spori se rešujejo po slovenskem pravu. Pristojna so slovenska sodišča. Priporočujemo, da poskusite spore rešiti sporazumno.",
    contactTermsTitle: "13. Kontakt",
    contactTermsText: "Za vprašanja o pogojih uporabe nas kontaktirajte na:",
    changesTermsTitle: "14. Spremembe pogojev",
    changesTermsText: "FURA si pridržuje pravico spremeniti te pogoje. O pomembnih spremembah vas bomo obvestili vnaprej.",
    
    // About Page
    aboutTitle: "O nas",
    missionTitle: "1. Naša misija",
    missionText: "FURA je platforma, ki povezuje ljudi z namenom omogočanja cenovno dostopnih, zanesljivih in varnih prevozov. Naš cilj je ustvariti skupnost uporabnikov, ki si delijo stroške prevoza in zmanjšujejo okoljski vpliv prometa.",
    howItWorksTitle: "2. Kako deluje",
    howItWorksText: "FURA omogoča dvoje:",
    howItWorks1: "Uporabniki lahko objavijo, da iščejo prevoz do določene destinacije",
    howItWorks2: "Vozniki lahko objavijo, da nudijo prevoz na določeni relaciji",
    howItWorks3: "Platforma avtomatsko prikaže najboljše ujemanja na podlagi lokacije in časa",
    howItWorks4: "Uporabniki se lahko kontaktirajo in dogovorijo za skupni prevoz",
    featuresTitle: "3. Funkcionalnosti",
    searchFeaturesTitle: "3.1 Napredni iskalni sistem",
    searchFeature1: "Iskanje po lokaciji z avtomatskim predlaganjem mest",
    searchFeature2: "Filtriranje po datumu in času",
    searchFeature3: "Dodatni filtri (tip vozila, dimenzije, hladilnik)",
    searchFeature4: "Prikaz približnih ujemanj z manjšimi odstopanji",
    userFeaturesTitle: "3.2 Upravljanje uporabnikov",
    userFeature1: "Varna registracija z verifikacijo e-pošte",
    userFeature2: "Profili uporabnikov z osnovnimi informacijami",
    userFeature3: "Zgodovina objavljenih prevozov",
    userFeature4: "Enostavno urejanje profilov",
    techFeaturesTitle: "3.3 Tehnične značilnosti",
    techFeature1: "Večjezična podpora (slovenščina, angleščina, srbščina)",
    techFeature2: "Odzivna zasnova za vse naprave",
    techFeature3: "Realno-časovni podatki z Firebase tehnologijo",
    techFeature4: "Varno shranjevanje podatkov",
    visionTitle: "4. Naša vizija",
    visionText: "Želimo postati vodilna platforma za iskanje prevozov v Sloveniji in sosednjih državah. Naš cilj je:",
    vision1: "Zmanjšati stroške prevoza za vse uporabnike",
    vision2: "Prispevati k zmanjšanju prometa in emisij CO2",
    vision3: "Ustvariti zaupanja vredno skupnost uporabnikov",
    vision4: "Neprestano izboljševati uporabniško izkušnjo",
    safetyCommitmentTitle: "5. Zaveza varnosti",
    safetyCommitmentText: "Varnost naših uporabnikov je naša prednostna naloga:",
    safetyCommitment1: "Vsi uporabniki morajo biti registrirani z verificirano e-pošto",
    safetyCommitment2: "Spodbujamo uporabnike k preverjanju voznikov/sopotnikov",
    safetyCommitment3: "Zagotavljamo jasne smernice za varen prevoz",
    safetyCommitment4: "Omogočamo prijavo neprimernega vedenja",
    communityTitle: "6. Skupnost",
    communityText: "FURA ni le tehnična platforma, ampak skupnost ljudi, ki:",
    community1: "Si delijo stroške in zmanjšujejo okoljski vpliv",
    community2: "Spoštujejo drug drugega in vozila",
    community3: "Pomagajo pri ustvarjanju zaupanja vrednega okolja",
    community4: "Prispevajo k boljši prihodnosti prometa",
    contactAboutTitle: "8. Kontakt",
    contactAboutText: "Želite izvedeti več ali potrebujete pomoč?",
    technicalSupport: "Tehnična podpora",
    businessInquiries: "Poslovna vprašanja"
  },
  
  en: {
    // Header
    login: "Sign In",
    register: "Register",
    logout: "Sign Out",
    profile: "My Profile",
    profilePageTitle: "FURA - My Profile",
    myProfile: "My Profile",
    personalData: "Personal Data",
    loadingUser: "Loading user...",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    enterEmail: "Enter email",
    enterUsername: "Enter username",
    saveChanges: "Save Changes",
    myRides: "My Rides",
    loadingRides: "Loading your rides...",
    loginRequiredProfile: "You must be logged in to access the profile.",
    noPublishedRides: "You have no published rides yet.",
    createRide: "Post Your Ride",
    createRidePageTitle: "FURA - Post Your Ride",
    createRideTitle: "Post Your Ride",
    backToSearch: "Back to Search",
    backToProfile: "Back to Profile",
    fromCountry: "From Country",
    toCountry: "To Country",
    fromCity: "From City",
    toCity: "To City",
    enterVehicleType: "Enter vehicle type",
    vehicleDimensions: "Vehicle Dimensions",
    vehicleHasRefrigerator: "Vehicle has refrigerator",
    transportPrice: "Transport Price",
    amount: "Amount",
    currency: "Currency",
    enterAmount: "Enter amount",
    enterAdditionalInfo: "Enter additional transport information",
    publishRide: "Publish Ride",
    customVehicle: "Other...",
    vlačilec: "Tractor",
    
    // Search Panel
    searchTitle: "Find/Offer Transport",
    allRides: "All Rides",
    lookingForRide: "Looking for Ride",
    offeringRide: "Offering Ride",
    from: "From",
    to: "To",
    country: "Country",
    city: "City",
    selectCountry: "Select Country",
    selectCity: "Select City",
    enterPhoneNumber: "Enter phone number",
    date: "Date",
    dateTime: "Date and Time",
    dateOnly: "No Time",
    searchRide: "Search Rides",
    resetFilters: "Reset Filters",
    advancedSearch: "Advanced Search",
    
    // Advanced Search
    vehicleType: "Vehicle Type",
    allVehicleTypes: "All Vehicle Types",
    dimensions: "Dimensions",
    allDimensions: "All Dimensions",
    smallVehicle: "Small Vehicle",
    mediumVehicle: "Medium Vehicle",
    largeVehicle: "Large Vehicle",
    refrigeratedOnly: "Refrigerated Vehicles Only",
    
    // Results
    showingRides: "Showing",
    rides: "rides",
    exactMatches: "exact",
    approximateMatches: "approximate",
    nearbyMatches: "nearby",
    noRidesFound: "No rides found with selected filters.",
    noResults: "No rides found for this direction.",
    noResultsSuggestion: "Try different filters or check back later.",
    nearbyResultsHeader: "Nearby rides ({count}) - from/to cities near {fromCity} or {toCity}:",
    distanceTooltip: "{distance}km from searched location {searchCity}",
    searchValidationMessage: "Please select both 'From' and 'To' cities to search for rides.",
    searchValidationTooltip: "Select cities to search for rides",
    
    // Table Headers
    fromLocation: "FROM",
    toLocation: "TO",
    date: "DATE",
    time: "TIME",
    vehicle: "VEHICLE TYPE",
    rideType: "RIDE TYPE",
    
    // Ride Types
    offeringTransport: "Offering Transport",
    lookingForTransport: "Looking for Transport",
    flexible: "Flexible",
    
    // Modal - Login
    loginTitle: "Sign In",
    emailOrUsername: "Email or Username",
    password: "Password",
    loginButton: "Sign In",
    noAccount: "Don't have an account?",
    registerLink: "Register here",
    
    // Modal - Register
    registerTitle: "Register",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    username: "Username",
    phone: "Phone",
    confirmPassword: "Confirm Password",
    registerButton: "Register",
    haveAccount: "Already have an account?",
    loginLink: "Sign in here",
    
    // Email Verification
    emailVerificationTitle: "Email Verification",
    verificationCodeSent: "We sent a verification code to",
    enterVerificationCode: "Enter the 6-digit code below to complete registration.",
    verificationCode: "Verification Code:",
    verifyEmail: "Verify Email",
    resendCode: "Send New Code",
    wrongEmail: "Wrong email?",
    codeValid15Min: "Code is valid for 15 minutes.",
    checkSpamFolder: "If you haven't received the email, check your spam folder or request a new code.",
    
    // Change Email
    changeEmailTitle: "Change Email Address",
    enterNewEmail: "Enter new email address to receive verification code:",
    confirmChange: "Confirm Change",
    cancel: "Cancel",
    
    // Ride Details
    rideDetailsTitle: "Ride Information",
    rideTypeLabel: "Ride Type",
    departure: "Departure",
    destination: "Destination",
    dateAndTime: "Date and Time",
    vehicleInfo: "Vehicle",
    refrigerator: "Refrigerator",
    description: "Description",
    price: "Price",
    contact: "Contact",
    close: "Close",
    editRide: "Edit Ride",
    deleteRide: "Delete Ride",
    contactOwner: "Contact Owner",
    myRide: "My Ride",
    yes: "Yes",
    no: "No",
    free: "Free",
    negotiable: "Negotiable",
    fixedPrice: "Fixed Price",
    at: "at",
    noDescription: "No description",
    noData: "No data",
    notAvailable: "Not available",
    confirmDeleteRide: "Are you sure you want to delete this ride?",
    contactingOwner: "Contacting ride owner...",
    
    // Messages
    loginRequired: "You must be logged in to view details.",
    loginSuccessful: "Login successful!",
    logoutSuccessful: "Successfully logged out.",
    registrationSuccessful: "Registration successful! Check your email for verification code.",
    emailVerified: "Email successfully verified! Welcome to FURA!",
    emailUpdated: "Email address successfully updated. New verification code has been sent.",
    newCodeSent: "New verification code has been sent to your email address.",
    rideDeleted: "Ride successfully deleted!",
    errorDeletingRide: "Error deleting ride",
    
    // Vehicle Types
    avtotransporter: "Car Transporter",
    avtovleka: "Tow Truck",
    furgon: "Van",
    kombi: "Minivan",
    vlačilec: "Tractor",
    truck: "Truck",
    van: "Van",
    car: "Car",
    "car-transporter": "Car Transporter",
    "car-tow": "Tow Truck", 
    any: "Other Vehicles",
    custom: "Custom",
    other: "Other",
    // Add actual database display values as keys
    avto: "Car",
    tovornjak: "Truck", 
    kamion: "Truck",
    "poljubno vozilo": "Other Vehicles",
    
    // Country Names
    slovenija: "Slovenia",
    hrvatska: "Croatia",
    srbija: "Serbia",
    bosna_i_hercegovina: "Bosnia and Herzegovina",
    albanija: "Albania",
    avstrija: "Austria",
    belgija: "Belgium",
    bolgarija: "Bulgaria",
    češka: "Czech Republic",
    črna_gora: "Montenegro",
    danska: "Denmark",
    estonija: "Estonia",
    finska: "Finland",
    francija: "France",
    grčija: "Greece",
    irska: "Ireland",
    italija: "Italy",
    latvija: "Latvia",
    litva: "Lithuania",
    luksemburg: "Luxembourg",
    madžarska: "Hungary",
    malta: "Malta",
    nemčija: "Germany",
    nizozemska: "Netherlands",
    poljska: "Poland",
    portugalska: "Portugal",
    romunija: "Romania",
    severna_makedonija: "North Macedonia",
    slovaška: "Slovakia",
    španija: "Spain",
    švedska: "Sweden",
    švica: "Switzerland",
    ukrajina: "Ukraine",
    združeno_kraljestvo: "United Kingdom",
    
    // Footer
    footerDescription: "Platform for finding and offering rides across Slovenia and neighboring countries.",
    legalTitle: "Legal Information",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    about: "About Us",
    contact: "Contact",
    supportTitle: "Support",
    help: "Help",
    faq: "FAQ",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    allRightsReserved: "All rights reserved.",
    backToHome: "Back to Home",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Privacy Policy",
    lastUpdated: "Last updated: December 1, 2024",
    introductionTitle: "1. Introduction",
    introductionText: "FURA (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting your personal data. This privacy policy informs you about how we collect, use and protect your data when you use our platform for finding and offering transport.",
    dataCollectionTitle: "2. What data we collect",
    registrationDataTitle: "2.1 Registration data",
    registrationDataItem1: "First and last name",
    registrationDataItem2: "Email address",
    registrationDataItem3: "Username",
    registrationDataItem4: "Phone number",
    registrationDataItem5: "Password (encrypted)",
    rideDataTitle: "2.2 Ride data",
    rideDataItem1: "Departure and arrival locations",
    rideDataItem2: "Date and time of transport",
    rideDataItem3: "Vehicle information (type, dimensions)",
    rideDataItem4: "Transport description",
    rideDataItem5: "Pricing information",
    dataUsageTitle: "3. How we use your data",
    dataUsageItem1: "To enable registration and login to the system",
    dataUsageItem2: "To post and search for rides",
    dataUsageItem3: "For communication between users regarding rides",
    dataUsageItem4: "For platform security and protection",
    dataUsageItem5: "To improve our services",
    dataUsageItem6: "To send verification emails",
    dataSharingTitle: "4. Data sharing",
    dataSharingText: "We do not sell your data to third parties. Your data is shared only:",
    dataSharingItem1: "With other users when you post a ride (name, phone, email for communication)",
    dataSharingItem2: "With service providers that help us operate (e.g. Firebase, EmailJS)",
    dataSharingItem3: "When required by law",
    dataSecurityTitle: "5. Data security",
    dataSecurityText: "We use Firebase for secure data storage with the following security measures:",
    dataSecurityItem1: "Data encryption in transit (HTTPS)",
    dataSecurityItem2: "Password encryption",
    dataSecurityItem3: "Firebase security rules",
    dataSecurityItem4: "Regular security updates",
    userRightsTitle: "6. Your rights",
    userRightsText: "You have the right to:",
    userRightsItem1: "Access your data",
    userRightsItem2: "Correct inaccurate data",
    userRightsItem3: "Delete your account and data",
    userRightsItem4: "Data portability",
    userRightsItem5: "Object to data processing",
    cookiesTitle: "7. Cookies",
    cookiesText: "We use local storage (localStorage) for:",
    cookiesItem1: "Storing language preferences",
    cookiesItem2: "Temporary storage of email verification data",
    cookiesItem3: "Improving user experience",
    dataRetentionTitle: "8. Data retention",
    dataRetentionText: "We retain your data while your account is active. After account deletion, data is permanently removed within 30 days.",
    contactTitle: "9. Contact",
    contactText: "For privacy questions, contact us at:",
    changesTitle: "10. Policy changes",
    changesText: "We reserve the right to update this policy. We will notify you of changes via email or on the platform.",
    
    // Terms and Conditions Page
    termsConditionsTitle: "Terms and Conditions of Use",
    acceptanceTitle: "1. Acceptance of Terms",
    acceptanceText: "By using the FURA platform, you agree to these terms and conditions of use. If you do not agree to the terms, you may not use the platform.",
    serviceDescriptionTitle: "2. Service Description",
    serviceDescriptionText: "FURA is a platform that enables users to post and search for rides. The platform operates as an intermediary between users and does not provide transport services.",
    userObligationsTitle: "3. User Obligations",
    registrationObligationsTitle: "3.1 Registration",
    registrationObligation1: "You must provide accurate and truthful information",
    registrationObligation2: "You are required to maintain the security of your password",
    registrationObligation3: "Only the registered person is responsible for account use",
    registrationObligation4: "You are required to verify your email address",
    behaviorObligationsTitle: "3.2 Platform behavior",
    behaviorObligation1: "You must respect other users",
    behaviorObligation2: "Posting false advertisements is prohibited",
    behaviorObligation3: "Use of offensive language is prohibited",
    behaviorObligation4: "You must respect agreed schedules",
    ridePostingTitle: "4. Posting rides",
    ridePosting1: "Ride information must be accurate",
    ridePosting2: "Prices must be clearly stated",
    ridePosting3: "Contact information must be correct",
    ridePosting4: "Discriminatory behavior is prohibited",
    ridePosting5: "We reserve the right to remove inappropriate posts",
    safetyTitle: "5. Safety",
    safetyText: "Users are responsible for their own safety. FURA recommends:",
    safety1: "Check driver/passenger before the ride",
    safety2: "Share ride information with a trusted person",
    safety3: "Trust your instincts",
    safety4: "In emergency, call police (emergency number)",
    paymentsTitle: "6. Payments",
    paymentsText: "FURA does not handle payments between users. All payments are made directly between users.",
    liabilityTitle: "7. Limitation of liability",
    liabilityText: "FURA assumes no responsibility for:",
    liability1: "Damage occurring during transport",
    liability2: "Behavior of other users",
    liability3: "Accuracy of posted information",
    liability4: "Technical platform malfunctions",
    liability5: "Disputes between users",
    prohibitedTitle: "8. Prohibited use",
    prohibitedText: "It is prohibited to:",
    prohibited1: "Commercial use without permission",
    prohibited2: "Misuse other users' personal data",
    prohibited3: "Post illegal content",
    prohibited4: "Disrupt platform operation",
    prohibited5: "Create fake accounts",
    moderationTitle: "9. Moderation",
    moderationText: "FURA reserves the right to:",
    moderation1: "Remove inappropriate posts",
    moderation2: "Temporarily or permanently block users",
    moderation3: "Monitor platform activity",
    moderation4: "Report illegal behavior to authorities",
    intellectualPropertyTitle: "10. Intellectual property",
    intellectualPropertyText: "All content on the FURA platform is protected by copyright. Users guarantee that they have the right to content they post.",
    terminationTitle: "11. Termination of use",
    terminationText: "You can delete your account at any time in profile settings. FURA reserves the right to terminate access for users who violate these terms.",
    disputesTitle: "12. Dispute resolution",
    disputesText: "Disputes are resolved under applicable law. We recommend trying to resolve disputes amicably.",
    contactTermsTitle: "13. Contact",
    contactTermsText: "For questions about terms of use, contact us at:",
    changesTermsTitle: "14. Changes to terms",
    changesTermsText: "FURA reserves the right to change these terms. We will notify you of important changes in advance.",
    
    // About Page
    aboutTitle: "About Us",
    missionTitle: "1. Our mission",
    missionText: "FURA is a platform that connects people with the purpose of enabling affordable, reliable and safe transport. Our goal is to create a community of users who share transport costs and reduce environmental impact.",
    howItWorksTitle: "2. How it works",
    howItWorksText: "FURA enables two things:",
    howItWorks1: "Users can post that they are looking for transport to a specific destination",
    howItWorks2: "Drivers can post that they are offering transport on a specific route",
    howItWorks3: "The platform automatically displays the best matches based on location and time",
    howItWorks4: "Users can contact each other and arrange shared transport",
    featuresTitle: "3. Features",
    searchFeaturesTitle: "3.1 Advanced search system",
    searchFeature1: "Location search with automatic city suggestions",
    searchFeature2: "Filtering by date and time",
    searchFeature3: "Additional filters (vehicle type, dimensions, refrigeration)",
    searchFeature4: "Display of approximate matches with minor deviations",
    userFeaturesTitle: "3.2 User management",
    userFeature1: "Secure registration with email verification",
    userFeature2: "User profiles with basic information",
    userFeature3: "History of posted rides",
    userFeature4: "Easy profile editing",
    techFeaturesTitle: "3.3 Technical features",
    techFeature1: "Multilingual support (Slovenian, English, Serbian)",
    techFeature2: "Responsive design for all devices",
    techFeature3: "Real-time data with Firebase technology",
    techFeature4: "Secure data storage",
    visionTitle: "4. Our vision",
    visionText: "We want to become the leading platform for finding rides in Slovenia and neighboring countries. Our goal is:",
    vision1: "Reduce transport costs for all users",
    vision2: "Contribute to reducing traffic and CO2 emissions",
    vision3: "Create a trustworthy user community",
    vision4: "Continuously improve user experience",
    safetyCommitmentTitle: "5. Safety commitment",
    safetyCommitmentText: "The safety of our users is our top priority:",
    safetyCommitment1: "All users must be registered with verified email",
    safetyCommitment2: "We encourage users to check drivers/passengers",
    safetyCommitment3: "We provide clear guidelines for safe transport",
    safetyCommitment4: "We enable reporting of inappropriate behavior",
    communityTitle: "6. Community",
    communityText: "FURA is not just a technical platform, but a community of people who:",
    community1: "Share costs and reduce environmental impact",
    community2: "Respect each other and vehicles",
    community3: "Help create a trustworthy environment",
    community4: "Contribute to a better future of transport",
    contactAboutTitle: "8. Contact",
    contactAboutText: "Want to learn more or need help?",
    technicalSupport: "Technical support",
    businessInquiries: "Business inquiries"
  },
  
  sr: {
    // Header
    login: "Пријави се",
    register: "Регистрација",
    logout: "Одјави се",
    profile: "Мој профил",
    profilePageTitle: "FURA - Мој профил",
    myProfile: "Мој профил",
    personalData: "Лични подаци",
    loadingUser: "Учитавам корисника...",
    enterFirstName: "Унесите име",
    enterLastName: "Унесите презиме",
    enterEmail: "Унесите емаил",
    enterUsername: "Унесите корисничко име",
    saveChanges: "Сачувај промене",
    myRides: "Моје вожње",
    loadingRides: "Учитавам ваше вожње...",
    loginRequiredProfile: "Морате бити пријављени да приступите профилу.",
    noPublishedRides: "Немате још објављених вожњи.",
    createRide: "Унеси своју вожњу",
    createRidePageTitle: "FURA - Унеси своју вожњу",
    createRideTitle: "Унеси своју вожњу",
    backToSearch: "Назад на претрагу",
    backToProfile: "Назад на профил",
    fromCountry: "Из земље",
    toCountry: "У земљу",
    fromCity: "Из града",
    toCity: "У град",
    enterVehicleType: "Унесите тип возила",
    vehicleDimensions: "Димензије возила",
    vehicleHasRefrigerator: "Возило има фрижидер",
    transportPrice: "Цена превоза",
    amount: "Износ",
    currency: "Валута",
    enterAmount: "Унесите износ",
    enterAdditionalInfo: "Унесите додатне информације о превозу",
    publishRide: "Објави вожњу",
    customVehicle: "Остало...",
    vlačilec: "Влачилац",
    
    // Search Panel
    searchTitle: "Тражи/Нуди Превоз",
    allRides: "Све вожње",
    lookingForRide: "Тражим превоз",
    offeringRide: "Нудим превоз",
    from: "Од",
    to: "До",
    country: "Земља",
    city: "Град",
    selectCountry: "Изабери земљу",
    selectCity: "Изабери град",
    enterPhoneNumber: "Унесите број телефона",
    date: "Датум",
    dateTime: "Датум и време",
    dateOnly: "Без времена",
    searchRide: "Претражи вожње",
    resetFilters: "Ресетуј филтере",
    advancedSearch: "Напредна претрага",
    
    // Advanced Search
    vehicleType: "Тип возила",
    allVehicleTypes: "Сви типови возила",
    dimensions: "Димензије",
    allDimensions: "Све димензије",
    smallVehicle: "Мало возило",
    mediumVehicle: "Средње возило",
    largeVehicle: "Велико возило",
    refrigeratedOnly: "Само возила са фрижидером",
    
    // Results
    showingRides: "Приказујем",
    rides: "вожњи",
    exactMatches: "тачних",
    approximateMatches: "приближних",
    nearbyMatches: "оближњих",
    noRidesFound: "Није пронађена ниједна вожња са изабраним филтерима.",
    noResults: "Није пронађена ниједна вожња за овај смер.",
    noResultsSuggestion: "Пробајте друге филтере или проверите касније.",
    nearbyResultsHeader: "Оближње вожње ({count}) - од/до градова близу {fromCity} или {toCity}:",
    distanceTooltip: "{distance}км од тражене локације {searchCity}",
    searchValidationMessage: "Молимо изаберите градове 'Од' и 'До' за претрагу вожњи.",
    searchValidationTooltip: "Изаберите градове за претрагу вожњи",
    
    // Table Headers
    fromLocation: "ОД",
    toLocation: "ДО",
    date: "ДАТУМ",
    time: "ВРЕМЕ",
    vehicle: "ТИП ВОЗИЛА",
    rideType: "ТИП ВОЖЊЕ",
    
    // Ride Types
    offeringTransport: "Нудим превоз",
    lookingForTransport: "Тражим превоз",
    flexible: "Флексибилно",
    
    // Modal - Login
    loginTitle: "Пријава",
    emailOrUsername: "Емаил или корисничко име",
    password: "Лозинка",
    loginButton: "Пријави се",
    noAccount: "Немате налог?",
    registerLink: "Региструјте се",
    
    // Modal - Register
    registerTitle: "Регистрација",
    firstName: "Име",
    lastName: "Презиме",
    email: "Емаил",
    username: "Корисничко име",
    phone: "Телефон",
    confirmPassword: "Потврди лозинку",
    registerButton: "Регистрација",
    haveAccount: "Већ имате налог?",
    loginLink: "Пријавите се",
    
    // Email Verification
    emailVerificationTitle: "Верификација емаила",
    verificationCodeSent: "Послали смо верификациони код на",
    enterVerificationCode: "Унесите 6-цифрени код испод да завршите регистрацију.",
    verificationCode: "Верификациони код:",
    verifyEmail: "Верификуј емаил",
    resendCode: "Пошаљи нови код",
    wrongEmail: "Погрешан емаил?",
    codeValid15Min: "Код важи 15 минута.",
    checkSpamFolder: "Ако нисте примили емаил, проверите спам фолдер или затражите нови код.",
    
    // Change Email
    changeEmailTitle: "Промена емаил адресе",
    enterNewEmail: "Унесите нову емаил адресу за пријем верификационог кода:",
    confirmChange: "Потврди промену",
    cancel: "Откажи",
    
    // Ride Details
    rideDetailsTitle: "Информације о вožњи",
    rideTypeLabel: "Врста вožње",
    departure: "Полазак",
    destination: "Одредиште",
    dateAndTime: "Датум и време",
    vehicleInfo: "Возило",
    refrigerator: "Фрижидер",
    description: "Опис",
    price: "Цена",
    contact: "Контакт",
    close: "Затвори",
    editRide: "Уреди вожњу",
    deleteRide: "Обриши вожњу",
    contactOwner: "Контактирај власника",
    myRide: "Моја вожња",
    yes: "Да",
    no: "Не",
    free: "Бесплатно",
    negotiable: "По договору",
    fixedPrice: "Фиксна цена",
    at: "у",
    noDescription: "Нема описа",
    noData: "Нема података",
    notAvailable: "Није доступно",
    confirmDeleteRide: "Да ли сте сигурни да желите да обришете ову вожњу?",
    contactingOwner: "Контактирам власника вожње...",
    
    // Messages
    loginRequired: "Морате бити пријављени да видите детаље.",
    loginSuccessful: "Успешна пријава!",
    logoutSuccessful: "Успешно сте се одјавили.",
    registrationSuccessful: "Регистрација успешна! Проверите емаил за верификациони код.",
    emailVerified: "Емаил успешно верификован! Добродошли на FURA!",
    emailUpdated: "Емаил адреса успешно ажурирана. Нови верификациони код је послат.",
    newCodeSent: "Нови верификациони код је послат на вашу емаил адресу.",
    rideDeleted: "Вожња успешно обрисана!",
    errorDeletingRide: "Грешка при брисању вожње",
    
    // Vehicle Types
    avtotransporter: "Ауто транспортер",
    avtovleka: "Шлеп возило",
    furgon: "Фургон",
    kombi: "Комби",
    vlačilec: "Влачилац",
    truck: "Камион",
    van: "Комби",
    car: "Ауто",
    "car-transporter": "Ауто транспортер",
    "car-tow": "Шлеп возило",
    any: "Остала возила",
    custom: "Остало",
    other: "Остало",
    // Add actual database display values as keys
    avto: "Ауто",
    tovornjak: "Камион", 
    kamion: "Камион",
    "poljubno vozilo": "Остала возила",
    
    // Country Names
    slovenija: "Словенија",
    hrvatska: "Хрватска",
    srbija: "Србија",
    bosna_i_hercegovina: "Босна и Херцеговина",
    albanija: "Албанија",
    avstrija: "Аустрија",
    belgija: "Белгија",
    bolgarija: "Бугарска",
    češka: "Чешка",
    črna_gora: "Црна Гора",
    danska: "Данска",
    estonija: "Естонија",
    finska: "Финска",
    francija: "Француска",
    grčija: "Грчка",
    irska: "Ирска",
    italija: "Италија",
    latvija: "Летонија",
    litva: "Литванија",
    luksemburg: "Луксембург",
    madžarska: "Мађарска",
    malta: "Малта",
    nemčija: "Немачка",
    nizozemska: "Холандија",
    poljska: "Пољска",
    portugalska: "Португал",
    romunija: "Румунија",
    severna_makedonija: "Северна Македонија",
    slovaška: "Словачка",
    španija: "Шпанија",
    švedska: "Шведска",
    švica: "Швајцарска",
    ukrajina: "Украјина",
    združeno_kraljestvo: "Уједињено Краљевство",
    
    // Footer
    footerDescription: "Платформа за проналажење и нуђење превоза широм Словеније и суседних земаља.",
    legalTitle: "Правне информације",
    privacyPolicy: "Политика приватности",
    termsConditions: "Услови коришћења",
    about: "О нама",
    contact: "Контакт",
    supportTitle: "Подршка",
    help: "Помоћ",
    faq: "Честа питања",
    contactUs: "Контактирајте нас",
    followUs: "Пратите нас",
    allRightsReserved: "Сва права задржана.",
    backToHome: "Назад на почетну",
    
    // Privacy Policy Page
    privacyPolicyTitle: "Политика приватности",
    lastUpdated: "Последње ажурирано: 1. децембар 2024.",
    introductionTitle: "1. Увод",
    introductionText: "FURA (\"ми\", \"нас\", \"наш\") поштује вашу приватност и посвећена је заштити ваших личних података. Ова политика приватности вас обавештава о томе како прикупљамо, користимо и штитимо ваше податке када користите нашу платформу за проналажење и нуђење превоза.",
    dataCollectionTitle: "2. Које податке прикупљамо",
    registrationDataTitle: "2.1 Подаци при регистрацији",
    registrationDataItem1: "Име и презиме",
    registrationDataItem2: "Емаил адреса",
    registrationDataItem3: "Корисничко име",
    registrationDataItem4: "Број телефона",
    registrationDataItem5: "Лозинка (шифрована)",
    rideDataTitle: "2.2 Подаци о вожњама",
    rideDataItem1: "Локације полазиште и одредиште",
    rideDataItem2: "Датум и време превоза",
    rideDataItem3: "Информације о возилу (тип, димензије)",
    rideDataItem4: "Опис превоза",
    rideDataItem5: "Информације о цени",
    dataUsageTitle: "3. Како користимо ваше податке",
    dataUsageItem1: "За омогућавање регистрације и пријаве у систем",
    dataUsageItem2: "За објављивање и претрагу вожњи",
    dataUsageItem3: "За комуникацију између корисника у вези са вожњама",
    dataUsageItem4: "За безбедност и заштиту платформе",
    dataUsageItem5: "За побољшање наших услуга",
    dataUsageItem6: "За слање верификационих емаилова",
    dataSharingTitle: "4. Дељење података",
    dataSharingText: "Не продајемо ваше податке трећим лицима. Ваши подаци се деле само:",
    dataSharingItem1: "Са другим корисницима када објавите вожњу (име, телефон, емаил за комуникацију)",
    dataSharingItem2: "Са пружаоцима услуга који нам помажу да радимо (нпр. Firebase, EmailJS)",
    dataSharingItem3: "Када то захтева закон",
    dataSecurityTitle: "5. Безбедност података",
    dataSecurityText: "Користимо Firebase за безбедно чување података са следећим безбедносним мерама:",
    dataSecurityItem1: "Шифровање података током преноса (HTTPS)",
    dataSecurityItem2: "Шифровање лозинки",
    dataSecurityItem3: "Firebase безбедносна правила",
    dataSecurityItem4: "Редовна безбедносна ажурирања",
    userRightsTitle: "6. Ваша права",
    userRightsText: "Имате право на:",
    userRightsItem1: "Приступ својим подацима",
    userRightsItem2: "Исправку нетачних података",
    userRightsItem3: "Брисање свог налога и података",
    userRightsItem4: "Преносивост података",
    userRightsItem5: "Приговор на обраду података",
    cookiesTitle: "7. Колачићи",
    cookiesText: "Користимо локално складиштење (localStorage) за:",
    cookiesItem1: "Чување језичких подешавања",
    cookiesItem2: "Привремено чување података за верификацију емаила",
    cookiesItem3: "Побољшање корисничког искуства",
    dataRetentionTitle: "8. Чување података",
    dataRetentionText: "Чувамо ваше податке док је ваш налог активан. Након брисања налога, подаци се трајно уклањају у року од 30 дана.",
    contactTitle: "9. Контакт",
    contactText: "За питања о приватности контактирајте нас на:",
    changesTitle: "10. Промене политике",
    changesText: "Задржавамо право да ажурирамо ову политику. О променама ћемо вас обавестити путем емаила или на платформи.",
    
    // Terms and Conditions Page
    termsConditionsTitle: "Услови коришћења",
    acceptanceTitle: "1. Прихватање услова",
    acceptanceText: "Коришћењем FURA платформе, пристајете на ове услове коришћења. Ако се не слажете са условима, не смете користити платформу.",
    serviceDescriptionTitle: "2. Опис услуге",
    serviceDescriptionText: "FURA је платформа која омогућава корисницима да објављују и траже вожње. Платформа делује као посредник између корисника и не пружа превозне услуге.",
    userObligationsTitle: "3. Обавезе корисника",
    registrationObligationsTitle: "3.1 Регистрација",
    registrationObligation1: "Морате да пружите тачне и истините податке",
    registrationObligation2: "Дужни сте да одржите безбедност своје лозинке",
    registrationObligation3: "Само регистрована особа је одговорна за коришћење налога",
    registrationObligation4: "Дужни сте да верификујете своју емаил адресу",
    behaviorObligationsTitle: "3.2 Понашање на платформи",
    behaviorObligation1: "Морате поштовати друге кориснике",
    behaviorObligation2: "Забрањено је објављивање лажних огласа",
    behaviorObligation3: "Забрањена је употреба увредљивог језика",
    behaviorObligation4: "Морате поштовати договорене термине",
    ridePostingTitle: "4. Објављивање вожњи",
    ridePosting1: "Подаци о вожњи морају бити тачни",
    ridePosting2: "Цене морају бити јасно наведене",
    ridePosting3: "Контакт подаци морају бити исправни",
    ridePosting4: "Забрањено је дискриминаторско понашање",
    ridePosting5: "Задржавамо право да уклонимо неприкладне објаве",
    safetyTitle: "5. Безбедност",
    safetyText: "Корисници су одговорни за сопствену безбедност. FURA препоручује:",
    safety1: "Проверите возача/сапутника пре вожње",
    safety2: "Поделите информације о вожњи са особом од поверења",
    safety3: "Верујте својим осећањима",
    safety4: "У хитним случајевима позовите полицију (192)",
    paymentsTitle: "6. Плаћања",
    paymentsText: "FURA не обрађује плаћања између корисника. Сва плаћања се врше директно између корисника.",
    liabilityTitle: "7. Ограничење одговорности",
    liabilityText: "FURA не преузима одговорност за:",
    liability1: "Штету настала током превоза",
    liability2: "Понашање других корисника",
    liability3: "Тачност објављених података",
    liability4: "Техничке кварове платформе",
    liability5: "Спорове између корисника",
    prohibitedTitle: "8. Забрањена употреба",
    prohibitedText: "Забрањено је:",
    prohibited1: "Комерцијална употреба без дозволе",
    prohibited2: "Злоупотреба личних података других корисника",
    prohibited3: "Објављивање незаконитих садржаја",
    prohibited4: "Ометање рада платформе",
    prohibited5: "Креирање лажних налога",
    moderationTitle: "9. Модерација",
    moderationText: "FURA задржава право да:",
    moderation1: "Уклони неприкладне објаве",
    moderation2: "Привремено или трајно блокира кориснике",
    moderation3: "Прати активност на платформи",
    moderation4: "Пријави незаконито понашање надлежним органима",
    intellectualPropertyTitle: "10. Интелектуална својина",
    intellectualPropertyText: "Сав садржај на FURA платформи је заштићен ауторским правима. Корисници гарантују да имају право на садржај који објављују.",
    terminationTitle: "11. Престанак коришћења",
    terminationText: "Можете обрисати свој налог у било ком тренутку у подешавањима профила. FURA задржава право да прекине приступ корисницима који крше ове услове.",
    disputesTitle: "12. Решавање спорова",
    disputesText: "Спорови се решавају према важећем закону. Препоручујемо да покушате мирно да решите спорове.",
    contactTermsTitle: "13. Контакт",
    contactTermsText: "За питања о условима коришћења контактирајте нас на:",
    changesTermsTitle: "14. Промене услова",
    changesTermsText: "FURA задржава право да мења ове услове. О важним променама ћемо вас обавестити унапред.",
    
    // About Page
    aboutTitle: "О нама",
    missionTitle: "1. Наша мисија",
    missionText: "FURA је платформа која повезује људе са циљем омогућавања приступачних, поузданих и безбедних превоза. Наш циљ је да створимо заједницу корисника који деле трошкове превоза и смањују утицај на животну средину.",
    howItWorksTitle: "2. Како функционише",
    howItWorksText: "FURA омогућава две ствари:",
    howItWorks1: "Корисници могу да објаве да траже превоз до одређене дестинације",
    howItWorks2: "Возачи могу да објаве да нуде превоз на одређеној рути",
    howItWorks3: "Платформа аутоматски приказује најбоља подударања на основу локације и времена",
    howItWorks4: "Корисници могу да се контактирају и договоре заједнички превоз",
    featuresTitle: "3. Функционалности",
    searchFeaturesTitle: "3.1 Напредни систем претраге",
    searchFeature1: "Претрага по локацији са аутоматским предлозима градова",
    searchFeature2: "Филтрирање по датуму и времену",
    searchFeature3: "Додатни филтери (тип возила, димензије, хладњак)",
    searchFeature4: "Приказ приближних подударања са мањим одступањима",
    userFeaturesTitle: "3.2 Управљање корисницима",
    userFeature1: "Безбедна регистрација са верификацијом емаила",
    userFeature2: "Кориснички профили са основним информацијама",
    userFeature3: "Историја објављених вожњи",
    userFeature4: "Лако уређивање профила",
    techFeaturesTitle: "3.3 Техничке карактеристике",
    techFeature1: "Вишејезичка подршка (словеначки, енглески, српски)",
    techFeature2: "Респонзивни дизајн за све уређаје",
    techFeature3: "Подаци у реалном времену са Firebase технологијом",
    techFeature4: "Безбедно чување података",
    visionTitle: "4. Наша визија",
    visionText: "Желимо да постанемо водећа платформа за проналажење вожњи у Словенији и суседним земљама. Наш циљ је:",
    vision1: "Смањити трошкове превоза за све кориснике",
    vision2: "Допринети смањењу саобраћаја и емисија CO2",
    vision3: "Створити заједницу корисника од поверења",
    vision4: "Непрестано побољшавати корисничко искуство",
    safetyCommitmentTitle: "5. Обавеза безбедности",
    safetyCommitmentText: "Безбедност наших корисника је наш главни приоритет:",
    safetyCommitment1: "Сви корисници морају бити регистровани са верификованим емаилом",
    safetyCommitment2: "Подстичемо кориснике да проверавају возаче/сапутнике",
    safetyCommitment3: "Обезбеђујемо јасне смернице за безбедан превоз",
    safetyCommitment4: "Омогућавамо пријављивање неприкладног понашања",
    communityTitle: "6. Заједница",
    communityText: "FURA није само техничка платформа, већ заједница људи који:",
    community1: "Деле трошкове и смањују утицај на животну средину",
    community2: "Поштују једни друге и возила",
    community3: "Помажу у стварању поуздане средине",
    community4: "Доприносе бољој будућности превоза",
    contactAboutTitle: "8. Контакт",
    contactAboutText: "Желите да сазнате више или требате помоћ?",
    technicalSupport: "Техничка подршка",
    businessInquiries: "Пословна питања"
  }
};

// Current language (default to Slovenian)
let currentLanguage = localStorage.getItem('language') || 'sl';

// Store current search results for re-translation
let currentSearchResults = [];

// Language configuration
const languageConfig = {
  sl: { flag: '🇸🇮', name: 'Slovenščina' },
  en: { flag: '🇬🇧', name: 'English' },
  sr: { flag: '🇷🇸', name: 'Српски' }
};

// Translation functions
function t(key) {
  return translations[currentLanguage][key] || translations['sl'][key] || key;
}

function setLanguage(lang) {
  if (languageConfig[lang]) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateUI();
  }
}

function updateUI() {
  // Update all elements with data-translate attribute
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (key && translations[currentLanguage][key]) {
      // Special case for profile button with user name
      if (key === 'profile' && element.getAttribute('data-user-name')) {
        const userName = element.getAttribute('data-user-name');
        element.textContent = `${translations[currentLanguage][key]} (${userName})`;
      } else {
        element.textContent = translations[currentLanguage][key];
      }
    }
  });
  
  // Update placeholders
  const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
  placeholderElements.forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (key && translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });
  
  // Update current language flag
  const currentFlag = document.getElementById('currentFlag');
  if (currentFlag) {
    currentFlag.textContent = languageConfig[currentLanguage].flag;
  }
  
  // Update active language option
  const languageOptions = document.querySelectorAll('.language-option');
  languageOptions.forEach(option => {
    option.classList.remove('active');
    if (option.onclick.toString().includes(`'${currentLanguage}'`)) {
      option.classList.add('active');
    }
  });
  
  // Update results count if it exists - preserve current numbers
  updateResultsCountWithCurrentValues();
  
  // Update datepicker text if it exists
  updateDatePickerText();
  
  // Re-translate search results if they exist
  retranslateSearchResults();
  
  // Re-translate dropdown options if the function exists
  if (typeof window.retranslateDropdowns === 'function') {
    window.retranslateDropdowns();
  }
  
  // Re-translate ride details modal if it's open
  retranslateRideDetailsModal();
  
  // Re-translate profile page dynamic content
  retranslateProfileContent();
}

// Function to update results count with translations
function updateResultsCount() {
  const resultsCount = document.querySelector('.results-count');
  if (resultsCount && resultsCount.textContent.includes('Prikazujem')) {
    // This will be updated by search.js when results are loaded
    return;
  }
}

// Function to update results count while preserving current numbers
function updateResultsCountWithCurrentValues() {
  const resultsCount = document.querySelector('.results-count');
  if (!resultsCount || !resultsCount.textContent) return;
  
  const currentText = resultsCount.textContent;
  console.log('Updating results count, current text:', currentText);
  
  // Extract numbers from current text using multiple language patterns
  const numbersRegex = /(\d+)/g;
  const matches = currentText.match(numbersRegex);
  
  if (matches && matches.length >= 1) {
    const total = parseInt(matches[0]);
    
    // Check if we have exact and approximate matches (pattern: "X rides (Y exact, Z approximate)")
    if (matches.length >= 3) {
      const exact = parseInt(matches[1]);
      const approximate = parseInt(matches[2]);
      console.log('Found exact/approximate:', exact, approximate);
      resultsCount.textContent = formatResultsCount(total, exact, approximate);
    } else {
      console.log('Found total only:', total);
      resultsCount.textContent = formatResultsCount(total);
    }
  } else {
    // If no numbers found but text exists, might be showing 0 results
    if (currentText.trim() && (currentText.includes('0') || 
                               currentText.toLowerCase().includes('showing') || 
                               currentText.toLowerCase().includes('prikazujem'))) {
      console.log('Setting to 0 results');
      resultsCount.textContent = formatResultsCount(0);
    }
  }
}

// Helper function to format results count with translation
function formatResultsCount(total, exact = null, nearby = null) {
  if (exact !== null && nearby !== null) {
    return `${t('showingRides')} ${total} ${t('rides')} (${exact} ${t('exactMatches')}, ${nearby} ${t('nearbyMatches')})`;
  } else {
    return `${t('showingRides')} ${total} ${t('rides')}`;
  }
}

// Helper function to translate text with parameter replacement
function translateText(key, params = {}) {
  let text = t(key);
  
  // Replace parameters in the text
  if (params && typeof params === 'object') {
    Object.keys(params).forEach(param => {
      const placeholder = `{${param}}`;
      text = text.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), params[param]);
    });
  }
  
  return text;
}

// Helper function to translate ride type
function translateRideType(type) {
  if (type === 'offering') return t('offeringTransport');
  if (type === 'looking') return t('lookingForTransport');
  return type;
}

// Helper function to translate country names
function translateCountry(countryName) {
  if (!countryName) return countryName;
  
  // Convert to lowercase and replace spaces for lookup key format
  const lookup = countryName.toLowerCase().replace(/\s+/g, '_');
  
  // Try direct translation lookup first
  const translated = t(lookup);
  if (translated !== lookup) {
    return translated;
  }
  
  // Complete mapping for all countries - handles special characters and variations
  const countryMappings = {
    // Direct mappings for all countries
    'slovenija': 'slovenija',
    'hrvatska': 'hrvatska', 
    'srbija': 'srbija',
    'bosna_i_hercegovina': 'bosna_i_hercegovina',
    'albanija': 'albanija',
    'avstrija': 'avstrija',
    'belgija': 'belgija',
    'bolgarija': 'bolgarija',
    'češka': 'češka',
    'črna_gora': 'črna_gora',
    'danska': 'danska',
    'estonija': 'estonija',
    'finska': 'finska',
    'francija': 'francija',
    'grčija': 'grčija',
    'irska': 'irska',
    'italija': 'italija',
    'latvija': 'latvija',
    'litva': 'litva',
    'luksemburg': 'luksemburg',
    'madžarska': 'madžarska',
    'malta': 'malta',
    'nemčija': 'nemčija',
    'nizozemska': 'nizozemska',
    'poljska': 'poljska',
    'portugalska': 'portugalska',
    'romunija': 'romunija',
    'severna_makedonija': 'severna_makedonija',
    'slovaška': 'slovaška',
    'španija': 'španija',
    'švedska': 'švedska',
    'švica': 'švica',
    'ukrajina': 'ukrajina',
    'združeno_kraljestvo': 'združeno_kraljestvo',
    
    // Common English variations
    'slovenia': 'slovenija',
    'croatia': 'hrvatska',
    'serbia': 'srbija',
    'bosnia_and_herzegovina': 'bosna_i_hercegovina',
    'albania': 'albanija',
    'austria': 'avstrija',
    'belgium': 'belgija',
    'bulgaria': 'bolgarija',
    'czech_republic': 'češka',
    'montenegro': 'črna_gora',
    'denmark': 'danska',
    'estonia': 'estonija',
    'finland': 'finska',
    'france': 'francija',
    'greece': 'grčija',
    'ireland': 'irska',
    'italy': 'italija',
    'latvia': 'latvija',
    'lithuania': 'litva',
    'luxembourg': 'luksemburg',
    'hungary': 'madžarska',
    'malta': 'malta',
    'germany': 'nemčija',
    'netherlands': 'nizozemska',
    'poland': 'poljska',
    'portugal': 'portugalska',
    'romania': 'romunija',
    'north_macedonia': 'severna_makedonija',
    'slovakia': 'slovaška',
    'spain': 'španija',
    'sweden': 'švedska',
    'switzerland': 'švica',
    'ukraine': 'ukrajina',
    'united_kingdom': 'združeno_kraljestvo'
  };
  
  const mappedKey = countryMappings[lookup];
  if (mappedKey) {
    return t(mappedKey);
  }
  
  return countryName; // Return original if no translation found
}

// Helper function to translate vehicle types
function translateVehicleType(vehicleType) {
  if (!vehicleType) return vehicleType;
  
  // Try direct translation first
  const translated = t(vehicleType);
  if (translated && translated !== vehicleType) {
    return translated;
  }
  
  // Try lowercase version
  const lowerCase = vehicleType.toLowerCase().trim();
  const lowerTranslated = t(lowerCase);
  if (lowerTranslated && lowerTranslated !== lowerCase) {
    return lowerTranslated;
  }
  
  // Return original if no translation found
  return vehicleType;
}

// Helper function to translate flexible time
function translateFlexibleTime() {
  return t('flexible');
}

// Function to store search results for later re-translation
function storeSearchResults(results) {
  // Store a deep copy to preserve original data
  currentSearchResults = results.map(ride => ({
    ...ride,
    // Ensure we preserve the original vehicle type data
    originalVehicleType: ride.vehicleType,
    originalVehicleTypeDisplay: ride.vehicleTypeDisplay,
    // Preserve original country data  
    originalFromCountry: ride.fromCountry,
    originalToCountry: ride.toCountry
  }));
}

// Function to re-translate and re-render search results when language changes
function retranslateSearchResults() {
  if (currentSearchResults.length > 0) {
    // Re-render the results with new translations
    // Try the main search results function first
    if (typeof window.updateSearchResults === 'function') {
      window.updateSearchResults(currentSearchResults, false); // Pass false to prevent re-storing
    } 
    // Fallback to the alternate display function
    else if (typeof window.displayRideResults === 'function') {
      window.displayRideResults(currentSearchResults);
    }
  }
}

// Function to update datepicker text when language changes
function updateDatePickerText() {
  const dateTextElement = document.querySelector('.date-text');
  if (!dateTextElement) return;
  
  const currentText = dateTextElement.textContent;
  const dateOnlyCheckbox = document.getElementById('dateOnlyCheckbox');
  const isDateOnly = dateOnlyCheckbox && dateOnlyCheckbox.checked;
  
  // Check if it's showing default text (not a selected date)
  if (currentText === 'Datum in ura' || currentText === 'Date and Time' || currentText === 'Датум и време' ||
      currentText === 'Datum' || currentText === 'Date' || currentText === 'Датум') {
    dateTextElement.textContent = isDateOnly ? t('date') : t('dateTime');
  }
  // If it's showing a selected date, don't change it
}

// Language selector functions
function toggleLanguageDropdown() {
  const dropdown = document.getElementById('languageDropdown');
  const currentLang = document.querySelector('.current-language');
  
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    currentLang.classList.remove('open');
  } else {
    dropdown.classList.add('show');
    currentLang.classList.add('open');
  }
}

function changeLanguage(lang) {
  setLanguage(lang);
  toggleLanguageDropdown(); // Close dropdown
  
  // Small delay to ensure DOM updates are processed
  setTimeout(() => {
    updateResultsCountWithCurrentValues();
  }, 100);
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector && !languageSelector.contains(event.target)) {
    const dropdown = document.getElementById('languageDropdown');
    const currentLang = document.querySelector('.current-language');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
    if (currentLang) {
      currentLang.classList.remove('open');
    }
  }
});

// Initialize language system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Translation system initialized with language:', currentLanguage);
  updateUI();
  
  // Also update after a short delay to catch any dynamically loaded content
  setTimeout(() => {
    updateUI();
  }, 500);
});

// Make functions available globally
window.t = t;
window.translateText = translateText;
window.setLanguage = setLanguage;
window.updateUI = updateUI;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.changeLanguage = changeLanguage;
window.formatResultsCount = formatResultsCount;
window.translateRideType = translateRideType;
window.translateCountry = translateCountry;
window.translateVehicleType = translateVehicleType;
window.translateFlexibleTime = translateFlexibleTime;
window.storeSearchResults = storeSearchResults;
window.retranslateSearchResults = retranslateSearchResults;

// Function to re-translate ride details modal if it's open
function retranslateRideDetailsModal() {
  const modal = document.getElementById('rideDetailsModal');
  if (!modal || modal.style.display !== 'flex') {
    return; // Modal is not open
  }
  
  // Get the current ride data stored in the modal
  const detailRows = modal.querySelectorAll('.detail-row');
  if (!detailRows || detailRows.length === 0) {
    return;
  }
  
  // Update only the labels, preserve the dynamic content
  const labels = [
    'rideTypeLabel',
    'departure', 
    'destination',
    'dateAndTime',
    'vehicleInfo',
    'refrigerator',
    'description',
    'price',
    'contact'
  ];
  
  detailRows.forEach((row, index) => {
    if (index < labels.length) {
      const label = row.querySelector('.detail-label');
      const value = row.querySelector('.detail-value');
      
      if (label && labels[index]) {
        label.textContent = t(labels[index]) + ':';
        
        // Special handling for values that need translation
        if (index === 4 && value) { // Vehicle type
          const currentText = value.textContent;
          if (currentText && !currentText.includes('×')) {
            // Only vehicle type, no dimensions
            value.textContent = translateVehicleType(value.getAttribute('data-original-vehicle') || currentText);
          } else if (currentText && currentText.includes('×')) {
            // Vehicle type with dimensions
            const parts = currentText.split(' (');
            if (parts.length === 2) {
              const originalVehicle = value.getAttribute('data-original-vehicle') || parts[0];
              value.textContent = translateVehicleType(originalVehicle) + ' (' + parts[1];
            }
          }
        } else if (index === 5 && value) { // Refrigerator yes/no
          const currentText = value.textContent;
          if (currentText === 'Da' || currentText === 'Yes' || currentText === 'Да') {
            value.textContent = t('yes');
          } else if (currentText === 'Ne' || currentText === 'No' || currentText === 'Не') {
            value.textContent = t('no');
          }
        } else if (index === 7 && value) { // Price
          const currentText = value.textContent;
          if (currentText === 'Besplatno' || currentText === 'Free' || currentText === 'Бесплатно') {
            value.textContent = t('free');
          } else if (currentText === 'Po dogovoru' || currentText === 'Negotiable' || currentText === 'По договору') {
            value.textContent = t('negotiable');
          }
        }
        
        // Update country names in departure and destination
        if ((index === 1 || index === 2) && value) { // Departure or destination
          const currentText = value.textContent;
          if (currentText && currentText.includes(',')) {
            const parts = currentText.split(', ');
            if (parts.length === 2) {
              const city = parts[0];
              const country = parts[1];
              value.textContent = city + ', ' + translateCountry(country);
            }
          }
        }
      }
    }
  });
}

window.retranslateRideDetailsModal = retranslateRideDetailsModal;

// Function to re-translate profile page dynamic content
function retranslateProfileContent() {
  // Check if we're on the profile page
  if (!window.location.pathname.includes('profile.html')) {
    return;
  }
  
  // Re-translate "no published rides" message if it exists
  const noRidesElement = document.querySelector('.no-rides');
  if (noRidesElement) {
    noRidesElement.textContent = t('noPublishedRides');
  }
}

window.retranslateProfileContent = retranslateProfileContent;