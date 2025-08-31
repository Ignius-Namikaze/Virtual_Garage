document.addEventListener('DOMContentLoaded', () => {
    // Data from your Hotwheels Entries.csv file
    const carData = [
        {"Sr.No.": 1, "Car Name": "Aston Martin DB4GT High-Speed Edition", "Model": "Muscle Mania", "Year": 2024},
        {"Sr.No.": 2, "Car Name": "Camaro M1", "Model": "", "Year": 1995},
        {"Sr.No.": 3, "Car Name": "TBR (KFC)", "Model": "", "Year": 2009},
        {"Sr.No.": 4, "Car Name": "Ford GT", "Model": "", "Year": 1999},
        {"Sr.No.": 5, "Car Name": "Asphalt Assault", "Model": "", "Year": 2003},
        {"Sr.No.": 6, "Car Name": "F1 McDonald's Happy Meal", "Model": "Open-Wheel Racer", "Year": 2012},
        {"Sr.No.": 7, "Car Name": "Bone Shaker", "Model": "", "Year": 2015},
        {"Sr.No.": 8, "Car Name": "Twin Mill", "Model": "", "Year": 2015},
        {"Sr.No.": 9, "Car Name": "Scirocco GT 24", "Model": "", "Year": 2009},
        {"Sr.No.": 10, "Car Name": "ROVIO collaboration", "Model": "Angry Bird", "Year": 2012},
        {"Sr.No.": 11, "Car Name": "Max Steel", "Model": "", "Year": 2013},
        {"Sr.No.": 12, "Car Name": "CHICANE", "Model": "Coupe", "Year": 2010},
        {"Sr.No.": 13, "Car Name": "70 Plymouth AAR Cuda", "Model": "Night Burnerz", "Year": 2015},
        {"Sr.No.": 14, "Car Name": "Corvette Stingray '63 Split Window", "Model": "2008 All Stars", "Year": 1979},
        {"Sr.No.": 15, "Car Name": "West Coast Flyer", "Model": "", "Year": 2019},
        {"Sr.No.": 16, "Car Name": "Group C Fantasy", "Model": "", "Year": 2022},
        {"Sr.No.": 17, "Car Name": "Toyota AE86 Sprinter Trueno", "Model": "Ultra Hots", "Year": 2024},
        {"Sr.No.": 18, "Car Name": "Porsche 935-78", "Model": "Ultra Hots", "Year": 2024},
        {"Sr.No.": 19, "Car Name": "Porsche 911 Carrera", "Model": "", "Year": 2023},
        {"Sr.No.": 20, "Car Name": "Batmobile Arkham Knight", "Model": "", "Year": 2015},
        {"Sr.No.": 21, "Car Name": "Mo-Stash", "Model": "", "Year": 2023},
        {"Sr.No.": 22, "Car Name": "F-150 SVT Lightning", "Model": "", "Year": 2020},
        {"Sr.No.": 23, "Car Name": "Batmobile Tumbler", "Model": "", "Year": 2006},
        {"Sr.No.": 24, "Car Name": "17 Audi RS 6 Avant", "Model": "Forza ", "Year": 2017},
        {"Sr.No.": 25, "Car Name": "Mazda RX-3", "Model": "Tooned", "Year": 2023},
        {"Sr.No.": 26, "Car Name": "95 Mazda RX-7", "Model": "", "Year": 2017},
        {"Sr.No.": 27, "Car Name": "Muscle and Blown GRX50", "Model": "", "Year": 2020},
        {"Sr.No.": 28, "Car Name": "82 Corvette Stingray", "Model": "Multi-Pack Exclusive", "Year": 2021},
        {"Sr.No.": 29, "Car Name": "HW-4-Trac", "Model": "", "Year": 2022},
        {"Sr.No.": 30, "Car Name": "Skyline 2000 GT-R LBWK", "Model": "Tooned", "Year": 2023},
        {"Sr.No.": 31, "Car Name": "Ravenger S/T", "Model": "", "Year": 2023},
        {"Sr.No.": 32, "Car Name": "70 Dodge Charger", "Model": "Tooned", "Year": 2022},
        {"Sr.No.": 33, "Car Name": "94 Toyota Supra", "Model": "Tooned", "Year": 2022},
        {"Sr.No.": 34, "Car Name": "Dune Crusher", "Model": "HW Off-Road: Off Track", "Year": 2014},
        {"Sr.No.": 35, "Car Name": "BIGFOOT truck", "Model": "Monster Truck", "Year": 2012},
        {"Sr.No.": 36, "Car Name": "Chevy Camaro Special Edition", "Model": "", "Year": 2013},
        {"Sr.No.": 37, "Car Name": "MIG RIG", "Model": "HW Racing: HW Race Team", "Year": 2013},
        {"Sr.No.": 38, "Car Name": "10 Toyota Tundra", "Model": "Olympic Games Tokyo 2020", "Year": 2020},
        {"Sr.No.": 39, "Car Name": "RD-08", "Model": "AcceleRacers: Racing Drones", "Year": 2005},
        {"Sr.No.": 40, "Car Name": "Ford Transit Connect", "Model": "HW City Works", "Year": 2017},
        {"Sr.No.": 41, "Car Name": "Lamborghini Countach", "Model": "Tooned", "Year": 2018},
        {"Sr.No.": 42, "Car Name": "Porsche 934 Turbo RSR", "Model": "HW City: Planet Heroes", "Year": 2019},
        {"Sr.No.": 43, "Car Name": "2010 Ford Mustang GT", "Model": "2009 New Models", "Year": 2009},
        {"Sr.No.": 44, "Car Name": "Dodge Viper SRT10 ACR", "Model": "2010 New Models", "Year": 2017},
        {"Sr.No.": 45, "Car Name": "Epic Fast (The Flash)", "Model": "McDonald's Super Heroes", "Year": 2016},
        {"Sr.No.": 46, "Car Name": "Small Bloc", "Model": "Tooned", "Year": 2024},
        {"Sr.No.": 47, "Car Name": "67 Shelby GT500", "Model": "Night Burnerz", "Year": 2010},
        {"Sr.No.": 48, "Car Name": "Nissan 300ZX Twin Turbo", "Model": "Night Burnerz", "Year": 2024},
        {"Sr.No.": 49, "Car Name": "Megane Trophy", "Model": "Night Burnerz", "Year": 2024},
        {"Sr.No.": 50, "Car Name": "2018 COPO Camaro SS", "Model": "Night Burnerz", "Year": 2024},
        {"Sr.No.": 51, "Car Name": "Gazella R", "Model": "Night Burnerz", "Year": 2024},
        {"Sr.No.": 52, "Car Name": "17 Acura NSX", "Model": "HW Motor Show", "Year": 2024},
        {"Sr.No.": 53, "Car Name": "Corvette C8.R", "Model": "HW Motor Show", "Year": 2024},
        {"Sr.No.": 54, "Car Name": "Aston Martin Vantage GTE", "Model": "HW Motor Show", "Year": 2024},
        {"Sr.No.": 55, "Car Name": "McLaren Senna", "Model": "HW Motor Show", "Year": 2024},
        {"Sr.No.": 56, "Car Name": "20 Jaguar F-type", "Model": "HW Motor Show", "Year": 2024},
        {"Sr.No.": 57, "Car Name": "85 Honda City Turbo II", "Model": "Ultra Hots", "Year": 2024},
        {"Sr.No.": 58, "Car Name": "Hirotaka Merc", "Model": "Rod Squad", "Year": 2024},
        {"Sr.No.": 59, "Car Name": "Custom Volkswagen Beetle", "Model": "Ultra Hots", "Year": 2024},
        {"Sr.No.": 60, "Car Name": "91 GMC Syclone", "Model": "HW The 90's", "Year": 2024},
        {"Sr.No.": 61, "Car Name": "Mustang Funny Car", "Model": "HW Art Cars", "Year": 2024},
        {"Sr.No.": 62, "Car Name": "Speed Hauler", "Model": "Trackin' Trucks", "Year": 2013},
        {"Sr.No.": 63, "Car Name": "Super Twin Mill", "Model": "Let's Race", "Year": 2025},
        {"Sr.No.": 64, "Car Name": "VW Bug Bumblebee", "Model": "HW Screen Time", "Year": 2024},
        {"Sr.No.": 65, "Car Name": "Shelby Cobra \"DAYTONA\" Coupe", "Model": "HW Race Day", "Year": 2024},
        {"Sr.No.": 66, "Car Name": "Porche 928S Safari", "Model": "HW Dirt(TH)", "Year": 2024},
        {"Sr.No.": 67, "Car Name": "Ford Performance Supervan 4", "Model": "HW First Response(TH)", "Year": 2024},
        {"Sr.No.": 68, "Car Name": "King Kuda(Plymouth Barracuda)", "Model": "HW Art Cars", "Year": 2024},
        {"Sr.No.": 69, "Car Name": "Bugatti Bolide", "Model": "HW Exotics", "Year": 2024},
        {"Sr.No.": 70, "Car Name": "TMNT Party Wagon", "Model": "Pop Culture: TMNT", "Year": 2024},
        {"Sr.No.": 71, "Car Name": "HW Poppa Wheelie", "Model": "HW Drag Strip", "Year": 2023},
        {"Sr.No.": 72, "Car Name": "Lamborghini Countach Pace Car", "Model": "Retro Racer", "Year": 2024},
        {"Sr.No.": 73, "Car Name": "70 Ford Mustang MACH 1", "Model": "Retro Racer", "Year": 2024},
        {"Sr.No.": 74, "Car Name": "Head Starter", "Model": "Retro Racer", "Year": 2024},
        {"Sr.No.": 75, "Car Name": "Erikenstein Rod", "Model": "Retro Racer", "Year": 2024},
        {"Sr.No.": 76, "Car Name": "Porche 917 LH", "Model": "Retro Racer", "Year": 2024},
        {"Sr.No.": 77, "Car Name": "67 Lotus Type 49", "Model": "HW Race Day", "Year": 2024},
        {"Sr.No.": 78, "Car Name": "VM T3 Custom", "Model": "HW Vans", "Year": 2024},
        {"Sr.No.": 79, "Car Name": "Porche 904 Carrera GTS", "Model": "HW Race Day", "Year": 2025},
        {"Sr.No.": 80, "Car Name": "56 Ford F-100", "Model": "HW Flames", "Year": 2025},
        {"Sr.No.": 81, "Car Name": "83 Chevy Silverado", "Model": "HW Flames", "Year": 2025},
        {"Sr.No.": 82, "Car Name": "64 Impala", "Model": "HW Flames", "Year": 2025},
        {"Sr.No.": 83, "Car Name": "BLVD. Bruiser", "Model": "HW Flames", "Year": 2025},
        {"Sr.No.": 84, "Car Name": "Muscle Speeder", "Model": "HW Flames", "Year": 2025},
        {"Sr.No.": 85, "Car Name": "Kool Kombi", "Model": "Pop Culture 80 year", "Year": 2025},
        {"Sr.No.": 86, "Car Name": "Mazda 787B", "Model": "HW Race Day", "Year": 2024},
        {"Sr.No.": 87, "Car Name": "Cruise Bruiser", "Model": "HW Reverse Rake", "Year": 2025},
        {"Sr.No.": 88, "Car Name": "Toyota GR86 Cup", "Model": "Compact Kings", "Year": 2025},
        {"Sr.No.": 89, "Car Name": "Czinger 21C", "Model": "Peak Pursuit", "Year": 2025},
        {"Sr.No.": 90, "Car Name": "Alfa Romeo Giulia TI Super", "Model": "Compact Kings", "Year": 2025},
        {"Sr.No.": 91, "Car Name": "Honda Motocompo", "Model": "HW Moto ", "Year": 2025},
        {"Sr.No.": 92, "Car Name": "GruMobile", "Model": "HW Screen Time", "Year": 2018},
        {"Sr.No.": 93, "Car Name": "Shelby Cobra 427 S/C", "Model": "HW Rolling Metal", "Year": 2024},
        {"Sr.No.": 94, "Car Name": "McLaren Solus GT", "Model": "HW Modified", "Year": 2024},
        {"Sr.No.": 95, "Car Name": "HW50 Concept", "Model": "Rod Squad", "Year": 2025},
        {"Sr.No.": 96, "Car Name": "Batman : Arkham Asylum Batmobile", "Model": "Batman", "Year": 2025},
        {"Sr.No.": 97, "Car Name": "Long Bloc", "Model": "HW Art Cars", "Year": 2025},
        {"Sr.No.": 98, "Car Name": "Nerve Hammer", "Model": "X-Racers", "Year": 2025},
        {"Sr.No.": 99, "Car Name": "87 Audi Quattro", "Model": "HW Turbo", "Year": 2024},
        {"Sr.No.": 100, "Car Name": "Disney Steamboat", "Model": "HW Screen Time", "Year": 2025},
        {"Sr.No.": 101, "Car Name": "Hover Storm", "Model": "HW Dirt ", "Year": 2024},
        {"Sr.No.": 102, "Car Name": "Batman & Robin Batmobile", "Model": "Batman", "Year": 2025},
        {"Sr.No.": 103, "Car Name": "Tooned Twin Mill", "Model": "Green and Gold", "Year": 2024},
        {"Sr.No.": 104, "Car Name": "Mclaren f1", "Model": "HW The 90's", "Year": 2024},
        {"Sr.No.": 105, "Car Name": "Custom Cadillac Fleetwood", "Model": "Rod Squad", "Year": 2025},
        {"Sr.No.": 106, "Car Name": "Hi-Roller", "Model": "Batman 5 pack", "Year": 2024},
        {"Sr.No.": 107, "Car Name": "Decidedly Go", "Model": "Experimotors", "Year": 2025},
        {"Sr.No.": 108, "Car Name": "Batmobile", "Model": "Batman", "Year": 2025},
        {"Sr.No.": 109, "Car Name": "WHAT-4-2", "Model": "Track Builder Unlimited", "Year": 2020},
        {"Sr.No.": 110, "Car Name": "Hypertruck", "Model": "Track Builder Unlimited", "Year": 2020},
        {"Sr.No.": 111, "Car Name": "Volkswagen Kafer Racer", "Model": "Volkswagen", "Year": 2019},
        {"Sr.No.": 112, "Car Name": "5 Alarm", "Model": "HW City: HW Rescue", "Year": 2015},
        {"Sr.No.": 113, "Car Name": "Super Van", "Model": "HW City: HW Rescue", "Year": 2015},
        {"Sr.No.": 114, "Car Name": "Crescendo", "Model": "X-Racers", "Year": 2025},
        {"Sr.No.": 115, "Car Name": "Monteracer", "Model": "X-Racers", "Year": 2025},
        {"Sr.No.": 116, "Car Name": "Futurismo", "Model": "HW Race Day", "Year": 2025},
        {"Sr.No.": 117, "Car Name": "Land-Rover Series II", "Model": "HW Hot Trucks", "Year": 2025},
        {"Sr.No.": 118, "Car Name": "Tanknator", "Model": "HW Ride-ons", "Year": 2025},
        {"Sr.No.": 119, "Car Name": "Ferrari F40 Competizone", "Model": "Exotics Exotiques", "Year": 2025},
        {"Sr.No.": 120, "Car Name": "Ford Model A custom/Personnalise '31", "Model": "Dirt: Mordus de Poussiere", "Year": 2025}
    ];

    // Set the total car count in the intro
    document.getElementById('car-count').textContent = carData.length;

    const garageContainer = document.getElementById('garage-container');
    const searchBar = document.getElementById('search-bar');
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    const displayCars = (cars) => {
        garageContainer.innerHTML = '';
        cars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            // Required for the absolute positioning of the badge
            carCard.style.position = 'relative'; 

            const isTreasureHunt = car.Model.includes('(TH)');

            carCard.innerHTML = `
                ${isTreasureHunt ? '<div class="th-badge">TH</div>' : ''}
                <img src="/images/${car['Sr.No.']}.jpg" alt="${car['Car Name']}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200.png?text=Image+Missing';">
                <div class="car-info">
                    <h3 class="car-name">${car['Car Name']}</h3>
                    <p class="car-details"><strong>Series:</strong> ${car.Model || 'N/A'}</p>
                    <p class="car-details"><strong>Year:</strong> ${car.Year}</p>
                </div>
            `;
            carCard.addEventListener('click', () => fetchAndShowDetails(car));
            garageContainer.appendChild(carCard);
        });
    };

    const fetchAndShowDetails = async (car) => {
        modalContainer.style.display = 'flex';
        modalBody.innerHTML = `<p class="loading-text">Firing up the engine... Scraping Fandom Wiki!</p>`;

        try {
            const response = await fetch(`/api/get-car-details?name=${encodeURIComponent(car['Car Name'])}&year=${car.Year}`);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Build the details definition list
            let detailsListHtml = '<dl>';
            for (const [key, value] of Object.entries(data)) {
                if (key !== 'imageUrl' && key !== 'name') {
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    detailsListHtml += `<dt>${formattedKey}</dt><dd>${value || 'N/A'}</dd>`;
                }
            }
            detailsListHtml += '</dl>';

            // Create a Fandom URL for an external link
            const fandomSearchUrl = `https://hotwheels.fandom.com/wiki/Special:Search?query=${encodeURIComponent(`Hot Wheels ${car['Car Name']} ${car['Year']}`)}`;

            // Build the final modal HTML with the new layout
            modalBody.innerHTML = `
                <h2>${data.name || car['Car Name']}</h2>
                <img class="modal-image" src="${data.imageUrl}" alt="${car['Car Name']}" onerror="this.src='https://via.placeholder.com/300x200.png?text=Image+Not+Found'">
                <div class="modal-info">
                    ${detailsListHtml}
                    <a href="${fandomSearchUrl}" target="_blank" class="fandom-link">View on Fandom Wiki →</a>
                </div>
            `;

        } catch (error) {
            modalBody.innerHTML = `<p class="loading-text" style="color: #c00;">Error: ${error.message}</p>`;
        }
    };

    const filterCars = () => {
        const query = searchBar.value.toLowerCase();
        const filteredCars = carData.filter(car =>
            car['Car Name'].toLowerCase().includes(query) ||
            (car.Model && car.Model.toLowerCase().includes(query)) ||
            car.Year.toString().includes(query)
        );
        displayCars(filteredCars);
    };

    closeButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target == modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    displayCars(carData);
    searchBar.addEventListener('keyup', filterCars);
});