import { ALL_EVENTS } from '../constants';

export const createSlug = (title) => (
  String(title || 'race')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
);

export const getFallbackRaces = () => (
  ALL_EVENTS.map((item) => ({
    _id: `fallback-${item.id}`,
    slug: createSlug(item.title),
    title: item.title,
    category: item.category === 'Running' ? 'Marathon' : item.category,
    location: item.location,
    date: item.date === 'Every Sunday' || item.date === 'Weekly' ? '2026-10-15T06:00:00.000Z' : new Date(item.date).toISOString(),
    organizer: 'PACEFORGE Athletic Association',
    price: item.price === 'Free' ? 0 : (Number(item.price.replace(/[^0-9]/g, '')) || 999),
    priceVerified: true,
    status: 'OPEN',
    imageUrl: item.image,
    venue: `${item.location} Performance Arena`,
    description: `Official PACEFORGE ${item.category} event. Join thousands of endurance athletes in ${item.location}.`,
    distances: ['5 KM', '10 KM', '21.1 KM', '42.2 KM']
  }))
);

export const getFallbackRaceBySlug = (slug) => {
  const races = getFallbackRaces();
  return races.find((r) => r.slug === slug) || races[0];
};
