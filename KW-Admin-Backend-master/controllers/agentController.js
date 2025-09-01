

import axios from 'axios';
import Agent from '../models/Agent.js';

export const syncAgentsFromKWPeople = async (req, res) => {
  try {
    // 1. Input: Org ID, single agent, and filters
    const org_id = req.body.org_id;
    const singleAgent = req.body.singleAgent; // kw_uid for single agent
    console.log('Requested org_id:', org_id);
    console.log('Single agent requested:', singleAgent);
    const activeFilter = req.query.active;
    const page = Number(req.query.page ?? 1);
    const perPage = req.query.limit ? Number(req.query.limit) : 50;

    // Define default org_ids for Jeddah and Jasmin market centers
    const defaultOrgIds = [2414288, 50449]; // Jeddah and Jasmin
    let orgIdsToFetch = [];

    // Determine which org_ids to fetch from
    if (org_id !== null && org_id !== undefined && org_id !== '') {
      orgIdsToFetch = [org_id];
    } else {
      orgIdsToFetch = defaultOrgIds;
      console.log('No org_id provided, fetching from both market centers:', orgIdsToFetch);
    }

    // 2. Headers
    const headers = {
      Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
      Accept: 'application/json',
    };

    // 3. Fetch all people from all specified org_ids
    let allPeople = [];
    
    for (const currentOrgId of orgIdsToFetch) {
      console.log(`Fetching from org_id: ${currentOrgId}`);
      const baseURL = `https://partners.api.kw.com/v2/listings/orgs/${currentOrgId}/people`;
      
      // Fetch all pages for this org_id
      let offset = 0;
      const apiLimit = req.query.limit ? Number(req.query.limit) : undefined;
      let first = true;
      let totalCount = 0;

      do {
        let url = `${baseURL}?page[offset]=${offset}`;
        if (apiLimit !== undefined) url += `&page[limit]=${apiLimit}`;
        console.log('Calling KW API URL:', url);
        
        try {
          const response = await axios.get(url, { headers });
          console.log(`KW People API Response for org ${currentOrgId}:`, JSON.stringify(response.data, null, 2));

          // Try to get people from different possible keys
          let peoplePage = [];
          if (Array.isArray(response.data?.people)) {
            peoplePage = response.data.people;
          } else if (Array.isArray(response.data?.results)) {
            peoplePage = response.data.results;
          } else if (Array.isArray(response.data?.data)) {
            peoplePage = response.data.data;
          } else {
            console.warn(`KW API returned no recognizable people array for org ${currentOrgId}.`);
          }

          if (first) {
            totalCount = response.data?.pagination?.total ?? peoplePage.length;
            first = false;
          }

          if (!Array.isArray(peoplePage)) break;
          if (peoplePage.length === 0) {
            console.warn(`KW API returned an empty people array for org ${currentOrgId} at offset ${offset}.`);
          }
          
          // Add org_id to each person for tracking
          const peopleWithOrgId = peoplePage.map(person => ({
            ...person,
            source_org_id: currentOrgId
          }));
          
          allPeople = allPeople.concat(peopleWithOrgId);
          console.log(`Total people received from org ${currentOrgId} so far:`, peopleWithOrgId.length);

          offset += apiLimit || 1000;
        } catch (orgError) {
          console.error(`Error fetching from org ${currentOrgId}:`, orgError.message);
          break; // Continue with next org_id
        }
      } while (offset < totalCount);
    }

    console.log("Total people from all orgs:", allPeople.length);

    // 4. Filter by single agent if requested
    if (singleAgent !== null && singleAgent !== undefined && singleAgent !== '') {
      const kwUid = String(singleAgent);
      allPeople = allPeople.filter(p => String(p.kw_uid) === kwUid);
      console.log(`After single agent filter (${kwUid}):`, allPeople.length);
    }

    // 5. Filter by `active` if present
    if (activeFilter !== undefined) {
      const isActive = activeFilter === 'true';
      allPeople = allPeople.filter(p => (p.active !== false) === isActive);
      console.log(`After active filter (${isActive}):`, allPeople.length);
    }

    // 6. If no people found, return early
    if (allPeople.length === 0) {
      console.warn('No agents found in KW API for requested criteria');
      return res.status(200).json({
        success: true,
        message: 'No agents found in KW API for the requested criteria.',
        org_ids: orgIdsToFetch,
        single_agent: singleAgent,
        data: [],
        total: 0,
      });
    }

    // 7. Sync to DB
    const syncedAgents = [];
    for (const person of allPeople) {
      const {
        kw_uid,
         // <-- use this
        first_name,
        last_name,
        photo,
        email,
        phone,
        market_center_number,
        city,
        active,
        slug,
      } = person;

      if (!kw_uid || !first_name) {
        console.warn('Skipping person due to missing kw_uid or first_name:', person);
        continue;
      }

      const generatedSlug = slug || kw_uid.toString().toLowerCase();

      const agentData = {
        slug: generatedSlug,
        kwId: kw_uid,
        fullName: `${first_name} ${last_name || ''}`.trim(),
        lastName: last_name || '',
        email: email || '',
        phone: phone || '',
        marketCenter: market_center_number || '',
        city: city || '',
        active: active !== false,
        photo: photo || '',
      };

      try {
      const updatedAgent = await Agent.findOneAndUpdate(
        { slug: generatedSlug },
        agentData,
        { new: true, upsert: true, runValidators: true }
      );
      syncedAgents.push(updatedAgent);
      } catch (dbErr) {
        console.error('Error syncing agent to DB:', dbErr.message, agentData);
      }
    }

    // 8. If single agent requested, get their listings
    let agentListings = null;
    if (singleAgent !== null && singleAgent !== undefined && singleAgent !== '' && syncedAgents.length > 0) {
      try {
        console.log(`Fetching listings for agent: ${singleAgent}`);
        agentListings = await getAgentListings(singleAgent);
      } catch (listingsError) {
        console.error('Error fetching agent listings:', listingsError.message);
        agentListings = { success: false, error: listingsError.message };
      }
    }

    // 9. Paginate response
    const paginated = syncedAgents.slice((page - 1) * perPage, page * perPage);

    // 10. Send response
    if (syncedAgents.length === 0) {
      console.warn('No agents were saved to the database');
      return res.status(200).json({
        success: true,
        message: 'No agents were saved to the database.',
        org_ids: orgIdsToFetch,
        single_agent: singleAgent,
        total: 0,
        page,
        per_page: perPage,
        count: 0,
        data: [],
        listings: agentListings
      });
    }

    const response = {
      success: true,
      org_ids: orgIdsToFetch,
      single_agent: singleAgent,
      total: syncedAgents.length,
      page,
      per_page: perPage,
      count: paginated.length,
      data: paginated,
    };

    // Add listings if single agent was requested
    if (singleAgent && agentListings) {
      response.listings = agentListings;
    }

    res.status(200).json(response);

  } catch (error) {
    console.error('KW People Sync Error:', error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to sync agents',
      error: error.message,
    });
  }
};

export const syncAgentsFromMultipleKWPeople = async (req, res) => {
  try {
    const orgIds = ['50449', '2414288'];
    const activeFilter = req.query.active;
    const page = Number(req.query.page ?? 1);
    const perPage = req.query.limit ? Number(req.query.limit) : 50;
    let allPeople = [];

    for (const org_id of orgIds) {
      const headers = {
        Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
        Accept: 'application/json',
      };
      const baseURL = `https://partners.api.kw.com/v2/listings/orgs/${org_id}/people`;
      let offset = 0;
      const apiLimit = req.query.limit ? Number(req.query.limit) : undefined;
      let first = true;
      let totalCount = 0;
      do {
        let url = `${baseURL}?page[offset]=${offset}`;
        if (apiLimit !== undefined) url += `&page[limit]=${apiLimit}`;
        const response = await axios.get(url, { headers });
        let peoplePage = [];
        if (Array.isArray(response.data?.people)) {
          peoplePage = response.data.people;
        } else if (Array.isArray(response.data?.results)) {
          peoplePage = response.data.results;
        } else if (Array.isArray(response.data?.data)) {
          peoplePage = response.data.data;
        }
        if (first) {
          totalCount = response.data?.pagination?.total ?? peoplePage.length;
          first = false;
        }
        if (!Array.isArray(peoplePage)) break;
        allPeople = allPeople.concat(peoplePage);
        offset += apiLimit;
      } while (offset < totalCount);
    }

    // Filter by active if present
    if (activeFilter !== undefined) {
      const isActive = activeFilter === 'true';
      allPeople = allPeople.filter(p => (p.active !== false) === isActive);
    }

    // Remove duplicates by slug (or kw_uid if slug missing)
    const seen = new Set();
    const uniquePeople = [];
    for (const person of allPeople) {
      const slug = person.slug || (person.kw_uid ? person.kw_uid.toString().toLowerCase() : undefined);
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        uniquePeople.push(person);
      }
    }

    // Sync to DB
    const syncedAgents = [];
    for (const person of uniquePeople) {
      const {
        kw_uid,
        first_name,
        last_name,
        photo,
        email,
        phone,
        market_center_number,
        city,
        active,
        slug,
      } = person;
      if (!kw_uid || !first_name) continue;
      const generatedSlug = slug || kw_uid.toString().toLowerCase();
      const agentData = {
        slug: generatedSlug,
        kwId: kw_uid,
        fullName: `${first_name} ${last_name || ''}`.trim(),
        lastName: last_name || '',
        email: email || '',
        phone: phone || '',
        marketCenter: market_center_number || '',
        city: city || '',
        active: active !== false,
        photo: photo || '',
      };
      try {
        const updatedAgent = await Agent.findOneAndUpdate(
          { slug: generatedSlug },
          agentData,
          { new: true, upsert: true, runValidators: true }
        );
        syncedAgents.push(updatedAgent);
      } catch (dbErr) {
        // skip DB errors for now
      }
    }

    // Paginate response
    const paginated = syncedAgents.slice((page - 1) * perPage, page * perPage);
    res.status(200).json({
      success: true,
      org_ids: orgIds,
      total: syncedAgents.length,
      page,
      per_page: perPage,
      count: paginated.length,
      data: paginated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to sync agents from multiple orgs',
      error: error.message,
    });
  }
};

// Get filtered agents with pagination
export const getFilteredAgents = async (req, res) => {
  try {
    const { name, marketCenter, city, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (name) {
      filter.fullName = { $regex: name, $options: 'i' };
    }
    if (marketCenter && marketCenter !== "MARKET CENTER") {
      filter.marketCenter = { $regex: `^${marketCenter}$`, $options: 'i' };
    }
    if (city && city !== "CITY" && city !== "RESET_ALL") {
      filter.city = { $regex: `^${city}$`, $options: 'i' };
    }

    console.log('Agent filter:', filter); // Debug log

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Agent.countDocuments(filter);
    const agents = await Agent.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      count: agents.length,
      data: agents,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Separate function to get listings for a specific agent by kw_uid
export const getAgentListings = async (kw_uid) => {
  try {
    console.log(`Fetching listings for agent kw_uid: ${kw_uid}`);
    
    // Set up headers for API
    const headers = {
      Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
      Accept: 'application/json',
    };

    // Fetch all listings from the API (loop through all pages)
    let allListings = [];
    let offset = 0;
    const apiLimit = 1000; // Use the largest allowed by the KW API
    let total = 0;
    let first = true;
    
    do {
      const pageURL = `https://partners.api.kw.com/v2/listings/region/50394?page[offset]=${offset}&page[limit]=${apiLimit}`;
      const pageRes = await axios.get(pageURL, { headers });
      const hits = pageRes.data?.hits?.hits ?? [];
      allListings = allListings.concat(hits.map(hit => ({
        ...hit._source,
        _kw_meta: { id: hit._id, score: hit._score ?? null },
      })));
      if (first) {
        total = pageRes.data?.hits?.total?.value ?? 0;
        first = false;
      }
      offset += apiLimit;
    } while (offset < total);

    // Filter listings by agent kw_uid
    const agentListings = allListings.filter(item => {
      const listKwUid = item.list_kw_uid || item.listing_agent_kw_uid || item.agent_kw_uid || '';
      return String(listKwUid) === String(kw_uid);
    });

    // Apply the same status/category filters as the main listing function
    const allowedListStatuses = ['Active', 'Sold', 'Rented/Leased'];
    const allowedListCategories = ['For Sale', 'Sold', 'Rented/Leased'];
    const blockedStatuses = ['Expired', 'Pending', 'Withdrawn', 'Cancelled', 'Off Market'];
    const blockedCategories = ['Off Market', 'Pending', 'Withdrawn', 'Cancelled', 'Expired'];

    const filteredListings = agentListings.filter(item => {
      // Get all possible status fields
      const listStatus = item.list_status || '';
      const status = item.status || '';
      const propertyStatus = item.property_status || '';
      
      // Get all possible category fields  
      const listCategory = item.list_category || '';
      const category = item.category || '';
      
      // Check if ANY status field contains blocked values
      const hasBlockedStatus = blockedStatuses.some(blocked => 
        listStatus === blocked || 
        status === blocked || 
        propertyStatus === blocked
      );
      
      // Check if ANY category field contains blocked values
      const hasBlockedCategory = blockedCategories.some(blocked =>
        listCategory === blocked ||
        category === blocked
      );
      
      // EXCLUDE if it has any blocked status or category
      if (hasBlockedStatus || hasBlockedCategory) {
        return false;
      }
      
      // Only INCLUDE if it has allowed status AND allowed category
      const hasAllowedStatus = allowedListStatuses.includes(listStatus) || 
                              allowedListStatuses.includes(status) || 
                              allowedListStatuses.includes(propertyStatus);
                              
      const hasAllowedCategory = allowedListCategories.includes(listCategory) ||
                                allowedListCategories.includes(category);
      
      return hasAllowedStatus && hasAllowedCategory;
    });

    console.log(`Found ${filteredListings.length} valid listings for agent ${kw_uid}`);

    return {
      success: true,
      agent_kw_uid: kw_uid,
      total_listings: filteredListings.length,
      listings: filteredListings
    };

  } catch (error) {
    console.error('Error fetching agent listings:', error.message);
    return {
      success: false,
      agent_kw_uid: kw_uid,
      error: error.message,
      total_listings: 0,
      listings: []
    };
  }
};

// Function to fetch properties data with agent filtering
export const fetchPropertiesWithAgents = async (req, res) => {
  try {
    // 1. Input: org_id, single agent and pagination
    const orgId = req.body.org_id || req.query.org_id; // Dynamic org_id from request
    const singleAgent = req.body.singleAgent || req.query.singleAgent; // kw_uid for single agent
    const page = Number(req.body.page ?? req.query.page ?? 1);
    const perPage = Number(req.body.limit ?? req.query.limit ?? 50);
    
    console.log('Org ID requested:', orgId);
    console.log('Single agent requested:', singleAgent);
    console.log('Page:', page, 'Per page:', perPage);

    // Validate pagination parameters
    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page number must be greater than 0',
        error: 'Invalid page parameter'
      });
    }
    
    if (perPage < 1 || perPage > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Per page limit must be between 1 and 1000',
        error: 'Invalid per_page parameter'
      });
    }

    // 2. Define org_ids based on request or use default
    let orgIds = [];
    if (orgId && orgId !== '' && orgId !== null && orgId !== undefined) {
      // If specific org_id provided, use only that
      orgIds = [Number(orgId)];
    } else {
      // If no org_id provided, use default market centers
      orgIds = [2414288, 50449]; // Jeddah and Jasmin
    }
    
    console.log('Using org_ids:', orgIds);

    // 3. Headers for API calls
    const headers = {
      Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
      Accept: 'application/json',
    };

    // 4. Fetch agents from specified org_ids
    console.log('Fetching agents from org_ids:', orgIds);
    let allAgents = [];
    
    for (const currentOrgId of orgIds) {
      console.log(`Fetching agents from org_id: ${currentOrgId}`);
      const baseURL = `https://partners.api.kw.com/v2/listings/orgs/${currentOrgId}/people`;
      
      let offset = 0;
      const apiLimit = 1000;
      let totalCount = 0;
      let first = true;

      do {
        const url = `${baseURL}?page[offset]=${offset}&page[limit]=${apiLimit}`;
        console.log('Calling KW Agents API:', url);
        
        try {
          const response = await axios.get(url, { headers });
          
          // Try to get people from different possible keys
          let agentsPage = [];
          if (Array.isArray(response.data?.people)) {
            agentsPage = response.data.people;
          } else if (Array.isArray(response.data?.results)) {
            agentsPage = response.data.results;
          } else if (Array.isArray(response.data?.data)) {
            agentsPage = response.data.data;
          }

          if (first) {
            totalCount = response.data?.pagination?.total ?? agentsPage.length;
            first = false;
          }

          if (!Array.isArray(agentsPage)) break;
          
          // Add org_id to each agent for tracking
          const agentsWithOrgId = agentsPage.map(agent => ({
            ...agent,
            source_org_id: currentOrgId
          }));
          
          allAgents = allAgents.concat(agentsWithOrgId);
          console.log(`Agents from org ${currentOrgId}:`, agentsWithOrgId.length);

          offset += apiLimit;
        } catch (orgError) {
          console.error(`Error fetching agents from org ${currentOrgId}:`, orgError.message);
          break;
        }
      } while (offset < totalCount);
    }

    console.log('Total agents fetched:', allAgents.length);

    // 5. Filter agents by single_agent if provided
    let filteredAgents = allAgents;
    if (singleAgent !== null && singleAgent !== undefined && singleAgent !== '') {
      const kwUid = String(singleAgent);
      filteredAgents = allAgents.filter(agent => String(agent.kw_uid) === kwUid);
      console.log(`After single agent filter (${kwUid}):`, filteredAgents.length);
    }

    // 6. Fetch property listings from region API
    console.log('Fetching property listings from region API...');
    let allListings = [];
    let listingsOffset = 0;
    const listingsApiLimit = 100;
    let listingsTotal = 0;
    let listingsFirst = true;

    do {
      const listingsURL = `https://partners.api.kw.com/v2/listings/region/50394?page[offset]=${listingsOffset}&page[limit]=${listingsApiLimit}`;
      console.log('Calling KW Listings API:', listingsURL);
      
      try {
        const listingsResponse = await axios.get(listingsURL, { headers });
        const hits = listingsResponse.data?.hits?.hits ?? [];
        
        const listings = hits.map(hit => ({
          ...hit._source,
          _kw_meta: { id: hit._id, score: hit._score ?? null },
        }));
        
        allListings = allListings.concat(listings);
        
        if (listingsFirst) {
          listingsTotal = listingsResponse.data?.hits?.total?.value ?? 0;
          listingsFirst = false;
        }
        
        console.log(`Listings batch: ${listings.length}, Total so far: ${allListings.length}`);
        listingsOffset += listingsApiLimit;
      } catch (listingsError) {
        console.error('Error fetching listings:', listingsError.message);
        break;
      }
    } while (listingsOffset < listingsTotal);

    console.log('Total listings fetched:', allListings.length);

    // 7. Apply property filters (same as main listing function)
    const allowedListStatuses = ['Active', 'Sold', 'Rented/Leased'];
    const allowedListCategories = ['For Sale', 'Sold', 'Rented/Leased'];
    const blockedStatuses = ['Expired', 'Pending', 'Withdrawn', 'Cancelled', 'Off Market'];
    const blockedCategories = ['Off Market', 'Pending', 'Withdrawn', 'Cancelled', 'Expired'];

    const filteredListings = allListings.filter(item => {
      // Get all possible status fields
      const listStatus = item.list_status || '';
      const status = item.status || '';
      const propertyStatus = item.property_status || '';
      
      // Get all possible category fields  
      const listCategory = item.list_category || '';
      const category = item.category || '';
      
      // Check if ANY status field contains blocked values
      const hasBlockedStatus = blockedStatuses.some(blocked => 
        listStatus === blocked || 
        status === blocked || 
        propertyStatus === blocked
      );
      
      // Check if ANY category field contains blocked values
      const hasBlockedCategory = blockedCategories.some(blocked =>
        listCategory === blocked ||
        category === blocked
      );
      
      // EXCLUDE if it has any blocked status or category
      if (hasBlockedStatus || hasBlockedCategory) {
        return false;
      }
      
      // Only INCLUDE if it has allowed status AND allowed category
      const hasAllowedStatus = allowedListStatuses.includes(listStatus) || 
                              allowedListStatuses.includes(status) || 
                              allowedListStatuses.includes(propertyStatus);
                              
      const hasAllowedCategory = allowedListCategories.includes(listCategory) ||
                                allowedListCategories.includes(category);
      
      return hasAllowedStatus && hasAllowedCategory;
    });

    console.log('Filtered listings (after status/category filter):', filteredListings.length);

    // 8. Filter properties by single_agent if provided
    let agentProperties = filteredListings;
    if (singleAgent !== null && singleAgent !== undefined && singleAgent !== '') {
      const kwUid = String(singleAgent);
      agentProperties = filteredListings.filter(property => {
        const listKwUid = property.list_kw_uid || property.listing_agent_kw_uid || property.agent_kw_uid || '';
        return String(listKwUid) === kwUid;
      });
      console.log(`Properties for agent ${kwUid}:`, agentProperties.length);
    }

    // 9. Prepare agent data for response
    const agentData = filteredAgents.map(agent => ({
      kw_uid: agent.kw_uid,
      first_name: agent.first_name,
      last_name: agent.last_name,
      full_name: `${agent.first_name} ${agent.last_name || ''}`.trim(),
      email: agent.email || '',
      phone: agent.phone || '',
      market_center_number: agent.market_center_number || '',
      city: agent.city || '',
      active: agent.active !== false,
      photo: agent.photo || '',
      source_org_id: agent.source_org_id
    }));

    // 10. Calculate pagination for properties
    const totalProperties = agentProperties.length;
    const totalPages = Math.ceil(totalProperties / perPage);
    
    // Check if requested page exceeds total pages
    if (page > totalPages && totalPages > 0) {
      return res.status(400).json({
        success: false,
        message: `Page ${page} does not exist. Total pages available: ${totalPages}`,
        error: 'Page out of range',
        total_pages: totalPages,
        total_properties: totalProperties
      });
    }

    // 11. Paginate properties
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProperties = agentProperties.slice(startIndex, endIndex);

    // 12. Send comprehensive response
    const response = {
      success: true,
      org_id: orgId || null, // Include the org_id used in response
      single_agent: singleAgent,
      org_ids_used: orgIds, // Show which org_ids were actually used
      agents: {
        total: agentData.length,
        data: agentData
      },
      properties: {
        pagination: {
          current_page: page,
          per_page: perPage,
          total_items: totalProperties,
          total_pages: totalPages,
          has_next_page: page < totalPages,
          has_prev_page: page > 1,
          next_page: page < totalPages ? page + 1 : null,
          prev_page: page > 1 ? page - 1 : null,
          start_index: startIndex + 1,
          end_index: Math.min(endIndex, totalProperties)
        },
        count: paginatedProperties.length,
        data: paginatedProperties
      }
    };

    console.log('Response summary:', {
      org_id_requested: orgId,
      org_ids_used: orgIds,
      agents_count: agentData.length,
      properties_total: totalProperties,
      properties_page: paginatedProperties.length,
      single_agent: singleAgent
    });

    res.status(200).json(response);

  } catch (error) {
    console.error('Properties fetch error:', error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties data',
      error: error.message,
    });
  }
};
