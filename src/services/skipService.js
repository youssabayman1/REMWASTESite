import { get } from "./httpClient";

const formatSkipData = (skip) => {
  const priceWithVat = skip.price_before_vat + (skip.price_before_vat * (skip.vat / 100));
  const restrictions = [];

  if (!skip.allows_heavy_waste) {
    restrictions.push({
      text: 'Not Suitable For Heavy Waste',
      icon: '/images/img_errorsvgrepocom_1_1.svg',
      color: '#b95a4f'
    });
  }

  if (!skip.allowed_on_road) {
    restrictions.push({
      text: 'Not Allowed On The Road',
      icon: '/images/img_errorsvgrepocom_1_2.svg',
      color: '#a88b14'
    });
  }

  if (skip.forbidden) {
    restrictions.push({
      text: 'Not Available in Your Area',
      icon: '/images/img_errorsvgrepocom_1_1.svg',
      color: '#b95a4f'
    });
  }

  return {
    id: skip.id,
    name: `${skip.size} Yard Skip`,
    price: `£${Math.round(priceWithVat)}`,
    price_before_vat: skip.price_before_vat,
    vat: skip.vat,
    duration: `${skip.hire_period_days} day hire`,
    image: '/images/img_image_160x304.png',
    restrictions,
    hasRestrictions: restrictions.length > 0,
    transport_cost: skip.transport_cost,
    per_tonne_cost: skip.per_tonne_cost,
    size: skip.size,
    allows_heavy_waste: skip.allows_heavy_waste,
    allowed_on_road: skip.allowed_on_road,
    forbidden: skip.forbidden
  };
};

export const skipService = {
  getSkipsByLocation: async (postcode = '', area = '') => {
    try {
      const response = await get('/skips/by-location', {
        params: {
          postcode,
          area
        }
      });

      if (!response?.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from API');
      }

      return response.data
        .filter(skip => !skip.forbidden)
        .map(formatSkipData)
        .sort((a, b) => a.size - b.size);
    } catch (error) {
      console.error('Error fetching skips:', error);
      throw error;
    }
  }
}; 