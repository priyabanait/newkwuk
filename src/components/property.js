import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Properties = () => {
  const [price, setPrice] = useState(750000);
  const [visibleCount, setVisibleCount] = useState(6);

  const [propertyType, setPropertyType] = useState('PROPERTY TYPE');
  const [marketCenter, setMarketCenter] = useState('MARKET CENTER');
  const [propertySubType, setPropertySubType] = useState('PROPERTY SUBTYPE');
  const [city, setCity] = useState('CITY');

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://kw-backend-q6ej.vercel.app/api/listings/list/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            limit: 2000,
           
            page: 1,
          
          })
        });



        const data = await res.json();
        let fetched = [];
        if (Array.isArray(data?.data)) {
          fetched = data.data;
        }
        console.log('Fetched properties:', fetched.slice(0, 2)); // Debug: log first 2 properties
        setProperties(fetched);
      } catch (err) {
        setError('Failed to load properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  // Filtering logic inside the component
  const filterBy = (prop, key, value) => {
    if (!value || value === key || value === 'All') return true;
    const v = value.toLowerCase().trim();
    
    if (key === 'PROPERTY TYPE') {
      const propType = String(prop.type || prop.prop_type || '').toLowerCase().trim();
      return propType.includes(v) || v.includes(propType);
    }
    
    if (key === 'MARKET CENTER') {
      const marketCenter = String(prop.market_center || prop.center || '').toLowerCase().trim();
      return marketCenter.includes(v) || v.includes(marketCenter);
    }
    
    if (key === 'PROPERTY SUBTYPE') {
      const subType = String(prop.subtype || prop.property_subtype || '').toLowerCase().trim();
      return subType.includes(v) || v.includes(subType);
    }
    
    if (key === 'CITY') {
      const cityValues = [
        prop.city,
        prop.region,
        prop.municipality,
        prop.list_address?.city,
        prop.property_address?.city
      ].filter(val => val != null && val !== undefined).map(val => String(val).toLowerCase().trim());
      
      return cityValues.some(city => city.includes(v) || v.includes(city));
    }
    
    return true;
  };

  const filteredProperties = properties.filter(prop => {
    // Filter by price
    const propPrice = prop.price || prop.current_list_price || 0;
    if (propPrice > price) return false;
    
    // Filter by property type
    if (!filterBy(prop, 'PROPERTY TYPE', propertyType)) return false;
    
    // Filter by market center
    if (!filterBy(prop, 'MARKET CENTER', marketCenter)) return false;
    
    // Filter by property subtype
    if (!filterBy(prop, 'PROPERTY SUBTYPE', propertySubType)) return false;
    
    // Filter by city
    if (!filterBy(prop, 'CITY', city)) return false;
    
    return true;
  });

  // Debug: Log filter counts
  useEffect(() => {
    if (properties.length > 0) {
      console.log('Filter states:', {
        propertyType,
        marketCenter,
        propertySubType,
        city,
        price,
        totalProperties: properties.length,
        filteredCount: filteredProperties.length
      });
    }
  }, [propertyType, marketCenter, propertySubType, city, price, properties, filteredProperties]);

  const bedIconUrl = "/bed.png";
  const bathIconUrl = "/bath.png";
  const areaIconUrl = "/area.png";
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 text-[10px] md:text-xs w-full mt-4 md:mt-12 max-w-full px-4 md:px-34">
  {/* Row 1 - First two dropdowns */}
  <div className="col-span-1">
    <select
      className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center"
      value={propertyType}
      onChange={e => setPropertyType(e.target.value)}
    >
      <option>PROPERTY TYPE</option>
      <option>All</option>
      <option>Commercial</option>
      <option>Farm and Agriculture</option>
      <option>Lots and Land</option>
      <option>Residential</option>
    </select>
  </div>
  
  <div className="col-span-1">
    <select
      className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center"
      value={marketCenter}
      onChange={e => setMarketCenter(e.target.value)}
    >
      <option>MARKET CENTER</option>
      <option>All</option>
      <option>Jasmin</option>
      <option>Jeddah</option>
    </select>
  </div>

  {/* Row 2 - Next two dropdowns */}
  <div className="col-span-1 mt-3 md:mt-0">
    <select
      className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center"
      value={propertySubType}
      onChange={e => setPropertySubType(e.target.value)}
    >
      <option>PROPERTY SUBTYPE</option>
      <option>All</option>
      <option>Apartment</option>
      <option>Condominium</option>
      <option>Duplex</option>
      <option>Hotel-Motel</option>
      <option>Industrial</option>
      <option>Mobile Home</option>
      <option>Multi-Family</option>
      <option>Other</option>
      <option>Quadruplex</option>
      <option>Ranch</option>
      <option>Single Family Attach</option>
      <option>Single Family detached</option>
      <option>Townhouse</option>
      <option>Unimproved land</option>
      <option>Warehouse</option>
    </select>
  </div>

  <div className="col-span-1 mt-3 md:mt-0">
    <select
      className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center"
      value={city}
      onChange={e => setCity(e.target.value)}
    >
      <option>CITY</option>
      <option>All</option>
      <option>ALRIYADH</option>
      <option>JED</option>
      <option>JEDDAH</option>
      <option>Jeddah</option>
      <option>Jeddah city</option>
      <option>KSA</option>
      <option>Khobar</option>
      <option>Riyadh</option>
      <option>Saudi Arabia</option>
      <option>alriyadh</option>
      <option>jeddah</option>
      <option>jedah</option>
      <option>riyad</option>
      <option>riyadh</option>
      <option>الرياض</option>
      <option>جدة</option>
      <option>جده</option>
    </select>
  </div>

  <div className="flex flex-col col-span-2 md:col-span-1 items-center md:items-start text-center md:text-left md:ml-10">
  <label htmlFor="price" className="mb-1 mr-33 md:mr-0 text-gray-700 text-sm md:text-[0.9rem] leading-tight ">
    PRICE
  </label>
  <input
    type="range"
    id="price"
    min="0"
    max="1000000"
    step="10000"
    value={price}
    onChange={e => setPrice(Number(e.target.value))}
    className="w-40 h-1 bg-black rounded-lg appearance-none 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:h-4 
      [&::-webkit-slider-thumb]:w-4 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-[rgba(202,3,32,255)]"
  />
  <span className="md:text-[0.9rem] text-sm mt-4 ml-35 md:ml-28">{price.toLocaleString()} SAR</span>
</div>

      </div>

      <p className="md:mt-6 mt-2 md:text-[0.9rem] text-sm leading-tight ml-6 text-gray-700">
        Total Listings : <span className="text-[rgba(202,3,32,255)] font-semibold">{filteredProperties.length}</span>
      </p>

      <div className="min-h-screen p-6">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[rgba(202,3,32,255)] border-solid"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.slice(0, visibleCount).map((prop, idx) => (
              <div
                key={prop._kw_meta?.id || prop.id || idx}
                className="bg-gray-100 rounded-3xl overflow-hidden w-full cursor-pointer"
                onClick={() => {
                  localStorage.setItem('selectedProperty', JSON.stringify(prop));
                  window.location.href = '/propertydetails';
                }}
              >
                <div className="relative w-full h-60">
                  {/* 360 logo overlay */}
                  <div className="absolute top-3 left-3 z-20 w-10 h-10">
                    <Image
                      src="/360logo.png"
                      alt="360 logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <Image
                    src={
                      prop.image ||
                      (Array.isArray(prop.images) && prop.images[0]) ||
                      (Array.isArray(prop.photos) && prop.photos[0]?.ph_url) ||
                      '/property.jpg'
                    }
                    alt={prop.title || prop.prop_type || 'property'}
                    fill
                    className="object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-baseline mb-1 md:my-6 my-4">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <span className="relative w-5 h-5">
                        <Image src='/currency.png' alt="currency" fill className="object-cover rounded-3xl" />
                      </span>
                      {(prop.price || prop.current_list_price || 0).toLocaleString()}
                    </h2>
                    <p className="text-sm">{prop.agent || prop.agent_name || '-'}</p>
                  </div>

                  <div className="flex justify-between items-center md:my-6 my-4">
                    <div className="flex items-center text-sm mb-2">
                      <span className="flex items-center gap-2 mr-4">
                        <span className="relative w-6 h-6">
                          <Image src={bathIconUrl} alt="bath" fill className="object-contain" />
                        </span>
                        {prop.total_bath || prop.baths || prop.bathrooms || 0}
                      </span>
                      <span className="flex items-center gap-2 mr-4">
                        <span className="relative w-6 h-6">
                          <Image src={bedIconUrl} alt="bed" fill className="object-contain" />
                        </span>
                        {prop.total_bed || prop.beds || prop.bedrooms || 0}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="relative w-6 h-6">
                          <Image src={areaIconUrl} alt="area" fill className="object-contain" />
                        </span>
                        {prop.lot_size_area || prop.area || prop.sqft || 0} {prop.lot_size_units || ''}
                      </span>
                    </div>
                    <p className="text-base mb-2">{prop.type || prop.prop_type || '-'}</p>
                  </div>

                  <p className="text-lg">
                    {
                      typeof prop.list_address?.address === 'string' ? prop.list_address.address
                      : typeof prop.property_address?.address === 'string' ? prop.property_address.address
                      : typeof prop.location === 'string' ? prop.location
                      : prop.city || prop.region || prop.municipality || '-'
                    }
                  </p>
                  <button className="mt-10 w-full bg-black text-white py-2 rounded-full font-semibold md:text-base text-sm hover:bg-[rgba(202,3,32,255)] transition">
                    View Property Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {visibleCount < filteredProperties.length && !loading && !error && (
        <div className="flex justify-center items-center md:mt-5">
          <button
            className="md:w-3/6 w-40 md:py-2 py-2 mb-10 md:mb-0 px-4  bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white text-xs md:text-lg font-semibold rounded-full transition whitespace-nowrap"
            onClick={() => setVisibleCount(c => c + 6)}
          >
            View More Properties..
          </button>
        </div>
      )}
      <div className="hidden md:flex justify-center py-4 md:py-16">
        <Image
          src="/howwillyouthink.png"
          alt="How Will You Thrive"
          width={800}
          height={400}
          className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
        />
      </div>

      <hr className="hidden md:block w-6/12 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px] mt-5 md:mt-20 mb-16" />
    </div>
  );
}

export default Properties;
