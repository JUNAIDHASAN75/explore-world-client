<template>
  <div class="filter-page container mt-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="mb-0">Hotels</h2>
      <!-- Mobile: toggle offcanvas filters -->
      
    </div>

    <div class="row">
      <!-- Left sidebar (desktop) -->
      <aside class="col-md-3 d-none d-md-block">
        <div class="filter-sidebar">
          <!-- Search on Map & Text Search -->
          <div class="search-section">
            <button class="search-on-map-btn mb-3" @click="openMapView">
              <i class="bi bi-geo-alt"></i>
              Search on Map
            </button>
            <div class="text-search mb-3">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search for places to stay" 
                  v-model="searchText"
                >
                <button class="btn btn-outline-secondary" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Your budget (per night) -->
          <div class="filter-section">
            <h6 class="filter-title">Your budget (per night)</h6>
            <div class="budget-range mb-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="currency-label">USD</span>
                <input type="text" class="form-control budget-input" placeholder="MIN" v-model="minBudget">
                <input type="text" class="form-control budget-input" placeholder="MAX" v-model="maxBudget">
              </div>
              <input type="range" class="form-range" min="0" max="500" v-model="priceRange">
            </div>
          </div>

          <!-- Popular filters for Chittagong -->
          <div class="filter-section">
            <h6 class="filter-title">Popular filters for Chittagong</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="kitchen">
                <label class="form-check-label" for="kitchen">Kitchen</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="balcony">
                <label class="form-check-label" for="balcony">Balcony/terrace</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="bathtub">
                <label class="form-check-label" for="bathtub">Bathtub</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="petsAllowed">
                <label class="form-check-label" for="petsAllowed">Pets allowed</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gym">
                <label class="form-check-label" for="gym">Gym/fitness</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="payNow">
                <label class="form-check-label" for="payNow">Pay now</label>
              </div>
            </div>
          </div>

          <!-- Property type -->
          <div class="filter-section">
            <h6 class="filter-title">Property type</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="apartment">
                <label class="form-check-label" for="apartment">
                  Apartment/Flat <span class="count">(6)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="hotel">
                <label class="form-check-label" for="hotel">
                  Hotel <span class="count">(37)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="resort">
                <label class="form-check-label" for="resort">
                  Resort <span class="count">(1)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="guesthouse">
                <label class="form-check-label" for="guesthouse">
                  Guesthouse/bed and breakfast <span class="count">(1)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="boat">
                <label class="form-check-label" for="boat">
                  Boat/cruise <span class="count">(1)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Star rating -->
          <div class="filter-section">
            <h6 class="filter-title">Star rating</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="star5">
                <label class="form-check-label" for="star5">
                  5-Star rating <span class="count">(3)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="star4">
                <label class="form-check-label" for="star4">
                  4-Star rating <span class="count">(7)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="star3">
                <label class="form-check-label" for="star3">
                  3-Star rating <span class="count">(15)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="star2">
                <label class="form-check-label" for="star2">
                  2-Star rating <span class="count">(11)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="star1">
                <label class="form-check-label" for="star1">
                  1-Star rating <span class="count">(6)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Neighborhood -->
          <div class="filter-section">
            <h6 class="filter-title">Neighborhood</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="kotwali">
                <label class="form-check-label" for="kotwali">
                  Kotwali <span class="count">(34)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chittagong">
                <label class="form-check-label" for="chittagong">
                  Chittagong <span class="count">(11)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="patenga">
                <label class="form-check-label" for="patenga">
                  Patenga <span class="count">(1)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Room offers -->
          <div class="filter-section">
            <h6 class="filter-title">Room offers</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="breakfastIncluded">
                <label class="form-check-label" for="breakfastIncluded">
                  Breakfast included <span class="count">(27)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Payment options -->
          <div class="filter-section">
            <h6 class="filter-title">Payment options</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="freeCancellation">
                <label class="form-check-label" for="freeCancellation">
                  Free cancellation <span class="count">(39)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="payAtHotel">
                <label class="form-check-label" for="payAtHotel">
                  Pay at the hotel <span class="count">(40)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="bookNowPayLater">
                <label class="form-check-label" for="bookNowPayLater">
                  Book now, pay later <span class="count">(4)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="payNowOption">
                <label class="form-check-label" for="payNowOption">
                  Pay now <span class="count">(4)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="bookWithoutCard">
                <label class="form-check-label" for="bookWithoutCard">
                  Book without credit card <span class="count">(28)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Property facilities -->
          <div class="filter-section">
            <h6 class="filter-title">Property facilities</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="swimmingPool">
                <label class="form-check-label" for="swimmingPool">
                  Swimming pool <span class="count">(5)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="internet">
                <label class="form-check-label" for="internet">
                  Internet <span class="count">(32)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="carPark">
                <label class="form-check-label" for="carPark">
                  Car park <span class="count">(36)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="airportTransfer">
                <label class="form-check-label" for="airportTransfer">
                  Airport transfer <span class="count">(18)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gymFitness">
                <label class="form-check-label" for="gymFitness">
                  Gym/fitness <span class="count">(11)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="frontDesk24">
                <label class="form-check-label" for="frontDesk24">
                  Front desk [24-hour] <span class="count">(30)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="familyFriendly">
                <label class="form-check-label" for="familyFriendly">
                  Family/child friendly <span class="count">(31)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="nonSmoking">
                <label class="form-check-label" for="nonSmoking">
                  Non-smoking <span class="count">(22)</span>
                </label>
              </div>
              <button class="show-more-btn">Show 4 more</button>
            </div>
          </div>

          <!-- Guest rating -->
          <div class="filter-section">
            <h6 class="filter-title">Guest rating</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="rating9plus">
                <label class="form-check-label" for="rating9plus">
                  <span class="rating-badge">9+</span> Exceptional <span class="count">(8)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="rating8plus">
                <label class="form-check-label" for="rating8plus">
                  <span class="rating-badge">8+</span> Excellent <span class="count">(20)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="rating7plus">
                <label class="form-check-label" for="rating7plus">
                  <span class="rating-badge">7+</span> Very good <span class="count">(27)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="rating6plus">
                <label class="form-check-label" for="rating6plus">
                  <span class="rating-badge">6+</span> Good <span class="count">(35)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Distance to center -->
          <div class="filter-section">
            <h6 class="filter-title">Distance to center</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="insideCenter">
                <label class="form-check-label" for="insideCenter">Inside city center</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="under2km">
                <label class="form-check-label" for="under2km">&lt;2 km to center</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="between2and5km">
                <label class="form-check-label" for="between2and5km">2-5 km to center</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="between5and10km">
                <label class="form-check-label" for="between5and10km">5-10 km to center</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="over10km">
                <label class="form-check-label" for="over10km">&gt;10 km to center</label>
              </div>
            </div>
          </div>

          <!-- Room amenities -->
          <div class="filter-section">
            <h6 class="filter-title">Room amenities</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="tv">
                <label class="form-check-label" for="tv">
                  TV <span class="count">(15)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="refrigerator">
                <label class="form-check-label" for="refrigerator">
                  Refrigerator <span class="count">(13)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="balconyTerrace">
                <label class="form-check-label" for="balconyTerrace">
                  Balcony/terrace <span class="count">(11)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="coffeeTeaMaker">
                <label class="form-check-label" for="coffeeTeaMaker">
                  Coffee/tea maker <span class="count">(11)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="bathtubAmenity">
                <label class="form-check-label" for="bathtubAmenity">
                  Bathtub <span class="count">(9)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Bed type -->
          <div class="filter-section">
            <h6 class="filter-title">Bed type</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="doubleBed">
                <label class="form-check-label" for="doubleBed">
                  Double <span class="count">(33)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="singleTwinBed">
                <label class="form-check-label" for="singleTwinBed">
                  Single/twin <span class="count">(28)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="queenBed">
                <label class="form-check-label" for="queenBed">
                  Queen <span class="count">(8)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="kingBed">
                <label class="form-check-label" for="kingBed">
                  King <span class="count">(6)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main items area -->
      <main class="col-12 col-md-9">
        <!-- Search Results Header -->
        <div class="search-results-header mb-4">
          <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div class="results-info">
              <h5 class="mb-1" v-if="destination">{{ destination }}: {{ allHotels.length }} properties found</h5>
              <h5 class="mb-1" v-else>{{ allHotels.length }} properties found</h5>
              <p class="text-muted small mb-0">16 Oct 2025 - 17 Oct 2025, 2 adults, 1 room</p>
            </div>
            <div class="sort-options">
              <div class="agoda-sort-container">
                <span class="sort-label">Sort by</span>
                <div class="sort-buttons">
                  <button 
                    class="sort-btn" 
                    :class="{ active: currentSort === 'Best match' }"
                    @click="setSortBy('Best match')"
                  >
                    Best match
                  </button>
                  <button 
                    class="sort-btn" 
                    :class="{ active: currentSort === 'Top reviewed' }"
                    @click="setSortBy('Top reviewed')"
                  >
                    Top reviewed
                  </button>
                  <button 
                    class="sort-btn" 
                    :class="{ active: currentSort === 'Lowest price first' }"
                    @click="setSortBy('Lowest price first')"
                  >
                    Lowest price first
                  </button>
                  <button 
                    class="sort-btn" 
                    :class="{ active: currentSort === 'Distance' }"
                    @click="setSortBy('Distance')"
                  >
                    Distance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hotel cards list view (Agoda-style) -->
        <div class="hotels-list">
          <AgodaHotelCard
            v-for="hotel in paginatedHotels" 
            :key="hotel.id"
            :id="hotel.id"
            :image="hotel.image"
            :rating="hotel.rating"
            :review-count="hotel.reviewCount"
            :star-rating="hotel.starRating"
            :name="hotel.name"
            :address="hotel.address"
            :price="hotel.price"
            :original-price="hotel.originalPrice"
            :currency="hotel.currency"
            :amenities="hotel.amenities"
            :description="hotel.description"
            :tags="hotel.tags"
            :availability="hotel.availability"
            @click="onHotelClick"
            @book="onBook"
          />
        </div>

        <!-- Pagination -->
        <nav aria-label="Page navigation" class="mt-3">
          <ul class="pagination custom-pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage" aria-label="Previous">
                <i class="bi bi-chevron-left" aria-hidden="true"></i>
              </button>
            </li>
            <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === currentPage }">
              <button class="page-link" @click="goToPage(p)">{{ p }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage" aria-label="Next">
                <i class="bi bi-chevron-right" aria-hidden="true"></i>
              </button>
            </li>
          </ul>
        </nav>
      </main>
    </div>

    <!-- Offcanvas for mobile filters -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="filtersOffcanvas" aria-labelledby="filtersOffcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="filtersOffcanvasLabel">Filters</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="filter-sidebar">
          <!-- Search on Map & Text Search -->
          <div class="search-section">
            <button class="search-on-map-btn mb-3" @click="openMapView">
              <i class="bi bi-geo-alt"></i>
              Search on Map
            </button>
            <div class="text-search mb-3">
              <div class="input-group">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search for places to stay" 
                  v-model="searchText"
                >
                <button class="btn btn-outline-secondary" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Your budget (per night) -->
          <div class="filter-section">
            <h6 class="filter-title">Your budget (per night)</h6>
            <div class="budget-range mb-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="currency-label">USD</span>
                <input type="text" class="form-control budget-input" placeholder="MIN" v-model="minBudget">
                <input type="text" class="form-control budget-input" placeholder="MAX" v-model="maxBudget">
              </div>
              <input type="range" class="form-range" min="0" max="500" v-model="priceRange">
            </div>
          </div>

          <!-- Popular filters for Chittagong -->
          <div class="filter-section">
            <h6 class="filter-title">Popular filters</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileKitchen">
                <label class="form-check-label" for="mobileKitchen">Kitchen</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileBalcony">
                <label class="form-check-label" for="mobileBalcony">Balcony/terrace</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileBathtub">
                <label class="form-check-label" for="mobileBathtub">Bathtub</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileGym">
                <label class="form-check-label" for="mobileGym">Gym/fitness</label>
              </div>
            </div>
          </div>

          <!-- Property type -->
          <div class="filter-section">
            <h6 class="filter-title">Property type</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileHotel">
                <label class="form-check-label" for="mobileHotel">
                  Hotel <span class="count">(37)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileResort">
                <label class="form-check-label" for="mobileResort">
                  Resort <span class="count">(1)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileApartment">
                <label class="form-check-label" for="mobileApartment">
                  Apartment/Flat <span class="count">(6)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Star rating -->
          <div class="filter-section">
            <h6 class="filter-title">Star rating</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileStar5">
                <label class="form-check-label" for="mobileStar5">
                  5-Star rating <span class="count">(3)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileStar4">
                <label class="form-check-label" for="mobileStar4">
                  4-Star rating <span class="count">(7)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileStar3">
                <label class="form-check-label" for="mobileStar3">
                  3-Star rating <span class="count">(15)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Guest rating -->
          <div class="filter-section">
            <h6 class="filter-title">Guest rating</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileRating9plus">
                <label class="form-check-label" for="mobileRating9plus">
                  <span class="rating-badge">9+</span> Exceptional <span class="count">(8)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileRating8plus">
                <label class="form-check-label" for="mobileRating8plus">
                  <span class="rating-badge">8+</span> Excellent <span class="count">(20)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileRating7plus">
                <label class="form-check-label" for="mobileRating7plus">
                  <span class="rating-badge">7+</span> Very good <span class="count">(27)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Payment options -->
          <div class="filter-section">
            <h6 class="filter-title">Payment options</h6>
            <div class="filter-options">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobileFreeCancellation">
                <label class="form-check-label" for="mobileFreeCancellation">
                  Free cancellation <span class="count">(39)</span>
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="mobilePayAtHotel">
                <label class="form-check-label" for="mobilePayAtHotel">
                  Pay at the hotel <span class="count">(40)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map View Modal -->
    <MapViewModal 
      :is-visible="showMapModal" 
      :hotels="allHotels" 
      @close="closeMapView"
      @hotel-select="onMapHotelSelect"
    />
  </div>

  <!-- Floating mobile filter button (sits above mobile bottom bar) -->
  <button
    v-show="!offcanvasOpen"
    :class="['mobile-filter-floating', 'd-md-none', { idle: isIdle }]"
    type="button"
    @pointerdown.prevent="onPointerDown"
    @click.prevent="onFilterClick"
    ref="floatingBtn"
    :style="floatingStyle"
    aria-controls="filtersOffcanvas"
    aria-label="Open filters"
    title="Open filters"
  >
    <i class="bi bi-sliders2-vertical"></i>
  </button>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, computed as vueComputed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import HotelCard from '../components/cards/HotelCard.vue'
import AgodaHotelCard from '../components/cards/AgodaHotelCard.vue'
import MapViewModal from '../components/MapViewModal.vue'

const route = useRoute()
const router = useRouter()
const destination = computed(() => route.query.destination || '')
const priceRange = ref(250)
const minBudget = ref('0')
const maxBudget = ref('140')
const currentSort = ref('Best match')
const searchText = ref('')
const showMapModal = ref(false)
const offcanvasOpen = ref(false)
// floating button draggable position (persisted locally)
const floatingX = ref(null)
const floatingY = ref(null)
const isDragging = ref(false)
const floatingBtn = ref(null)

const floatingStyle = computed(() => {
  if (floatingX.value == null || floatingY.value == null) {
    return {}
  }
  return {
    right: 'auto',
    left: `${floatingX.value}px`,
    bottom: 'auto',
    top: `${floatingY.value}px`,
    transition: isDragging.value ? 'none' : 'transform 0.12s ease'
  }
})

// Idle overlay mode: when user doesn't interact for N ms, switch to overlay style
const isIdle = ref(false)
let idleTimer = null
const IDLE_TIMEOUT = 3000 // 3 seconds

function resetIdleTimer() {
  isIdle.value = false
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => { isIdle.value = true }, IDLE_TIMEOUT)
}

// document-level activity listens - throttled for better performance
let throttleTimeout = null
function throttledResetIdle() {
  if (!throttleTimeout) {
    resetIdleTimer()
    throttleTimeout = setTimeout(() => { throttleTimeout = null }, 200)
  }
}

function attachIdleListeners() {
  ['pointerdown','touchstart','scroll'].forEach(evt => {
    document.addEventListener(evt, throttledResetIdle, { passive: true })
  })
  resetIdleTimer()
}

function detachIdleListeners() {
  ['pointerdown','touchstart','scroll'].forEach(evt => {
    document.removeEventListener(evt, throttledResetIdle)
  })
  if (idleTimer) clearTimeout(idleTimer)
  if (throttleTimeout) clearTimeout(throttleTimeout)
}

function loadFloatingPos() {
  try {
    const raw = localStorage.getItem('floatingFilterPos')
    if (!raw) return
    const p = JSON.parse(raw)
    // stored as normalized percentages
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if (typeof p.xPercent === 'number' && typeof p.yPercent === 'number') {
      floatingX.value = Math.round(p.xPercent * vw)
      floatingY.value = Math.round(p.yPercent * vh)
    }
  } catch (e) {
    // ignore
  }
}

function saveFloatingPos() {
  try {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const xPercent = vw ? (floatingX.value / vw) : 0
    const yPercent = vh ? (floatingY.value / vh) : 0
    localStorage.setItem('floatingFilterPos', JSON.stringify({ xPercent, yPercent }))
  } catch (e) {}
}

let pointerMoveHandler = null
let pointerUpHandler = null

// Manual offcanvas fallback state
let manualBackdrop = null

function openOffcanvasManual(off) {
  if (!off) return
  if (off.classList.contains('show')) return
  // Mark visible
  off.classList.add('show')
  off.style.visibility = 'visible'
  off.setAttribute('aria-hidden', 'false')
  // body mark (Bootstrap adds body overflow hidden when open; we add a simple marker)
  document.body.classList.add('offcanvas-open')

  // create backdrop that closes the offcanvas when clicked
  manualBackdrop = document.createElement('div')
  manualBackdrop.className = 'offcanvas-backdrop fade show'
  manualBackdrop.addEventListener('click', () => closeOffcanvasManual(off))
  document.body.appendChild(manualBackdrop)

  // wire up any internal dismiss buttons to close
  const dismissEls = Array.from(off.querySelectorAll('[data-bs-dismiss="offcanvas"]'))
  off.__bp_manualDismissHandlers = dismissEls.map(el => {
    const h = (ev) => { ev.preventDefault(); closeOffcanvasManual(off) }
    el.addEventListener('click', h)
    return { el, h }
  })

  // dispatch bootstrap-like events so existing listeners react
  off.dispatchEvent(new Event('show.bs.offcanvas'))
  // mimic async show
  setTimeout(() => off.dispatchEvent(new Event('shown.bs.offcanvas')), 20)
}

function closeOffcanvasManual(off) {
  if (!off) return
  if (!off.classList.contains('show')) return
  off.dispatchEvent(new Event('hide.bs.offcanvas'))
  off.classList.remove('show')
  off.style.visibility = ''
  off.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('offcanvas-open')
  // remove backdrop
  if (manualBackdrop && manualBackdrop.parentNode) {
    manualBackdrop.parentNode.removeChild(manualBackdrop)
  }
  manualBackdrop = null

  // remove dismiss handlers
  if (off.__bp_manualDismissHandlers && Array.isArray(off.__bp_manualDismissHandlers)) {
    off.__bp_manualDismissHandlers.forEach(({ el, h }) => el.removeEventListener('click', h))
    off.__bp_manualDismissHandlers = null
  }

  // mimic async hidden
  setTimeout(() => off.dispatchEvent(new Event('hidden.bs.offcanvas')), 20)
}

function onPointerDown(e) {
  // start dragging
  isDragging.value = false
  resetIdleTimer()
  const startX = e.clientX
  const startY = e.clientY
  const rect = (floatingBtn.value && floatingBtn.value.getBoundingClientRect()) || { left: 0, top: 0 }
  const offsetX = startX - rect.left
  const offsetY = startY - rect.top

  pointerMoveHandler = (ev) => {
    const dx = ev.clientX - startX
    const dy = ev.clientY - startY
    if (!isDragging.value && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isDragging.value = true
    }
    if (isDragging.value) {
      // clamp within viewport
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      let nx = ev.clientX - offsetX
      let ny = ev.clientY - offsetY
      // ensure button stays inside with 8px padding
      nx = Math.max(8, Math.min(nx, vw - rect.width - 8))
      ny = Math.max(8, Math.min(ny, vh - rect.height - 8))
      floatingX.value = Math.round(nx)
      floatingY.value = Math.round(ny)
    }
  }

  pointerUpHandler = (ev) => {
    if (pointerMoveHandler) window.removeEventListener('pointermove', pointerMoveHandler)
    if (pointerUpHandler) window.removeEventListener('pointerup', pointerUpHandler)
    if (isDragging.value) {
      // save position
      saveFloatingPos()
      // small delay to avoid immediate click action
      setTimeout(() => { isDragging.value = false }, 50)
      resetIdleTimer()
    }
  }

  window.addEventListener('pointermove', pointerMoveHandler)
  window.addEventListener('pointerup', pointerUpHandler)
}

function onFilterClick(e) {
  // if user was dragging, don't open offcanvas
  if (isDragging.value) return
  // open offcanvas programmatically
  const off = document.getElementById('filtersOffcanvas')
  if (off) {
    // Use Bootstrap Offcanvas JS if available
    try {
      if (typeof bootstrap !== 'undefined' && bootstrap && bootstrap.Offcanvas) {
        const bs = bootstrap.Offcanvas.getOrCreateInstance(off)
        bs.show()
      } else {
        // bootstrap not available - use manual fallback
        openOffcanvasManual(off)
      }
    } catch (err) {
      // fallback: try manual fallback if something throws
      openOffcanvasManual(off)
    }
  }
}

// Sample hotel data with Agoda-style information
const allHotels = ref([
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 
    rating: 8.9, 
    reviewCount: 1245,
    name: 'The Peninsula Chittagong Hotel', 
    address: 'Chittagong', 
    price: 72, 
    originalPrice: 85,
    currency: 'USD',
    starRating: 5,
    amenities: ['Free WiFi', 'Pool', 'Gym'],
    description: 'Located in the heart of Chittagong with stunning bay views.',
    tags: ['Free cancellation', 'Pay at hotel'],
    availability: 'Only 2 rooms left!'
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', 
    rating: 8.2, 
    reviewCount: 892,
    name: 'Radisson Blu Chattogram Bay View', 
    address: 'Kotwali, Chittagong', 
    price: 95, 
    originalPrice: 110,
    currency: 'USD',
    starRating: 4,
    amenities: ['Airport shuttle', 'Restaurant', 'Spa'],
    description: 'Premium hotel with excellent service and modern amenities.',
    tags: ['Breakfast included', 'Business center'],
    availability: ''
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', 
    rating: 8.5, 
    reviewCount: 1456,
    name: 'Best Western S K S Chattogram', 
    address: 'Agrabad, Chittagong', 
    price: 63, 
    currency: 'USD',
    starRating: 4,
    amenities: ['Free parking', 'Conference room', 'Laundry'],
    description: 'Business hotel with excellent facilities in commercial area.',
    tags: ['Free WiFi', 'Pet friendly'],
    availability: ''
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80', 
    rating: 7.9, 
    reviewCount: 678,
    name: 'Hotel Regent Park', 
    address: 'Kotwali, Chittagong', 
    price: 45, 
    currency: 'USD',
    starRating: 3,
    amenities: ['Room service', 'AC', 'TV'],
    description: 'Comfortable accommodation with basic amenities.',
    tags: ['Good location', 'Value for money'],
    availability: ''
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', 
    rating: 7.4, 
    reviewCount: 432,
    name: 'Hotel Agrabad', 
    address: 'Agrabad, Chittagong', 
    price: 40, 
    currency: 'USD',
    starRating: 3,
    amenities: ['Restaurant', 'Room service', 'Elevator'],
    description: 'Budget-friendly hotel in commercial district.',
    tags: ['24/7 service', 'Central location'],
    availability: ''
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80', 
    rating: 8.0, 
    reviewCount: 789,
    name: 'Well Park Residence, Chittagong', 
    address: 'Nasirabad, Chittagong', 
    price: 68, 
    originalPrice: 75,
    currency: 'USD',
    starRating: 4,
    amenities: ['Kitchenette', 'Balcony', 'Free WiFi'],
    description: 'Serviced apartments with home-like comfort.',
    tags: ['Long stay friendly', 'Family rooms'],
    availability: ''
  },
  { 
    id: 7, 
    image: 'https://images.unsplash.com/photo-1551882547-ff43c63fedfe?auto=format&fit=crop&w=800&q=80', 
    rating: 7.1, 
    reviewCount: 234,
    name: 'Hotel Crown City', 
    address: 'Pahartali, Chittagong', 
    price: 50, 
    currency: 'USD',
    starRating: 3,
    amenities: ['Parking', 'Restaurant', 'Conference hall'],
    description: 'Modern hotel with conference facilities.',
    tags: ['Business hotel', 'Meeting rooms'],
    availability: ''
  },
  { 
    id: 8, 
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80', 
    rating: 8.7, 
    reviewCount: 1567,
    name: 'Hotel Aristos Boutique & Suites', 
    address: 'GEC Circle, Chittagong', 
    price: 120, 
    originalPrice: 140,
    currency: 'USD',
    starRating: 5,
    amenities: ['Luxury spa', 'Fine dining', 'Concierge'],
    description: 'Boutique luxury hotel with personalized service.',
    tags: ['Luxury', 'Boutique experience'],
    availability: 'Limited availability'
  }
])

// Pagination
const perPage = 15
const currentPage = ref(1)
const totalPages = vueComputed(() => Math.max(1, Math.ceil(allHotels.value.length / perPage)))
const paginatedHotels = vueComputed(() => {
  const start = (currentPage.value - 1) * perPage
  return allHotels.value.slice(start, start + perPage)
})

async function goToPage(p) { currentPage.value = p; await nextTick(); scrollToTop() }
async function prevPage() { if (currentPage.value > 1) { currentPage.value--; await nextTick(); scrollToTop() } }
async function nextPage() { if (currentPage.value < totalPages.value) { currentPage.value++; await nextTick(); scrollToTop() } }

function scrollToTop() {
  // scroll the main content into view smoothly; fallback to window scroll
  const el = document.querySelector('main')
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function onBook(payload) {
  // handle booking action (for now just log)
  console.log('Booking hotel', payload)
}

function onHotelClick(payload) {
  // Navigate to hotel details page
  router.push(`/hotel/${payload.id}`)
}

function setSortBy(sortOption) {
  currentSort.value = sortOption
  // Here you would implement the actual sorting logic
  console.log('Sorting by:', sortOption)
}

function openMapView() {
  showMapModal.value = true
}

function closeMapView() {
  showMapModal.value = false
}

function onMapHotelSelect(hotel) {
  console.log('Hotel selected from map:', hotel)
  // You can navigate to hotel details or perform other actions
}

// Toggle floating button visibility when offcanvas opens/closes (Bootstrap offcanvas events)
onMounted(() => {
  const offcanvasEl = document.getElementById('filtersOffcanvas')
  if (!offcanvasEl) return

  const onShow = () => { offcanvasOpen.value = true }
  const onHide = () => { offcanvasOpen.value = false }

  offcanvasEl.addEventListener('show.bs.offcanvas', onShow)
  offcanvasEl.addEventListener('hide.bs.offcanvas', onHide)

  // store handlers for cleanup
  offcanvasEl.__bp_onShow = onShow
  offcanvasEl.__bp_onHide = onHide
  // load saved floating position (if any). If none, keep default CSS right/bottom placement
  loadFloatingPos()
  // idle listeners
  attachIdleListeners()
})

onBeforeUnmount(() => {
  const offcanvasEl = document.getElementById('filtersOffcanvas')
  if (!offcanvasEl) return
  if (offcanvasEl.__bp_onShow) offcanvasEl.removeEventListener('show.bs.offcanvas', offcanvasEl.__bp_onShow)
  if (offcanvasEl.__bp_onHide) offcanvasEl.removeEventListener('hide.bs.offcanvas', offcanvasEl.__bp_onHide)
  detachIdleListeners()
})
</script>

<style scoped>
/* Search Results Header */
.search-results-header {
  background: white;
  border-radius: 2px !important;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.results-info h5 {
  color: #333;
  font-weight: 600;
  font-size: 18px;
}

.sort-options .dropdown-toggle {
  border-color: #ddd;
  color: #333;
  background: white;
  font-size: 14px;
  padding: 8px 16px;
}

.sort-options .dropdown-toggle:hover,
.sort-options .dropdown-toggle:focus {
  border-color: #007bff;
  box-shadow: none;
}

/* Agoda-style Sort Buttons */
.agoda-sort-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sort-label {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
  white-space: nowrap;
}

.sort-buttons {
  display: flex;
  gap: 4px;
}

.sort-btn {
  background: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 2px !important;
  font-size: 14px;
  color: #6b6b6b;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.sort-btn:hover {
  background: #f0f2f5;
  color: #1a1a1a;
}

.sort-btn.active {
  background: #0084ff;
  color: white;
  font-weight: 600;
}

/* Hotels List Styling */
.hotels-list {
  display: flex;
  flex-direction: column;
  gap: 20px !important;
}

.hotels-list > * {
  content-visibility: auto;
  contain-intrinsic-size: 1px 300px;
}

/* Search Section */
.search-section {
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
}

.search-on-map-btn {
  width: 100%;
  padding: 12px;
  background: #ff7a00 !important;
  color: white !important;
  border: none;
  border-radius: 2px !important;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-on-map-btn:hover {
  background: #e66a00 !important;
  color: white !important;
}

.text-search .input-group .form-control {
  border-right: none;
  font-size: 14px;
}

.text-search .input-group .btn {
  border-left: none;
  background: white;
  border-color: #ced4da;
}

.text-search .input-group .form-control:focus {
  border-color: #ff7a00;
  box-shadow: none;
}

.text-search .input-group .form-control:focus + .btn {
  border-color: #ff7a00;
}

/* Filter Sidebar Styling */
.filter-sidebar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-radius: 16px !important;
  padding: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  position: sticky;
  top: 20px;
}

.filter-section {
  padding: 16px 30px;
  border-bottom: 1px solid #e1e5e9;
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-title {
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.2;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 23px;
}

.form-check {
  margin-bottom: 0;
  padding-left: 0;
}

.form-check-input {
  margin-right: 8px;
  margin-top: 2px;
  border-radius: 2px !important;
  border: 2px solid #ddd;
  width: 16px;
  height: 16px;
}

.form-check-input:checked {
  background-color: #ff7a00;
  border-color: #ff7a00;
}

.form-check-input:focus {
  border-color: #ff7a00;
  box-shadow: 0 0 0 0.2rem rgba(255, 122, 0, 0.25);
}

.form-check-label {
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  line-height: 1.4;
  padding: 2px 0;
}

.form-check-label:hover {
  color: #ff7a00;
}

.count {
  color: #6b6b6b;
  font-size: 12px;
  margin-left: auto;
}

/* Budget Filter Styling */
.budget-range {
  padding: 0;
}

.currency-label {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  min-width: 35px;
}

.budget-input {
  font-size: 14px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 2px !important;
  text-align: center;
}

.budget-input:focus {
  border-color: #ff7a00;
  box-shadow: 0 0 0 0.2rem rgba(255, 122, 0, 0.25);
}

.form-range {
  margin: 12px 0 0 0;
  height: 4px;
}

.form-range::-webkit-slider-thumb {
  background: #0084ff;
  border: none;
  width: 16px;
  height: 16px;
}

.form-range::-moz-range-thumb {
  background: #0084ff;
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

/* Rating Badge */
.rating-badge {
  background: #ff7a00;
  color: white;
  padding: 2px 6px;
  border-radius: 2px !important;
  font-size: 12px;
  font-weight: 600;
  margin-right: 4px;
}

/* Show More Button */
.show-more-btn {
  background: none !important;
  border: none !important;
  color: #ff7a00 !important;
  font-size: 14px;
  padding: 4px 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.show-more-btn:hover {
  text-decoration: underline;
}

/* Hotel Card Styling */
.card {
  margin-bottom: 24px;
  border: 1px solid rgba(225, 229, 233, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px !important;
  overflow: hidden;
  background: white;
}

.card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border-color: #ff7a00;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

/* Mobile Adjustments */
@media (max-width: 767.98px) {
  .filter-section {
    padding: 12px 16px;
  }
  
  .filter-title {
    font-size: 15px;
  }

  .search-results-header {
    padding: 16px;
  }

  .results-info h5 {
    font-size: 16px;
  }

  .sort-options {
    margin-top: 12px;
  }

  .agoda-sort-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .sort-buttons {
    flex-wrap: wrap;
    gap: 8px;
  }

  .sort-btn {
    padding: 6px 12px;
    font-size: 13px;
  }
}

/* Global border-radius override - make all elements premium rounded */
* {
  border-radius: 12px !important;
}

.form-check-input, .btn-close, .sort-btn {
  border-radius: 4px !important;
}

/* Orange button styling override */
button {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
  color: white !important;
}

button:hover {
  background-color: #e66a00 !important;
  border-color: #e66a00 !important;
  color: white !important;
}

/* Exception for sort buttons to maintain functionality */
.sort-btn {
  background: transparent !important;
  color: #6b6b6b !important;
  border: none !important;
}

.sort-btn:hover {
  background: #f0f2f5 !important;
  color: #1a1a1a !important;
}

.sort-btn.active {
  background: #0084ff !important;
  color: white !important;
}

/* Button Styling */
.btn-outline-primary {
  border-color: #ff7a00 !important;
  color: #ff7a00 !important;
  background-color: transparent !important;
}

.btn-outline-primary:hover {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
  color: white !important;
}

.btn-outline-secondary {
  border-color: #ff7a00 !important;
  color: #ff7a00 !important;
  background-color: transparent !important;
}

.btn-outline-secondary:hover {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
  color: white !important;
}

/* Pagination styling */
.custom-pagination {
  margin-top: 32px;
}

.custom-pagination .page-item { 
  margin: 0 2px; 
}

.custom-pagination .page-link {
  background-color: #fff !important;
  color: #ff7a00 !important;
  border: 1px solid #e1e5e9 !important;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px !important;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
}

.custom-pagination .page-link:hover {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
  color: white !important;
}

.custom-pagination .page-item.active .page-link {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
  color: #fff !important;
  box-shadow: 0 2px 4px rgba(255, 122, 0, 0.25);
}

.custom-pagination .page-item.disabled .page-link {
  opacity: 0.5;
  background-color: #f8f9fa !important;
  color: #6b6b6b !important;
}

/* Focus states */
.custom-pagination .page-link:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(255, 122, 0, 0.25);
}

/* Dropdown styling */
.dropdown-menu {
  border: 1px solid #e1e5e9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 2px !important;
  padding: 8px 0;
}

.dropdown-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #ff7a00;
}

/* Floating filter button for mobile - sits above bottom nav */
.mobile-filter-floating {
  position: fixed;
  /* default positioning will be overridden by inline style when user drags */
  right: 16px;
  bottom: calc(80px + 14px);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
  background: #ff7a00 !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  touch-action: none; /* allow pointer events for dragging */
}
.mobile-filter-floating i {
  font-size: 1.5rem;
}

/* Idle overlay style: small, semi-transparent and less obtrusive */
.mobile-filter-floating.idle {
  width: 40px;
  height: 40px;
  opacity: 0.75;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transform: scale(0.9);
}
.mobile-filter-floating.idle i {
  font-size: 0.95rem;
}

/* Page wrapper - ensures page background follows theme */
.filter-page {
  min-height: 100vh;
  background: transparent;
  padding-bottom: 40px;
  contain-intrinsic-size: 1px 5000px;
}

/* Make container and main transparent so wrapper background shows through */
.filter-page .container,
.filter-page main,
.filter-page aside {
  background: transparent;
}

/* ========== NIGHT MODE STYLES ========== */
[data-theme="night"] .search-results-header {
  background: #0a1128;
  border-color: #1a2744;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

[data-theme="night"] .results-info h5 {
  color: #e2e8f0;
}

[data-theme="night"] .sort-options .dropdown-toggle {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .sort-options .dropdown-toggle:hover,
[data-theme="night"] .sort-options .dropdown-toggle:focus {
  border-color: #60a5fa;
}

[data-theme="night"] .sort-label {
  color: #e2e8f0;
}

[data-theme="night"] .sort-btn {
  color: #94a3b8;
}

[data-theme="night"] .sort-btn:hover {
  background: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .sort-btn.active {
  background: #60a5fa;
  color: white;
}

[data-theme="night"] .filter-sidebar {
  background: rgba(10, 17, 40, 0.8);
  backdrop-filter: blur(12px);
  border-color: rgba(26, 39, 68, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

[data-theme="night"] .filter-section {
  border-bottom-color: #1a2744;
}

[data-theme="night"] .filter-title {
  color: #e2e8f0;
}

[data-theme="night"] .form-check-input {
  background-color: #0a1128;
  border-color: #1a2744;
}

[data-theme="night"] .form-check-input:checked {
  background-color: #ff7a00;
  border-color: #ff7a00;
}

[data-theme="night"] .form-check-input:focus {
  border-color: #ff7a00;
}

[data-theme="night"] .form-check-label {
  color: #e2e8f0;
}

[data-theme="night"] .form-check-label:hover {
  color: #ff7a00;
}

[data-theme="night"] .count {
  color: #94a3b8;
}

[data-theme="night"] .currency-label {
  color: #e2e8f0;
}

[data-theme="night"] .budget-input {
  background-color: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .budget-input:focus {
  border-color: #ff7a00;
  background-color: #0a1128;
}

[data-theme="night"] .text-search .input-group .form-control {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .text-search .input-group .btn {
  background: #0a1128;
  border-color: #1a2744;
  color: #e2e8f0;
}

[data-theme="night"] .text-search .input-group .form-control:focus {
  border-color: #ff7a00;
  background: #0a1128;
}

[data-theme="night"] .text-search .input-group .form-control:focus + .btn {
  border-color: #ff7a00;
}

[data-theme="night"] .card {
  background: rgba(13, 25, 49, 0.7) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

[data-theme="night"] .card:hover {
  border-color: #ff7a00;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

[data-theme="night"] .dropdown-menu {
  background: #0a1128;
  border-color: #1a2744;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

[data-theme="night"] .dropdown-item {
  color: #e2e8f0;
}

[data-theme="night"] .dropdown-item:hover {
  background-color: #1a2744;
  color: #ff7a00;
}

[data-theme="night"] .custom-pagination .page-link {
  background-color: #0a1128 !important;
  color: #ff7a00 !important;
  border-color: #1a2744 !important;
}

[data-theme="night"] .custom-pagination .page-link:hover {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
  color: white !important;
}

[data-theme="night"] .custom-pagination .page-item.active .page-link {
  background-color: #ff7a00 !important;
  border-color: #ff7a00 !important;
}

[data-theme="night"] .custom-pagination .page-item.disabled .page-link {
  background-color: #070e21 !important;
  color: #64748b !important;
}

[data-theme="night"] .text-muted {
  color: #94a3b8 !important;
}

[data-theme="night"] .results-info p {
  color: #94a3b8 !important;
}

[data-theme="night"] .form-control {
  background: #0a1128 !important;
  border-color: #1a2744 !important;
  color: #e2e8f0 !important;
}

[data-theme="night"] .show-more-btn {
  color: #60a5fa !important;
}

</style>
