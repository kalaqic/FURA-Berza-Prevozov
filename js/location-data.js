/**
 * Extended Location data for FURA website
 * Contains comprehensive European countries and cities data with coordinates
 */

// List of available European countries
const countries = [
    // Balkan countries (existing in the original file)
    'Slovenija', 'Hrvatska', 'Srbija', 'Bosna i Hercegovina',
    
    // Other European countries
    'Albanija', 'Austrija', 'Belgija', 'Bolgarija', 'Češka', 'Črna gora',
    'Danska', 'Estonija', 'Finska', 'Francija', 'Grčija', 'Irska',
    'Italija', 'Latvija', 'Litva', 'Luksemburg', 'Madžarska', 'Malta',
    'Nemčija', 'Nizozemska', 'Poljska', 'Portugalska', 'Romunija',
    'Severna Makedonija', 'Slovaška', 'Španija', 'Švedska', 'Švica',
    'Ukrajina', 'Združeno kraljestvo'
];

// Cities data by country
const citiesByCountry = {
    // Existing countries from the original file
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
        'Novigrad', 'Kastav', 'Delnice', 'Nova Gradiška'
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
    ],
    
    // New European countries
    'Albanija': [
        'Tirana', 'Durrës', 'Vlorë', 'Elbasan', 'Shkodër', 'Fier', 'Korçë',
        'Berat', 'Lushnjë', 'Kavajë', 'Gjirokastër', 'Sarandë', 'Pogradec',
        'Lezhë', 'Kukës', 'Krujë', 'Peshkopi', 'Përmet'
    ],
    'Avstrija': [
        'Dunaj', 'Gradec', 'Linz', 'Salzburg', 'Innsbruck', 'Celovec', 
        'Beljak', 'Wolfsberg', 'Sankt Pölten', 'Wels', 'Dornbirn', 'Wiener Neustadt', 
        'Steyr', 'Feldkirch', 'Bregenz', 'Leoben', 'Krems', 'Traun', 'Amstetten'
    ],
    'Belgija': [
        'Bruselj', 'Antwerpen', 'Gent', 'Charleroi', 'Liège', 'Brugge', 'Namur',
        'Leuven', 'Mons', 'Aalst', 'Mechelen', 'Kortrijk', 'Hasselt', 'Oostende',
        'Genk', 'Seraing', 'Roeselare', 'Tournai', 'Verviers'
    ],
    'Bolgarija': [
        'Sofija', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora', 'Pleven',
        'Sliven', 'Dobrich', 'Šumen', 'Pernik', 'Haskovo', 'Yambol', 'Pazardžik',
        'Blagoevgrad', 'Veliko Tarnovo', 'Gabrovo', 'Asenovgrad', 'Vraca'
    ],
    'Češka': [
        'Praga', 'Brno', 'Ostrava', 'Plzeň', 'Liberec', 'Olomouc', 'České Budějovice',
        'Hradec Králové', 'Ústí nad Labem', 'Pardubice', 'Zlín', 'Havířov', 'Kladno',
        'Most', 'Opava', 'Frýdek-Místek', 'Karviná', 'Jihlava', 'Teplice'
    ],
    'Črna gora': [
        'Podgorica', 'Nikšić', 'Herceg Novi', 'Pljevlja', 'Bar', 'Bijelo Polje',
        'Cetinje', 'Budva', 'Ulcinj', 'Tivat', 'Kotor', 'Rožaje', 'Danilovgrad',
        'Berane', 'Plav', 'Kolašin', 'Mojkovac', 'Žabljak'
    ],
    'Danska': [
        'København', 'Aarhus', 'Odense', 'Aalborg', 'Frederiksberg', 'Esbjerg',
        'Gentofte', 'Gladsaxe', 'Randers', 'Kolding', 'Horsens', 'Vejle', 
        'Roskilde', 'Herning', 'Hørsholm', 'Helsingør', 'Silkeborg', 'Næstved', 'Fredericia'
    ],
    'Estonija': [
        'Tallinn', 'Tartu', 'Narva', 'Pärnu', 'Kohtla-Järve', 'Viljandi',
        'Rakvere', 'Maardu', 'Sillamäe', 'Kuressaare', 'Võru', 'Valga',
        'Haapsalu', 'Jõhvi', 'Paide', 'Keila', 'Tapa', 'Põlva'
    ],
    'Finska': [
        'Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku',
        'Jyväskylä', 'Lahti', 'Kuopio', 'Pori', 'Kouvola', 'Joensuu',
        'Lappeenranta', 'Hämeenlinna', 'Vaasa', 'Seinäjoki', 'Rovaniemi',
        'Mikkeli', 'Kotka', 'Salo', 'Porvoo'
    ],
    'Francija': [
        'Pariz', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
        'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre',
        'Saint-Étienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes',
        'Villeurbanne', 'Clermont-Ferrand', 'Le Mans', 'Aix-en-Provence', 'Brest'
    ],
    'Grčija': [
        'Atene', 'Solun', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Ioannina',
        'Chania', 'Kavala', 'Serres', 'Alexandroupoli', 'Kalamata', 'Katerini',
        'Lamia', 'Trikala', 'Kozani', 'Veroia', 'Xanthi', 'Agrinio', 'Komotini'
    ],
    'Irska': [
        'Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda',
        'Dundalk', 'Swords', 'Bray', 'Navan', 'Ennis', 'Kilkenny', 'Carlow',
        'Tralee', 'Newbridge', 'Mullingar', 'Wexford', 'Athlone', 'Celbridge'
    ],
    'Italija': [
        'Rim', 'Milano', 'Neapelj', 'Torino', 'Palermo', 'Genova', 'Bologna',
        'Firence', 'Bari', 'Catania', 'Benetke', 'Verona', 'Messina', 'Padova',
        'Trst', 'Brescia', 'Prato', 'Taranto', 'Reggio Calabria', 'Modena',
        'Livorno', 'Cagliari', 'Parma', 'Foggia', 'Reggio Emilia', 'Salerno'
    ],
    'Latvija': [
        'Riga', 'Daugavpils', 'Liepāja', 'Jelgava', 'Jūrmala', 'Ventspils',
        'Rēzekne', 'Valmiera', 'Jēkabpils', 'Ogre', 'Tukums', 'Salaspils',
        'Cēsis', 'Kuldīga', 'Saldus', 'Talsi'
    ],
    'Litva': [
        'Vilna', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus',
        'Marijampolė', 'Mažeikiai', 'Jonava', 'Utena', 'Kėdainiai', 'Telšiai',
        'Visaginas', 'Tauragė', 'Ukmergė', 'Plungė', 'Šilutė', 'Radviliškis'
    ],
    'Luksemburg': [
        'Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange',
        'Ettelbruck', 'Diekirch', 'Wiltz', 'Echternach', 'Rumelange', 'Grevenmacher',
        'Mondorf-les-Bains', 'Vianden', 'Remich', 'Clervaux'
    ],
    'Madžarska': [
        'Budimpešta', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr',
        'Nyíregyháza', 'Kecskemét', 'Székesfehérvár', 'Szombathely', 'Szolnok',
        'Tatabánya', 'Kaposvár', 'Sopron', 'Békéscsaba', 'Eger', 'Veszprém',
        'Zalaegerszeg', 'Nagykanizsa', 'Dunaújváros', 'Hódmezővásárhely'
    ],
    'Malta': [
        'Valletta', 'Birkirkara', 'Qormi', 'Sliema', 'Zabbar', 'St. Paul\'s Bay',
        'Fgura', 'Mosta', 'St. Julian\'s', 'Żejtun', 'San Ġwann', 'Rabat', 
        'Attard', 'Marsascala', 'Paola', 'Żebbuġ', 'Siġġiewi'
    ],
    'Nemčija': [
        'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf',
        'Leipzig', 'Dortmund', 'Essen', 'Bremen', 'Dresden', 'Hannover', 'Nürnberg',
        'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster', 'Karlsruhe',
        'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen', 'Mönchengladbach',
        'Braunschweig', 'Kiel', 'Aachen', 'Chemnitz', 'Halle', 'Magdeburg', 'Freiburg',
        'Krefeld', 'Mainz', 'Lübeck', 'Erfurt', 'Rostock', 'Kassel', 'Hagen'
    ],
    'Nizozemska': [
        'Amsterdam', 'Rotterdam', 'Haag', 'Utrecht', 'Eindhoven', 'Tilburg',
        'Groningen', 'Almere', 'Breda', 'Nijmegen', 'Enschede', 'Haarlem',
        'Arnhem', 'Amersfoort', 'Zaanstad', 'Apeldoorn', 'Hoofddorp', 'Maastricht',
        'Leiden', 'Dordrecht', 'Zoetermeer', 'Zwolle', 'Delft', 'Alkmaar', 'Heerlen'
    ],
    'Poljska': [
        'Varšava', 'Krakov', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin',
        'Bydgoszcz', 'Lublin', 'Katowice', 'Białystok', 'Gdynia', 'Częstochowa',
        'Radom', 'Sosnowiec', 'Toruń', 'Kielce', 'Rzeszów', 'Olsztyn', 'Gliwice',
        'Zabrze', 'Bytom', 'Bielsko-Biała', 'Ruda Śląska', 'Rybnik', 'Tychy',
        'Opole', 'Elbląg', 'Płock', 'Wałbrzych', 'Włocławek', 'Tarnów', 'Chorzów'
    ],
    'Portugalska': [
        'Lizbona', 'Porto', 'Amadora', 'Braga', 'Coimbra', 'Setúbal', 'Funchal',
        'Évora', 'Faro', 'Portimão', 'Aveiro', 'Leiria', 'Viseu', 'Guimarães',
        'Bragança', 'Vila Real', 'Viana do Castelo', 'Castelo Branco'
    ],
    'Romunija': [
        'Bukarešta', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța', 'Craiova',
        'Brașov', 'Galați', 'Ploiești', 'Oradea', 'Brăila', 'Arad', 'Pitești',
        'Sibiu', 'Bacău', 'Târgu Mureș', 'Baia Mare', 'Buzău', 'Botoșani', 'Satu Mare',
        'Suceava', 'Piatra Neamț', 'Râmnicu Vâlcea', 'Drobeta-Turnu Severin'
    ],
    'Severna Makedonija': [
        'Skopje', 'Bitola', 'Kumanovo', 'Prilep', 'Tetovo', 'Ohrid', 'Veles',
        'Štip', 'Gostivar', 'Strumica', 'Kavadarci', 'Kočani', 'Kičevo',
        'Struga', 'Radoviš', 'Gevgelija', 'Debar', 'Kriva Palanka'
    ],
    'Slovaška': [
        'Bratislava', 'Košice', 'Prešov', 'Žilina', 'Nitra', 'Banská Bystrica',
        'Trnava', 'Martin', 'Trenčín', 'Poprad', 'Prievidza', 'Zvolen',
        'Považská Bystrica', 'Michalovce', 'Spišská Nová Ves', 'Komárno', 'Levice'
    ],
    'Španija': [
        'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
        'Murcia', 'Palma de Mallorca', 'Las Palmas', 'Bilbao', 'Alicante',
        'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'L\'Hospitalet de Llobregat',
        'A Coruña', 'Vitoria-Gasteiz', 'Granada', 'Elche', 'Oviedo', 'Badalona',
        'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell', 'Móstoles',
        'Santa Cruz de Tenerife', 'Pamplona', 'Almería', 'Alcalá de Henares'
    ],
    'Švedska': [
        'Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro',
        'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå',
        'Gävle', 'Borås', 'Södertälje', 'Eskilstuna', 'Halmstad', 'Växjö',
        'Karlstad', 'Sundsvall', 'Östersund', 'Trollhättan', 'Luleå'
    ],
    'Švica': [
        'Zürich', 'Ženeva', 'Basel', 'Bern', 'Lausanne', 'Winterthur', 'Lucern',
        'St. Gallen', 'Lugano', 'Biel/Bienne', 'Thun', 'Köniz', 'La Chaux-de-Fonds',
        'Fribourg', 'Schaffhausen', 'Vernier', 'Neuchâtel', 'Chur', 'Sion'
    ],
    'Ukrajina': [
        'Kijev', 'Harkov', 'Odessa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv',
        'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Makiivka',
        'Sevastopol', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy',
        'Khmelnytskyi', 'Zhytomyr', 'Sumy', 'Rivne', 'Ivano-Frankivsk', 'Ternopil'
    ],
    'Združeno kraljestvo': [
        'London', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol', 'Manchester',
        'Sheffield', 'Leeds', 'Edinburgh', 'Leicester', 'Coventry', 'Bradford',
        'Cardiff', 'Belfast', 'Nottingham', 'Kingston upon Hull', 'Newcastle upon Tyne',
        'Stoke-on-Trent', 'Southampton', 'Derby', 'Portsmouth', 'Brighton', 'Plymouth',
        'Northampton', 'Reading', 'Luton', 'Wolverhampton', 'Blackpool', 'Aberdeen',
        'Cambridge', 'Oxford', 'Norwich', 'York', 'Swansea', 'Exeter', 'Milton Keynes'
    ]
};

// Comprehensive coordinates for cities by country
const cityCoordinates = {
    // Existing countries from the original file
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
      },
      
      // New European countries
      'Albanija': {
        'Tirana': { lat: 41.3275, lng: 19.8187 },
        'Durrës': { lat: 41.3233, lng: 19.4412 },
        'Vlorë': { lat: 40.4667, lng: 19.4833 },
        'Elbasan': { lat: 41.1125, lng: 20.0822 },
        'Shkodër': { lat: 42.0686, lng: 19.5125 },
        'Fier': { lat: 40.7239, lng: 19.5561 },
        'Korçë': { lat: 40.6186, lng: 20.7808 },
        'Berat': { lat: 40.7056, lng: 19.9522 },
        'Lushnjë': { lat: 40.9419, lng: 19.7092 },
        'Kavajë': { lat: 41.1856, lng: 19.5569 },
        'Gjirokastër': { lat: 40.0758, lng: 20.1414 },
        'Sarandë': { lat: 39.8756, lng: 20.0053 },
        'Pogradec': { lat: 40.9025, lng: 20.6525 },
        'Lezhë': { lat: 41.7833, lng: 19.6500 },
        'Kukës': { lat: 42.0778, lng: 20.4189 },
        'Krujë': { lat: 41.5089, lng: 19.7928 },
        'Peshkopi': { lat: 41.6850, lng: 20.4289 },
        'Përmet': { lat: 40.2336, lng: 20.3517 }
      },
      'Avstrija': {
        'Dunaj': { lat: 48.2082, lng: 16.3738 }, // Vienna
        'Gradec': { lat: 47.0707, lng: 15.4395 }, // Graz
        'Linz': { lat: 48.3064, lng: 14.2861 },
        'Salzburg': { lat: 47.8095, lng: 13.0550 },
        'Innsbruck': { lat: 47.2692, lng: 11.4041 },
        'Celovec': { lat: 46.6249, lng: 14.3050 }, // Klagenfurt
        'Beljak': { lat: 46.6111, lng: 13.8558 }, // Villach
        'Wolfsberg': { lat: 46.8381, lng: 14.8456 },
        'Sankt Pölten': { lat: 48.2047, lng: 15.6256 },
        'Wels': { lat: 48.1575, lng: 14.0286 },
        'Dornbirn': { lat: 47.4125, lng: 9.7417 },
        'Wiener Neustadt': { lat: 47.8167, lng: 16.2500 },
        'Steyr': { lat: 48.0500, lng: 14.4167 },
        'Feldkirch': { lat: 47.2392, lng: 9.6000 },
        'Bregenz': { lat: 47.5031, lng: 9.7471 },
        'Leoben': { lat: 47.3833, lng: 15.1000 },
        'Krems': { lat: 48.4103, lng: 15.6103 },
        'Traun': { lat: 48.2208, lng: 14.2333 },
        'Amstetten': { lat: 48.1167, lng: 14.8833 }
      },
      'Belgija': {
        'Bruselj': { lat: 50.8503, lng: 4.3517 }, // Brussels
        'Antwerpen': { lat: 51.2194, lng: 4.4025 },
        'Gent': { lat: 51.0543, lng: 3.7174 },
        'Charleroi': { lat: 50.4108, lng: 4.4447 },
        'Liège': { lat: 50.6326, lng: 5.5797 },
        'Brugge': { lat: 51.2093, lng: 3.2247 },
        'Namur': { lat: 50.4673, lng: 4.8719 },
        'Leuven': { lat: 50.8798, lng: 4.7005 },
        'Mons': { lat: 50.4542, lng: 3.9523 },
        'Aalst': { lat: 50.9378, lng: 4.0357 },
        'Mechelen': { lat: 51.0259, lng: 4.4776 },
        'Kortrijk': { lat: 50.8285, lng: 3.2648 },
        'Hasselt': { lat: 50.9311, lng: 5.3378 },
        'Oostende': { lat: 51.2154, lng: 2.9287 },
        'Genk': { lat: 50.9659, lng: 5.5095 },
        'Seraing': { lat: 50.5833, lng: 5.5000 },
        'Roeselare': { lat: 50.9467, lng: 3.1332 },
        'Tournai': { lat: 50.6069, lng: 3.3890 },
        'Verviers': { lat: 50.5883, lng: 5.8697 }
      },
      'Bolgarija': {
        'Sofija': { lat: 42.6977, lng: 23.3219 }, // Sofia
        'Plovdiv': { lat: 42.1421, lng: 24.7499 },
        'Varna': { lat: 43.2141, lng: 27.9147 },
        'Burgas': { lat: 42.5061, lng: 27.4678 },
        'Ruse': { lat: 43.8564, lng: 25.9706 },
        'Stara Zagora': { lat: 42.4257, lng: 25.6347 },
        'Pleven': { lat: 43.4170, lng: 24.6067 },
        'Sliven': { lat: 42.6861, lng: 26.3250 },
        'Dobrich': { lat: 43.5703, lng: 27.8272 },
        'Šumen': { lat: 43.2714, lng: 26.9369 },
        'Pernik': { lat: 42.6049, lng: 23.0344 },
        'Haskovo': { lat: 41.9344, lng: 25.5569 },
        'Yambol': { lat: 42.4844, lng: 26.5028 },
        'Pazardžik': { lat: 42.1928, lng: 24.3336 },
        'Blagoevgrad': { lat: 42.0167, lng: 23.1000 },
        'Veliko Tarnovo': { lat: 43.0842, lng: 25.6569 },
        'Gabrovo': { lat: 42.8747, lng: 25.3342 },
        'Asenovgrad': { lat: 42.0167, lng: 24.8667 },
        'Vraca': { lat: 43.2103, lng: 23.5626 }
      },
      'Češka': {
        'Praga': { lat: 50.0755, lng: 14.4378 }, // Prague
        'Brno': { lat: 49.1951, lng: 16.6068 },
        'Ostrava': { lat: 49.8209, lng: 18.2625 },
        'Plzeň': { lat: 49.7384, lng: 13.3736 },
        'Liberec': { lat: 50.7699, lng: 15.0579 },
        'Olomouc': { lat: 49.5938, lng: 17.2508 },
        'České Budějovice': { lat: 48.9747, lng: 14.4744 },
        'Hradec Králové': { lat: 50.2095, lng: 15.8325 },
        'Ústí nad Labem': { lat: 50.6607, lng: 14.0333 },
        'Pardubice': { lat: 50.0343, lng: 15.7812 },
        'Zlín': { lat: 49.2262, lng: 17.6637 },
        'Havířov': { lat: 49.7797, lng: 18.4375 },
        'Kladno': { lat: 50.1430, lng: 14.1027 },
        'Most': { lat: 50.5103, lng: 13.6397 },
        'Opava': { lat: 49.9385, lng: 17.9017 },
        'Frýdek-Místek': { lat: 49.6841, lng: 18.3504 },
        'Karviná': { lat: 49.8555, lng: 18.5431 },
        'Jihlava': { lat: 49.3952, lng: 15.5767 },
        'Teplice': { lat: 50.6403, lng: 13.8244 }
      },
      'Črna gora': {
        'Podgorica': { lat: 42.4304, lng: 19.2594 },
        'Nikšić': { lat: 42.7731, lng: 18.9445 },
        'Herceg Novi': { lat: 42.4531, lng: 18.5375 },
        'Pljevlja': { lat: 43.3567, lng: 19.3592 },
        'Bar': { lat: 42.0931, lng: 19.1000 },
        'Bijelo Polje': { lat: 43.0383, lng: 19.7500 },
        'Cetinje': { lat: 42.3906, lng: 18.9142 },
        'Budva': { lat: 42.2911, lng: 18.8400 },
        'Ulcinj': { lat: 41.9294, lng: 19.2269 },
        'Tivat': { lat: 42.4333, lng: 18.7000 },
        'Kotor': { lat: 42.4250, lng: 18.7700 },
        'Rožaje': { lat: 42.8394, lng: 20.1664 },
        'Danilovgrad': { lat: 42.5542, lng: 19.1000 },
        'Berane': { lat: 42.8275, lng: 19.8719 },
        'Plav': { lat: 42.5969, lng: 19.9464 },
        'Kolašin': { lat: 42.8236, lng: 19.5172 },
        'Mojkovac': { lat: 42.9604, lng: 19.5833 },
        'Žabljak': { lat: 43.1542, lng: 19.1231 }
      },
      'Danska': {
        'København': { lat: 55.6761, lng: 12.5683 }, // Copenhagen
        'Aarhus': { lat: 56.1567, lng: 10.2108 },
        'Odense': { lat: 55.4038, lng: 10.4024 },
        'Aalborg': { lat: 57.0484, lng: 9.9187 },
        'Frederiksberg': { lat: 55.6786, lng: 12.5147 },
        'Esbjerg': { lat: 55.4729, lng: 8.4494 },
        'Gentofte': { lat: 55.7496, lng: 12.5475 },
        'Gladsaxe': { lat: 55.7371, lng: 12.4639 },
        'Randers': { lat: 56.4607, lng: 10.0364 },
        'Kolding': { lat: 55.4904, lng: 9.4730 },
        'Horsens': { lat: 55.8604, lng: 9.8566 },
        'Vejle': { lat: 55.7090, lng: 9.5357 },
        'Roskilde': { lat: 55.6417, lng: 12.0798 },
        'Herning': { lat: 56.1391, lng: 8.9711 },
        'Hørsholm': { lat: 55.8838, lng: 12.5033 },
        'Helsingør': { lat: 56.0360, lng: 12.6141 },
        'Silkeborg': { lat: 56.1701, lng: 9.5414 },
        'Næstved': { lat: 55.2308, lng: 11.7685 },
        'Fredericia': { lat: 55.5703, lng: 9.7594 }
      },
      'Estonija': {
        'Tallinn': { lat: 59.4370, lng: 24.7536 },
        'Tartu': { lat: 58.3780, lng: 26.7286 },
        'Narva': { lat: 59.3794, lng: 28.1903 },
        'Pärnu': { lat: 58.3853, lng: 24.4972 },
        'Kohtla-Järve': { lat: 59.4139, lng: 27.2731 },
        'Viljandi': { lat: 58.3639, lng: 25.5944 },
        'Rakvere': { lat: 59.3472, lng: 26.3594 },
        'Maardu': { lat: 59.4647, lng: 24.9536 },
        'Sillamäe': { lat: 59.3967, lng: 27.7639 },
        'Kuressaare': { lat: 58.2483, lng: 22.5039 },
        'Võru': { lat: 57.8350, lng: 27.0228 },
        'Valga': { lat: 57.7767, lng: 26.0464 },
        'Haapsalu': { lat: 58.9431, lng: 23.5414 },
        'Jõhvi': { lat: 59.3592, lng: 27.4211 },
        'Paide': { lat: 58.8856, lng: 25.5536 },
        'Keila': { lat: 59.3036, lng: 24.4131 },
        'Tapa': { lat: 59.2617, lng: 25.9631 },
        'Põlva': { lat: 58.0575, lng: 27.0686 }
      },
      'Finska': {
        'Helsinki': { lat: 60.1699, lng: 24.9384 },
        'Espoo': { lat: 60.2052, lng: 24.6522 },
        'Tampere': { lat: 61.4978, lng: 23.7610 },
        'Vantaa': { lat: 60.2934, lng: 25.0378 },
        'Oulu': { lat: 65.0126, lng: 25.4682 },
        'Turku': { lat: 60.4518, lng: 22.2666 },
        'Jyväskylä': { lat: 62.2426, lng: 25.7473 },
        'Lahti': { lat: 60.9827, lng: 25.6612 },
        'Kuopio': { lat: 62.8980, lng: 27.6782 },
        'Pori': { lat: 61.4851, lng: 21.7974 },
        'Kouvola': { lat: 60.8699, lng: 26.7041 },
        'Joensuu': { lat: 62.6010, lng: 29.7636 },
        'Lappeenranta': { lat: 61.0587, lng: 28.1887 },
        'Hämeenlinna': { lat: 60.9957, lng: 24.4644 },
        'Vaasa': { lat: 63.0959, lng: 21.6162 },
        'Seinäjoki': { lat: 62.7946, lng: 22.8282 },
        'Rovaniemi': { lat: 66.5039, lng: 25.7294 },
        'Mikkeli': { lat: 61.6871, lng: 27.2731 },
        'Kotka': { lat: 60.4665, lng: 26.9459 },
        'Salo': { lat: 60.3832, lng: 23.1331 },
        'Porvoo': { lat: 60.3931, lng: 25.6651 }
      },
      'Francija': {
        'Pariz': { lat: 48.8566, lng: 2.3522 }, // Paris
        'Marseille': { lat: 43.2965, lng: 5.3698 },
        'Lyon': { lat: 45.7640, lng: 4.8357 },
        'Toulouse': { lat: 43.6047, lng: 1.4442 },
        'Nice': { lat: 43.7102, lng: 7.2620 },
        'Nantes': { lat: 47.2184, lng: -1.5536 },
        'Strasbourg': { lat: 48.5734, lng: 7.7521 },
        'Montpellier': { lat: 43.6108, lng: 3.8767 },
        'Bordeaux': { lat: 44.8378, lng: -0.5792 },
        'Lille': { lat: 50.6292, lng: 3.0573 },
        'Rennes': { lat: 48.1173, lng: -1.6778 },
        'Reims': { lat: 49.2583, lng: 4.0317 },
        'Le Havre': { lat: 49.4944, lng: 0.1079 },
        'Saint-Étienne': { lat: 45.4397, lng: 4.3872 },
        'Toulon': { lat: 43.1242, lng: 5.9280 },
        'Grenoble': { lat: 45.1885, lng: 5.7245 },
        'Dijon': { lat: 47.3220, lng: 5.0415 },
        'Angers': { lat: 47.4784, lng: -0.5632 },
        'Nîmes': { lat: 43.8367, lng: 4.3601 },
        'Villeurbanne': { lat: 45.7679, lng: 4.8812 },
        'Clermont-Ferrand': { lat: 45.7833, lng: 3.0833 },
        'Le Mans': { lat: 48.0069, lng: 0.1973 },
        'Aix-en-Provence': { lat: 43.5298, lng: 5.4474 },
        'Brest': { lat: 48.3904, lng: -4.4861 }
      },
      'Grčija': {
        'Atene': { lat: 37.9838, lng: 23.7275 }, // Athens
        'Solun': { lat: 40.6401, lng: 22.9444 }, // Thessaloniki
        'Patras': { lat: 38.2466, lng: 21.7346 },
        'Heraklion': { lat: 35.3387, lng: 25.1442 },
        'Larissa': { lat: 39.6390, lng: 22.4174 },
        'Volos': { lat: 39.3658, lng: 22.9457 },
        'Ioannina': { lat: 39.6651, lng: 20.8536 },
        'Chania': { lat: 35.5138, lng: 24.0180 },
        'Kavala': { lat: 40.9374, lng: 24.4122 },
        'Serres': { lat: 41.0901, lng: 23.5466 },
        'Alexandroupoli': { lat: 40.8486, lng: 25.8766 },
        'Kalamata': { lat: 37.0391, lng: 22.1144 },
        'Katerini': { lat: 40.2719, lng: 22.5016 },
        'Lamia': { lat: 38.9000, lng: 22.4333 },
        'Trikala': { lat: 39.5556, lng: 21.7657 },
        'Kozani': { lat: 40.3031, lng: 21.7881 },
        'Veroia': { lat: 40.5233, lng: 22.2028 },
        'Xanthi': { lat: 41.1345, lng: 24.8877 },
        'Agrinio': { lat: 38.6282, lng: 21.4090 },
        'Komotini': { lat: 41.1233, lng: 25.3967 }
      },
      'Irska': {
        'Dublin': { lat: 53.3498, lng: -6.2603 },
        'Cork': { lat: 51.8979, lng: -8.4705 },
        'Limerick': { lat: 52.6638, lng: -8.6267 },
        'Galway': { lat: 53.2707, lng: -9.0568 },
        'Waterford': { lat: 52.2593, lng: -7.1101 },
        'Drogheda': { lat: 53.7188, lng: -6.3477 },
        'Dundalk': { lat: 54.0088, lng: -6.4049 },
        'Swords': { lat: 53.4561, lng: -6.2181 },
        'Bray': { lat: 53.2042, lng: -6.1074 },
        'Navan': { lat: 53.6528, lng: -6.6832 },
        'Ennis': { lat: 52.8464, lng: -8.9807 },
        'Kilkenny': { lat: 52.6545, lng: -7.2525 },
        'Carlow': { lat: 52.8408, lng: -6.9261 },
        'Tralee': { lat: 52.2704, lng: -9.7026 },
        'Newbridge': { lat: 53.1835, lng: -6.7985 },
        'Mullingar': { lat: 53.5227, lng: -7.3383 },
        'Wexford': { lat: 52.3342, lng: -6.4575 },
        'Athlone': { lat: 53.4239, lng: -7.9407 },
        'Celbridge': { lat: 53.3381, lng: -6.5394 }
      },
      'Italija': {
        'Rim': { lat: 41.9028, lng: 12.4964 }, // Rome
        'Milano': { lat: 45.4642, lng: 9.1900 }, // Milan
        'Neapelj': { lat: 40.8518, lng: 14.2681 }, // Naples
        'Torino': { lat: 45.0703, lng: 7.6869 }, // Turin
        'Palermo': { lat: 38.1157, lng: 13.3615 },
        'Genova': { lat: 44.4056, lng: 8.9463 }, // Genoa
        'Bologna': { lat: 44.4949, lng: 11.3426 },
        'Firence': { lat: 43.7696, lng: 11.2558 }, // Florence
        'Bari': { lat: 41.1172, lng: 16.8719 },
        'Catania': { lat: 37.5079, lng: 15.0830 },
        'Benetke': { lat: 45.4408, lng: 12.3155 }, // Venice
        'Verona': { lat: 45.4384, lng: 10.9916 },
        'Messina': { lat: 38.1938, lng: 15.5540 },
        'Padova': { lat: 45.4064, lng: 11.8768 }, // Padua
        'Trst': { lat: 45.6495, lng: 13.7768 }, // Trieste
        'Brescia': { lat: 45.5417, lng: 10.2118 },
        'Prato': { lat: 43.8769, lng: 11.0922 },
        'Taranto': { lat: 40.4750, lng: 17.2288 },
        'Reggio Calabria': { lat: 38.1111, lng: 15.6603 },
        'Modena': { lat: 44.6471, lng: 10.9252 },
        'Livorno': { lat: 43.5485, lng: 10.3104 },
        'Cagliari': { lat: 39.2238, lng: 9.1219 },
        'Parma': { lat: 44.8015, lng: 10.3279 },
        'Foggia': { lat: 41.4622, lng: 15.5508 },
        'Reggio Emilia': { lat: 44.6977, lng: 10.6307 },
        'Salerno': { lat: 40.6824, lng: 14.7680 }
    },
    'Latvija': {
      'Riga': { lat: 56.9496, lng: 24.1052 },
      'Daugavpils': { lat: 55.8714, lng: 26.5144 },
      'Liepāja': { lat: 56.5047, lng: 21.0107 },
      'Jelgava': { lat: 56.6531, lng: 23.7128 },
      'Jūrmala': { lat: 56.9677, lng: 23.7701 },
      'Ventspils': { lat: 57.3937, lng: 21.5643 },
      'Rēzekne': { lat: 56.5100, lng: 27.3262 },
      'Valmiera': { lat: 57.5384, lng: 25.4280 },
      'Jēkabpils': { lat: 56.4977, lng: 25.8620 },
      'Ogre': { lat: 56.8167, lng: 24.6167 },
      'Tukums': { lat: 56.9675, lng: 23.1518 },
      'Salaspils': { lat: 56.8609, lng: 24.3542 },
      'Cēsis': { lat: 57.3108, lng: 25.2715 },
      'Kuldīga': { lat: 56.9741, lng: 21.9670 },
      'Saldus': { lat: 56.6639, lng: 22.4944 },
      'Talsi': { lat: 57.2367, lng: 22.5856 }
    },
    'Litva': {
      'Vilna': { lat: 54.6872, lng: 25.2797 }, // Vilnius
      'Kaunas': { lat: 54.8985, lng: 23.9036 },
      'Klaipėda': { lat: 55.7117, lng: 21.1319 },
      'Šiauliai': { lat: 55.9349, lng: 23.3136 },
      'Panevėžys': { lat: 55.7308, lng: 24.3536 },
      'Alytus': { lat: 54.3967, lng: 24.0425 },
      'Marijampolė': { lat: 54.5598, lng: 23.3509 },
      'Mažeikiai': { lat: 56.3069, lng: 22.3386 },
      'Jonava': { lat: 55.0833, lng: 24.2833 },
      'Utena': { lat: 55.4978, lng: 25.5992 },
      'Kėdainiai': { lat: 55.2878, lng: 23.9725 },
      'Telšiai': { lat: 55.9814, lng: 22.2561 },
      'Visaginas': { lat: 55.5964, lng: 26.4394 },
      'Tauragė': { lat: 55.2522, lng: 22.2897 },
      'Ukmergė': { lat: 55.2428, lng: 24.7644 },
      'Plungė': { lat: 55.9117, lng: 21.8444 },
      'Šilutė': { lat: 55.3428, lng: 21.4731 },
      'Radviliškis': { lat: 55.8097, lng: 23.5469 }
    },
    'Luksemburg': {
      'Luxembourg City': { lat: 49.6116, lng: 6.1319 },
      'Esch-sur-Alzette': { lat: 49.4958, lng: 5.9806 },
      'Differdange': { lat: 49.5242, lng: 5.8893 },
      'Dudelange': { lat: 49.4806, lng: 6.0875 },
      'Ettelbruck': { lat: 49.8475, lng: 6.1014 },
      'Diekirch': { lat: 49.8678, lng: 6.1589 },
      'Wiltz': { lat: 49.9650, lng: 5.9319 },
      'Echternach': { lat: 49.8119, lng: 6.4211 },
      'Rumelange': { lat: 49.4606, lng: 6.0319 },
      'Grevenmacher': { lat: 49.6800, lng: 6.4400 },
      'Mondorf-les-Bains': { lat: 49.5058, lng: 6.2789 },
      'Vianden': { lat: 49.9350, lng: 6.2092 },
      'Remich': { lat: 49.5461, lng: 6.3689 },
      'Clervaux': { lat: 50.0550, lng: 6.0250 }
    },
    'Madžarska': {
      'Budimpešta': { lat: 47.4979, lng: 19.0402 }, // Budapest
      'Debrecen': { lat: 47.5316, lng: 21.6273 },
      'Szeged': { lat: 46.2530, lng: 20.1414 },
      'Miskolc': { lat: 48.1032, lng: 20.7778 },
      'Pécs': { lat: 46.0727, lng: 18.2323 },
      'Győr': { lat: 47.6875, lng: 17.6504 },
      'Nyíregyháza': { lat: 47.9560, lng: 21.7175 },
      'Kecskemét': { lat: 46.8964, lng: 19.6897 },
      'Székesfehérvár': { lat: 47.1860, lng: 18.4221 },
      'Szombathely': { lat: 47.2306, lng: 16.6217 },
      'Szolnok': { lat: 47.1744, lng: 20.1911 },
      'Tatabánya': { lat: 47.5750, lng: 18.4042 },
      'Kaposvár': { lat: 46.3593, lng: 17.7965 },
      'Sopron': { lat: 47.6853, lng: 16.5944 },
      'Békéscsaba': { lat: 46.6744, lng: 21.0882 },
      'Eger': { lat: 47.9026, lng: 20.3768 },
      'Veszprém': { lat: 47.0932, lng: 17.9100 },
      'Zalaegerszeg': { lat: 46.8417, lng: 16.8411 },
      'Nagykanizsa': { lat: 46.4590, lng: 16.9897 },
      'Dunaújváros': { lat: 46.9619, lng: 18.9355 },
      'Hódmezővásárhely': { lat: 46.4167, lng: 20.3333 }
    },
    'Malta': {
      'Valletta': { lat: 35.8989, lng: 14.5146 },
      'Birkirkara': { lat: 35.8972, lng: 14.4614 },
      'Qormi': { lat: 35.8775, lng: 14.4722 },
      'Sliema': { lat: 35.9125, lng: 14.5019 },
      'Zabbar': { lat: 35.8761, lng: 14.5355 },
      'St. Paul\'s Bay': { lat: 35.9472, lng: 14.4000 },
      'Fgura': { lat: 35.8736, lng: 14.5189 },
      'Mosta': { lat: 35.9092, lng: 14.4261 },
      'St. Julian\'s': { lat: 35.9225, lng: 14.4892 },
      'Żejtun': { lat: 35.8556, lng: 14.5333 },
      'San Ġwann': { lat: 35.9053, lng: 14.4758 },
      'Rabat': { lat: 35.8814, lng: 14.3983 },
      'Attard': { lat: 35.8897, lng: 14.4428 },
      'Marsascala': { lat: 35.8608, lng: 14.5578 },
      'Paola': { lat: 35.8731, lng: 14.4986 },
      'Żebbuġ': { lat: 35.8722, lng: 14.4397 },
      'Siġġiewi': { lat: 35.8372, lng: 14.4344 }
    },
    'Nemčija': {
      'Berlin': { lat: 52.5200, lng: 13.4050 },
      'Hamburg': { lat: 53.5511, lng: 9.9937 },
      'München': { lat: 48.1351, lng: 11.5820 }, // Munich
      'Köln': { lat: 50.9375, lng: 6.9603 }, // Cologne
      'Frankfurt': { lat: 50.1109, lng: 8.6821 },
      'Stuttgart': { lat: 48.7758, lng: 9.1829 },
      'Düsseldorf': { lat: 51.2277, lng: 6.7735 },
      'Leipzig': { lat: 51.3397, lng: 12.3731 },
      'Dortmund': { lat: 51.5136, lng: 7.4653 },
      'Essen': { lat: 51.4556, lng: 7.0116 },
      'Bremen': { lat: 53.0793, lng: 8.8017 },
      'Dresden': { lat: 51.0505, lng: 13.7372 },
      'Hannover': { lat: 52.3759, lng: 9.7320 },
      'Nürnberg': { lat: 49.4521, lng: 11.0767 }, // Nuremberg
      'Duisburg': { lat: 51.4344, lng: 6.7623 },
      'Bochum': { lat: 51.4818, lng: 7.2196 },
      'Wuppertal': { lat: 51.2562, lng: 7.1508 },
      'Bielefeld': { lat: 52.0302, lng: 8.5325 },
      'Bonn': { lat: 50.7374, lng: 7.0982 },
      'Münster': { lat: 51.9607, lng: 7.6261 },
      'Karlsruhe': { lat: 49.0069, lng: 8.4037 },
      'Mannheim': { lat: 49.4875, lng: 8.4660 },
      'Augsburg': { lat: 48.3705, lng: 10.8978 },
      'Wiesbaden': { lat: 50.0825, lng: 8.2400 },
      'Gelsenkirchen': { lat: 51.5175, lng: 7.0857 },
      'Mönchengladbach': { lat: 51.1861, lng: 6.4378 },
      'Braunschweig': { lat: 52.2689, lng: 10.5267 },
      'Kiel': { lat: 54.3233, lng: 10.1228 },
      'Aachen': { lat: 50.7762, lng: 6.0838 },
      'Chemnitz': { lat: 50.8322, lng: 12.9252 },
      'Halle': { lat: 51.4825, lng: 11.9705 },
      'Magdeburg': { lat: 52.1267, lng: 11.6267 },
      'Freiburg': { lat: 47.9990, lng: 7.8421 },
      'Krefeld': { lat: 51.3369, lng: 6.5642 },
      'Mainz': { lat: 49.9929, lng: 8.2473 },
      'Lübeck': { lat: 53.8662, lng: 10.6863 },
      'Erfurt': { lat: 50.9847, lng: 11.0299 },
      'Rostock': { lat: 54.0924, lng: 12.0991 },
      'Kassel': { lat: 51.3127, lng: 9.4797 },
      'Hagen': { lat: 51.3671, lng: 7.4633 }
    },
    'Nizozemska': {
      'Amsterdam': { lat: 52.3676, lng: 4.9041 },
      'Rotterdam': { lat: 51.9244, lng: 4.4777 },
      'Haag': { lat: 52.0705, lng: 4.3007 }, // The Hague
      'Utrecht': { lat: 52.0907, lng: 5.1214 },
      'Eindhoven': { lat: 51.4416, lng: 5.4697 },
      'Tilburg': { lat: 51.5606, lng: 5.0919 },
      'Groningen': { lat: 53.2194, lng: 6.5665 },
      'Almere': { lat: 52.3508, lng: 5.2647 },
      'Breda': { lat: 51.5719, lng: 4.7683 },
      'Nijmegen': { lat: 51.8426, lng: 5.8546 },
      'Enschede': { lat: 52.2215, lng: 6.8936 },
      'Haarlem': { lat: 52.3874, lng: 4.6462 },
      'Arnhem': { lat: 51.9851, lng: 5.8987 },
      'Amersfoort': { lat: 52.1561, lng: 5.3878 },
      'Zaanstad': { lat: 52.4531, lng: 4.8142 },
      'Apeldoorn': { lat: 52.2112, lng: 5.9699 },
      'Hoofddorp': { lat: 52.3018, lng: 4.6884 },
      'Maastricht': { lat: 50.8514, lng: 5.6910 },
      'Leiden': { lat: 52.1601, lng: 4.4970 },
      'Dordrecht': { lat: 51.8133, lng: 4.6908 },
      'Zoetermeer': { lat: 52.0574, lng: 4.4940 },
      'Zwolle': { lat: 52.5168, lng: 6.0830 },
      'Delft': { lat: 52.0116, lng: 4.3571 },
      'Alkmaar': { lat: 52.6324, lng: 4.7534 },
      'Heerlen': { lat: 50.8883, lng: 5.9804 }
    },'Poljska': {
        'Varšava': { lat: 52.2297, lng: 21.0122 }, // Warsaw
        'Krakov': { lat: 50.0647, lng: 19.9450 }, // Krakow
        'Łódź': { lat: 51.7592, lng: 19.4560 },
        'Wrocław': { lat: 51.1079, lng: 17.0385 },
        'Poznań': { lat: 52.4064, lng: 16.9252 },
        'Gdańsk': { lat: 54.3520, lng: 18.6466 },
        'Szczecin': { lat: 53.4285, lng: 14.5528 },
        'Bydgoszcz': { lat: 53.1235, lng: 18.0084 },
        'Lublin': { lat: 51.2465, lng: 22.5684 },
        'Katowice': { lat: 50.2649, lng: 19.0238 },
        'Białystok': { lat: 53.1325, lng: 23.1688 },
        'Gdynia': { lat: 54.5189, lng: 18.5305 },
        'Częstochowa': { lat: 50.8118, lng: 19.1203 },
        'Radom': { lat: 51.4027, lng: 21.1471 },
        'Sosnowiec': { lat: 50.2863, lng: 19.1042 },
        'Toruń': { lat: 53.0137, lng: 18.5981 },
        'Kielce': { lat: 50.8661, lng: 20.6286 },
        'Rzeszów': { lat: 50.0412, lng: 21.9991 },
        'Olsztyn': { lat: 53.7784, lng: 20.4801 },
        'Gliwice': { lat: 50.2944, lng: 18.6713 },
        'Zabrze': { lat: 50.3249, lng: 18.7857 },
        'Bytom': { lat: 50.3483, lng: 18.9156 },
        'Bielsko-Biała': { lat: 49.8224, lng: 19.0584 },
        'Ruda Śląska': { lat: 50.2558, lng: 18.8555 },
        'Rybnik': { lat: 50.0946, lng: 18.5444 },
        'Tychy': { lat: 50.1297, lng: 18.9811 },
        'Opole': { lat: 50.6751, lng: 17.9213 },
        'Elbląg': { lat: 54.1522, lng: 19.4082 },
        'Płock': { lat: 52.5463, lng: 19.7065 },
        'Wałbrzych': { lat: 50.7840, lng: 16.2843 },
        'Włocławek': { lat: 52.6484, lng: 19.0677 },
        'Tarnów': { lat: 50.0121, lng: 20.9858 },
        'Chorzów': { lat: 50.2974, lng: 18.9545 }
      },
      'Portugalska': {
        'Lizbona': { lat: 38.7223, lng: -9.1393 }, // Lisbon
        'Porto': { lat: 41.1579, lng: -8.6291 },
        'Amadora': { lat: 38.7599, lng: -9.2394 },
        'Braga': { lat: 41.5454, lng: -8.4265 },
        'Coimbra': { lat: 40.2033, lng: -8.4103 },
        'Setúbal': { lat: 38.5244, lng: -8.8936 },
        'Funchal': { lat: 32.6498, lng: -16.9101 },
        'Évora': { lat: 38.5740, lng: -7.9104 },
        'Faro': { lat: 37.0193, lng: -7.9304 },
        'Portimão': { lat: 37.1361, lng: -8.5377 },
        'Aveiro': { lat: 40.6405, lng: -8.6538 },
        'Leiria': { lat: 39.7444, lng: -8.8072 },
        'Viseu': { lat: 40.6601, lng: -7.9139 },
        'Guimarães': { lat: 41.4425, lng: -8.2918 },
        'Bragança': { lat: 41.8072, lng: -6.7592 },
        'Vila Real': { lat: 41.3010, lng: -7.7426 },
        'Viana do Castelo': { lat: 41.6946, lng: -8.8362 },
        'Castelo Branco': { lat: 39.8217, lng: -7.4957 }
      },
      'Romunija': {
        'Bukarešta': { lat: 44.4268, lng: 26.1025 }, // Bucharest
        'Cluj-Napoca': { lat: 46.7712, lng: 23.6236 },
        'Timișoara': { lat: 45.7489, lng: 21.2087 },
        'Iași': { lat: 47.1585, lng: 27.6014 },
        'Constanța': { lat: 44.1598, lng: 28.6348 },
        'Craiova': { lat: 44.3190, lng: 23.7965 },
        'Brașov': { lat: 45.6580, lng: 25.6012 },
        'Galați': { lat: 45.4353, lng: 28.0080 },
        'Ploiești': { lat: 44.9461, lng: 26.0367 },
        'Oradea': { lat: 47.0465, lng: 21.9189 },
        'Brăila': { lat: 45.2692, lng: 27.9575 },
        'Arad': { lat: 46.1866, lng: 21.3123 },
        'Pitești': { lat: 44.8560, lng: 24.8691 },
        'Sibiu': { lat: 45.7983, lng: 24.1256 },
        'Bacău': { lat: 46.5670, lng: 26.9146 },
        'Târgu Mureș': { lat: 46.5403, lng: 24.5582 },
        'Baia Mare': { lat: 47.6573, lng: 23.5705 },
        'Buzău': { lat: 45.1566, lng: 26.8168 },
        'Botoșani': { lat: 47.7487, lng: 26.6708 },
        'Satu Mare': { lat: 47.7921, lng: 22.8850 },
        'Suceava': { lat: 47.6635, lng: 26.2732 },
        'Piatra Neamț': { lat: 46.9276, lng: 26.3710 },
        'Râmnicu Vâlcea': { lat: 45.1047, lng: 24.3675 },
        'Drobeta-Turnu Severin': { lat: 44.6258, lng: 22.6600 }
      },
      'Severna Makedonija': {
        'Skopje': { lat: 41.9981, lng: 21.4254 },
        'Bitola': { lat: 41.0297, lng: 21.3292 },
        'Kumanovo': { lat: 42.1359, lng: 21.7144 },
        'Prilep': { lat: 41.3451, lng: 21.5555 },
        'Tetovo': { lat: 42.0097, lng: 20.9715 },
        'Ohrid': { lat: 41.1174, lng: 20.8019 },
        'Veles': { lat: 41.7153, lng: 21.7752 },
        'Štip': { lat: 41.7380, lng: 22.1936 },
        'Gostivar': { lat: 41.7965, lng: 20.9083 },
        'Strumica': { lat: 41.4376, lng: 22.6434 },
        'Kavadarci': { lat: 41.4331, lng: 22.0120 },
        'Kočani': { lat: 41.9177, lng: 22.4118 },
        'Kičevo': { lat: 41.5126, lng: 20.9591 },
        'Struga': { lat: 41.1778, lng: 20.6778 },
        'Radoviš': { lat: 41.6388, lng: 22.4675 },
        'Gevgelija': { lat: 41.1417, lng: 22.5014 },
        'Debar': { lat: 41.5275, lng: 20.5242 },
        'Kriva Palanka': { lat: 42.2009, lng: 22.3345 }
      },
      'Slovaška': {
        'Bratislava': { lat: 48.1486, lng: 17.1077 },
        'Košice': { lat: 48.7164, lng: 21.2611 },
        'Prešov': { lat: 49.0018, lng: 21.2393 },
        'Žilina': { lat: 49.2231, lng: 18.7394 },
        'Nitra': { lat: 48.3076, lng: 18.0845 },
        'Banská Bystrica': { lat: 48.7395, lng: 19.1536 },
        'Trnava': { lat: 48.3774, lng: 17.5872 },
        'Martin': { lat: 49.0655, lng: 18.9209 },
        'Trenčín': { lat: 48.8943, lng: 18.0455 },
        'Poprad': { lat: 49.0614, lng: 20.2980 },
        'Prievidza': { lat: 48.7729, lng: 18.6270 },
        'Zvolen': { lat: 48.5785, lng: 19.1287 },
        'Považská Bystrica': { lat: 49.1211, lng: 18.4221 },
        'Michalovce': { lat: 48.7542, lng: 21.9198 },
        'Spišská Nová Ves': { lat: 48.9434, lng: 20.5610 },
        'Komárno': { lat: 47.7636, lng: 18.1265 },
        'Levice': { lat: 48.2180, lng: 18.6070 }
      },
      'Španija': {
        'Madrid': { lat: 40.4168, lng: -3.7038 },
        'Barcelona': { lat: 41.3851, lng: 2.1734 },
        'Valencia': { lat: 39.4699, lng: -0.3763 },
        'Sevilla': { lat: 37.3891, lng: -5.9845 },
        'Zaragoza': { lat: 41.6488, lng: -0.8891 },
        'Málaga': { lat: 36.7213, lng: -4.4214 },
        'Murcia': { lat: 37.9922, lng: -1.1307 },
        'Palma de Mallorca': { lat: 39.5696, lng: 2.6502 },
        'Las Palmas': { lat: 28.1248, lng: -15.4300 },
        'Bilbao': { lat: 43.2630, lng: -2.9350 },
        'Alicante': { lat: 38.3452, lng: -0.4815 },
        'Córdoba': { lat: 37.8882, lng: -4.7794 },
        'Valladolid': { lat: 41.6523, lng: -4.7245 },
        'Vigo': { lat: 42.2328, lng: -8.7226 },
        'Gijón': { lat: 43.5452, lng: -5.6635 },
        'L\'Hospitalet de Llobregat': { lat: 41.3595, lng: 2.0997 },
        'A Coruña': { lat: 43.3623, lng: -8.4115 },
        'Vitoria-Gasteiz': { lat: 42.8467, lng: -2.6716 },
        'Granada': { lat: 37.1773, lng: -3.5986 },
        'Elche': { lat: 38.2622, lng: -0.6955 },
        'Oviedo': { lat: 43.3602, lng: -5.8448 },
        'Badalona': { lat: 41.4333, lng: 2.2417 },
        'Cartagena': { lat: 37.6257, lng: -0.9966 },
        'Terrassa': { lat: 41.5607, lng: 2.0097 },
        'Jerez de la Frontera': { lat: 36.6868, lng: -6.1335 },
        'Sabadell': { lat: 41.5486, lng: 2.1096 },
        'Móstoles': { lat: 40.3231, lng: -3.8650 },
        'Santa Cruz de Tenerife': { lat: 28.4636, lng: -16.2518 },
        'Pamplona': { lat: 42.8124, lng: -1.6458 },
        'Almería': { lat: 36.8340, lng: -2.4637 },
        'Alcalá de Henares': { lat: 40.4820, lng: -3.3646 }
      },
      'Švedska': {
        'Stockholm': { lat: 59.3293, lng: 18.0686 },
        'Göteborg': { lat: 57.7089, lng: 11.9746 }, // Gothenburg
        'Malmö': { lat: 55.6050, lng: 13.0038 },
        'Uppsala': { lat: 59.8586, lng: 17.6389 },
        'Västerås': { lat: 59.6099, lng: 16.5448 },
        'Örebro': { lat: 59.2753, lng: 15.2134 },
        'Linköping': { lat: 58.4108, lng: 15.6213 },
        'Helsingborg': { lat: 56.0465, lng: 12.6945 },
        'Jönköping': { lat: 57.7826, lng: 14.1618 },
        'Norrköping': { lat: 58.5877, lng: 16.1924 },
        'Lund': { lat: 55.7047, lng: 13.1910 },
        'Umeå': { lat: 63.8258, lng: 20.2630 },
        'Gävle': { lat: 60.6749, lng: 17.1413 },
        'Borås': { lat: 57.7213, lng: 12.9398 },
        'Södertälje': { lat: 59.1965, lng: 17.6268 },
        'Eskilstuna': { lat: 59.3710, lng: 16.5096 },
        'Halmstad': { lat: 56.6739, lng: 12.8565 },
        'Växjö': { lat: 56.8790, lng: 14.8059 },
        'Karlstad': { lat: 59.4022, lng: 13.5115 },
        'Sundsvall': { lat: 62.3908, lng: 17.3069 },
        'Östersund': { lat: 63.1792, lng: 14.6358 },
        'Trollhättan': { lat: 58.2829, lng: 12.2855 },
        'Luleå': { lat: 65.5842, lng: 22.1540 }
      },
      'Švica': {
        'Zürich': { lat: 47.3769, lng: 8.5417 },
        'Ženeva': { lat: 46.2044, lng: 6.1432 }, // Geneva
        'Basel': { lat: 47.5596, lng: 7.5886 },
        'Bern': { lat: 46.9480, lng: 7.4474 },
        'Lausanne': { lat: 46.5197, lng: 6.6323 },
        'Winterthur': { lat: 47.5000, lng: 8.7500 },
        'Lucern': { lat: 47.0502, lng: 8.3093 }, // Lucerne
        'St. Gallen': { lat: 47.4244, lng: 9.3767 },
        'Lugano': { lat: 46.0037, lng: 8.9511 },
        'Biel/Bienne': { lat: 47.1368, lng: 7.2467 },
        'Thun': { lat: 46.7580, lng: 7.6280 },
        'Köniz': { lat: 46.9198, lng: 7.4238 },
        'La Chaux-de-Fonds': { lat: 47.1039, lng: 6.8320 },
        'Fribourg': { lat: 46.8064, lng: 7.1621 },
        'Schaffhausen': { lat: 47.6952, lng: 8.6305 },
        'Vernier': { lat: 46.2102, lng: 6.0847 },
        'Neuchâtel': { lat: 46.9925, lng: 6.9292 },
        'Chur': { lat: 46.8500, lng: 9.5333 },
        'Sion': { lat: 46.2331, lng: 7.3608 }
      },
      'Ukrajina': {
        'Kijev': { lat: 50.4501, lng: 30.5234 }, // Kiev
        'Harkov': { lat: 49.9935, lng: 36.2304 }, // Kharkiv
        'Odessa': { lat: 46.4825, lng: 30.7233 },
        'Dnipro': { lat: 48.4647, lng: 35.0462 },
        'Donetsk': { lat: 48.0159, lng: 37.8029 },
        'Zaporizhzhia': { lat: 47.8388, lng: 35.1396 },
        'Lviv': { lat: 49.8397, lng: 24.0297 },
        'Kryvyi Rih': { lat: 47.9106, lng: 33.3913 },
        'Mykolaiv': { lat: 46.9750, lng: 31.9946 },
        'Mariupol': { lat: 47.0971, lng: 37.5434 },
        'Luhansk': { lat: 48.5740, lng: 39.3078 },
        'Vinnytsia': { lat: 49.2328, lng: 28.4817 },
        'Makiivka': { lat: 48.0478, lng: 37.9726 },
        'Sevastopol': { lat: 44.6054, lng: 33.5229 },
        'Simferopol': { lat: 44.9521, lng: 34.1024 },
        'Kherson': { lat: 46.6354, lng: 32.6169 },
        'Poltava': { lat: 49.5883, lng: 34.5514 },
        'Chernihiv': { lat: 51.4982, lng: 31.2893 },
        'Cherkasy': { lat: 49.4444, lng: 32.0598 },
        'Khmelnytskyi': { lat: 49.4229, lng: 26.9855 },
        'Zhytomyr': { lat: 50.2547, lng: 28.6587 },
        'Sumy': { lat: 50.9216, lng: 34.8003 },
        'Rivne': { lat: 50.6196, lng: 26.2513 },
        'Ivano-Frankivsk': { lat: 48.9215, lng: 24.7097 },
        'Ternopil': { lat: 49.5535, lng: 25.5948 }
      },
      'Združeno kraljestvo': {
        'London': { lat: 51.5074, lng: -0.1278 },
        'Birmingham': { lat: 52.4862, lng: -1.8904 },
        'Glasgow': { lat: 55.8642, lng: -4.2518 },
        'Liverpool': { lat: 53.4084, lng: -2.9916 },
        'Bristol': { lat: 51.4545, lng: -2.5879 },
        'Manchester': { lat: 53.4808, lng: -2.2426 },
        'Sheffield': { lat: 53.3811, lng: -1.4701 },
        'Leeds': { lat: 53.8008, lng: -1.5491 },
        'Edinburgh': { lat: 55.9533, lng: -3.1883 },
        'Leicester': { lat: 52.6369, lng: -1.1398 },
        'Coventry': { lat: 52.4068, lng: -1.5197 },
        'Bradford': { lat: 53.7960, lng: -1.7594 },
        'Cardiff': { lat: 51.4816, lng: -3.1791 },
        'Belfast': { lat: 54.5973, lng: -5.9301 },
        'Nottingham': { lat: 52.9548, lng: -1.1581 },
        'Kingston upon Hull': { lat: 53.7676, lng: -0.3274 },
        'Newcastle upon Tyne': { lat: 54.9783, lng: -1.6178 },
        'Stoke-on-Trent': { lat: 53.0027, lng: -2.1794 },
        'Southampton': { lat: 50.9097, lng: -1.4044 },
        'Derby': { lat: 52.9217, lng: -1.4769 },
        'Portsmouth': { lat: 50.8198, lng: -1.0879 },
        'Brighton': { lat: 50.8225, lng: -0.1372 },
        'Plymouth': { lat: 50.3755, lng: -4.1427 },
        'Northampton': { lat: 52.2405, lng: -0.9027 },
        'Reading': { lat: 51.4543, lng: -0.9781 },
        'Luton': { lat: 51.8787, lng: -0.4200 },
        'Wolverhampton': { lat: 52.5871, lng: -2.1291 },
        'Blackpool': { lat: 53.8175, lng: -3.0357 },
        'Aberdeen': { lat: 57.1497, lng: -2.0943 },
        'Cambridge': { lat: 52.2053, lng: 0.1218 },
        'Oxford': { lat: 51.7520, lng: -1.2577 },
        'Norwich': { lat: 52.6309, lng: 1.2974 },
        'York': { lat: 53.9600, lng: -1.0873 },
        'Swansea': { lat: 51.6214, lng: -3.9436 },
        'Exeter': { lat: 50.7184, lng: -3.5339 },
        'Milton Keynes': { lat: 52.0406, lng: -0.7594 }
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
    function findNearbyCity(country, city, maxDistance = 100) {  // Default set to 100km
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