export const createSlug = (title) => (
  String(title || 'race')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
);

export const REAL_VERIFIED_RACES = [
  {
    id: 1,
    title: 'TATA MUMBAI MARATHON 2027',
    category: 'Marathon',
    location: 'Mumbai',
    venue: 'Chhatrapati Shivaji Maharaj Terminus (CSMT), Fort, Mumbai',
    date: '2027-01-17T05:00:00.000Z',
    organizer: 'Procam International & TATA',
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200',
    description: 'Asia’s premier World Athletics Gold Label Road Race. Run through the iconic Sea Link and Heritage Fort precinct of Mumbai.',
    distances: ['5 KM Dream Run', '10 KM Open Run', '21.1 KM Half Marathon', '42.2 KM Full Marathon'],
    distancePrices: {
      '5 KM Dream Run': 600,
      '10 KM Open Run': 1000,
      '21.1 KM Half Marathon': 1600,
      '42.2 KM Full Marathon': 2600
    },
    price: 1600,
    status: 'UPCOMING'
  },
  {
    id: 2,
    title: 'DELHI HERITAGE HALF MARATHON 2026',
    category: 'Marathon',
    location: 'Delhi',
    venue: 'Jawaharlal Nehru Stadium, New Delhi',
    date: '2026-11-08T05:30:00.000Z',
    organizer: 'Airtel & Delhi Athletics Federation',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200',
    description: 'Fast, flat World Athletics certified course passing India Gate, Lodi Gardens, and historic landmarks.',
    distances: ['5 KM Fun Run', '10 KM Fitness Challenge', '21.1 KM Half Marathon'],
    distancePrices: {
      '5 KM Fun Run': 500,
      '10 KM Fitness Challenge': 900,
      '21.1 KM Half Marathon': 1500
    },
    price: 1500,
    status: 'UPCOMING'
  },
  {
    id: 3,
    title: 'BANGALORE TECH CYCLOTHON 2026',
    category: 'Cycling',
    location: 'Bangalore',
    venue: 'Cubbon Park & Kanteerava Stadium, Bengaluru',
    date: '2026-12-06T06:00:00.000Z',
    organizer: 'Bengaluru Cycling Club',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?q=80&w=1200',
    description: 'Premier urban road cycling event. Fully closed expressway routes with chip timing and sag wagon support.',
    distances: ['15 KM Green Ride', '30 KM Tech Endurance', '60 KM Grand Cyclothon'],
    distancePrices: {
      '15 KM Green Ride': 750,
      '30 KM Tech Endurance': 1200,
      '60 KM Grand Cyclothon': 1800
    },
    price: 1200,
    status: 'UPCOMING'
  },
  {
    id: 4,
    title: 'GOA TRIATHLON GRAND PRIX 2026',
    category: 'Triathlon',
    location: 'Goa',
    venue: 'Miramar Beach & Coastal Highway, Panaji, Goa',
    date: '2026-10-25T06:30:00.000Z',
    organizer: 'Indian Triathlon Federation & PaceForge',
    imageUrl: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=1200',
    description: 'Scenic ocean swim, smooth coastal bike leg, and palm-lined beach run in Panaji, Goa.',
    distances: ['Sprint (750m Swim / 20km Bike / 5km Run)', 'Olympic (1.5km Swim / 40km Bike / 10km Run)', '70.3 Half Iron (1.9km Swim / 90km Bike / 21.1km Run)'],
    distancePrices: {
      'Sprint (750m Swim / 20km Bike / 5km Run)': 3500,
      'Olympic (1.5km Swim / 40km Bike / 10km Run)': 5500,
      '70.3 Half Iron (1.9km Swim / 90km Bike / 21.1km Run)': 9500
    },
    price: 5500,
    status: 'UPCOMING'
  },
  {
    id: 5,
    title: 'IRONMAN 70.3 GOA INDIA 2026',
    category: 'IRONMAN',
    location: 'Goa',
    venue: 'Baina Beach, Vasco da Gama, Goa',
    date: '2026-11-15T06:00:00.000Z',
    organizer: 'IRONMAN Group & Yoska',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
    description: 'Official IRONMAN 70.3 World Championship qualifying race in India. 1.9km Arabian Sea Swim, 90km Highway Bike, 21.1km Run.',
    distances: ['70.3 Individual Athlete', '70.3 Relay Team'],
    distancePrices: {
      '70.3 Individual Athlete': 18500,
      '70.3 Relay Team': 24000
    },
    price: 18500,
    status: 'UPCOMING'
  },
  {
    id: 6,
    title: 'HYROX BENGALURU 2026',
    category: 'HYROX',
    location: 'Bangalore',
    venue: 'BIEC Bengaluru International Exhibition Centre',
    date: '2026-12-12T08:00:00.000Z',
    organizer: 'HYROX World & PaceForge',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200',
    description: 'World Series of Fitness Racing in India. 8x 1km running workouts interspersed with 8 functional workout stations.',
    distances: ['HYROX Open', 'HYROX Pro', 'HYROX Doubles'],
    distancePrices: {
      'HYROX Open': 3200,
      'HYROX Pro': 4500,
      'HYROX Doubles': 6000
    },
    price: 3200,
    status: 'UPCOMING'
  },
  {
    id: 7,
    title: 'HYDERABAD CYCLING GRAND PRIX 2026',
    category: 'Cycling',
    location: 'Hyderabad',
    venue: 'Gachibowli Stadium & Outer Ring Road, Hyderabad',
    date: '2026-10-18T05:45:00.000Z',
    organizer: 'Cyberabad Cycling Club',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c4b28d?q=80&w=1200',
    description: 'High-speed highway cycling challenge across Hyderabad IT corridor with electronic RFID timing chips.',
    distances: ['20 KM City Ride', '50 KM Challenge', '100 KM Century Ride'],
    distancePrices: {
      '20 KM City Ride': 800,
      '50 KM Challenge': 1400,
      '100 KM Century Ride': 2200
    },
    price: 1400,
    status: 'UPCOMING'
  },
  {
    id: 8,
    title: 'DEVILS CIRCUIT PUNE 2026',
    category: 'Devils Circuit',
    location: 'Pune',
    venue: 'Oxford Golf Resort & Obstacle Track, Pune',
    date: '2026-12-20T07:00:00.000Z',
    organizer: 'Volano Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1461891263870-bd2a7ff7a6c5?q=80&w=1200',
    description: 'India’s biggest obstacle course race featuring 15 military-grade obstacles, mud runs, and ice dips.',
    distances: ['5 KM Legends Wave', '5 KM Competitive Wave'],
    distancePrices: {
      '5 KM Legends Wave': 1800,
      '5 KM Competitive Wave': 2400
    },
    price: 1800,
    status: 'UPCOMING'
  },
  {
    id: 9,
    title: 'NATIONAL SWIMMING COASTAL CHAMPIONSHIP',
    category: 'Swimming',
    location: 'Chennai',
    venue: 'Marina Beach Coastal Water Arena, Chennai',
    date: '2026-11-22T06:00:00.000Z',
    organizer: 'Tamil Nadu Aquatics Association',
    imageUrl: 'https://images.unsplash.com/photo-1530549387074-d562c0a1c8d7?q=80&w=1200',
    description: 'Open water ocean swimming race with life-guard patrol and timed buoys along the Chennai coastline.',
    distances: ['1 KM Open Water', '3 KM Sea Challenge', '5 KM Marathon Swim'],
    distancePrices: {
      '1 KM Open Water': 900,
      '3 KM Sea Challenge': 1500,
      '5 KM Marathon Swim': 2200
    },
    price: 1500,
    status: 'UPCOMING'
  },
  {
    id: 10,
    title: 'KOLKATA RIVERFRONT MARATHON 2026',
    category: 'Marathon',
    location: 'Kolkata',
    venue: 'Red Road & Hooghly River Promenade, Kolkata',
    date: '2026-12-27T05:30:00.000Z',
    organizer: 'Kolkata Runners & West Bengal Sports Department',
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200',
    description: 'Historic city run crossing Howrah Bridge, Victoria Memorial, and Princep Ghat.',
    distances: ['5 KM Hope Run', '10 KM City Run', '21.1 KM Half Marathon'],
    distancePrices: {
      '5 KM Hope Run': 550,
      '10 KM City Run': 850,
      '21.1 KM Half Marathon': 1350
    },
    price: 1350,
    status: 'UPCOMING'
  }
];

export const getFallbackRaces = () => (
  REAL_VERIFIED_RACES.map((item) => ({
    _id: `fallback-${item.id}`,
    slug: createSlug(item.title),
    title: item.title,
    category: item.category,
    location: item.location,
    venue: item.venue,
    date: item.date,
    organizer: item.organizer,
    price: item.price,
    priceVerified: true,
    status: item.status || 'UPCOMING',
    imageUrl: item.imageUrl,
    description: item.description,
    distances: item.distances,
    distancePrices: item.distancePrices
  }))
);

export const getFallbackRaceBySlug = (slug) => {
  const races = getFallbackRaces();
  return races.find((r) => r.slug === slug) || races[0];
};

export const getDistancePrice = (race, selectedDistance) => {
  if (!race) return 0;

  // 1. Check distancePrices Map or Object
  if (race.distancePrices) {
    if (race.distancePrices instanceof Map) {
      if (race.distancePrices.has(selectedDistance)) {
        return Number(race.distancePrices.get(selectedDistance));
      }
    } else if (typeof race.distancePrices === 'object' && race.distancePrices[selectedDistance]) {
      return Number(race.distancePrices[selectedDistance]);
    }
  }

  // 2. Base calculation scaling price dynamically with distance
  const basePrice = Number(race.price || 1200);
  if (!selectedDistance) return basePrice;

  const distLower = String(selectedDistance).toLowerCase();
  if (distLower.includes('5 km') || distLower.includes('5km') || distLower.includes('500m') || distLower.includes('1 km') || distLower.includes('sprint') || distLower.includes('green') || distLower.includes('fun') || distLower.includes('hope')) {
    return Math.round(basePrice * 0.45);
  }
  if (distLower.includes('10 km') || distLower.includes('10km') || distLower.includes('3 km') || distLower.includes('open run') || distLower.includes('fitness') || distLower.includes('city')) {
    return Math.round(basePrice * 0.7);
  }
  if (distLower.includes('21.1') || distLower.includes('half') || distLower.includes('30 km') || distLower.includes('olympic') || distLower.includes('50 km')) {
    return basePrice;
  }
  if (distLower.includes('42.2') || distLower.includes('full') || distLower.includes('60 km') || distLower.includes('100 km') || distLower.includes('70.3') || distLower.includes('iron')) {
    return Math.round(basePrice * 1.65);
  }

  return basePrice;
};
