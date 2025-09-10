// Enhanced Marine Data Platform with Advanced Functionality
class EnhancedMarineDataPlatform {
    constructor() {
        this.currentSection = 'dashboard';
        this.filters = {};
        this.searchResults = [];
        this.alertUpdateInterval = null;
        this.paramUpdateInterval = null;
        this.currentMapType = 'temperature';
        
        // Load provided data
        this.data = {
            stations: [
                {station_id: "CMLRE_001", station_name: "Kochi Coastal Station", latitude: 13.992642, longitude: 96.117954, depth_m: 50, region: "Indian Ocean", status: "Active", last_update: "2023-12-15T14:30:00Z", equipment: ["CTD", "ADCP", "Fluorometer"]},
                {station_id: "CMLRE_002", station_name: "Bay of Bengal Deep", latitude: 23.211429, longitude: 90.478852, depth_m: 500, region: "Bay of Bengal", status: "Active", last_update: "2023-12-15T13:45:00Z", equipment: ["Mooring", "Temperature Chain", "Current Meter"]},
                {station_id: "CMLRE_003", station_name: "Arabian Sea Monitoring", latitude: 19.711903, longitude: 95.245469, depth_m: 1000, region: "Arabian Sea", status: "Maintenance", last_update: "2023-12-14T09:15:00Z", equipment: ["Deep CTD", "Sediment Trap", "pH Sensor"]},
                {station_id: "CMLRE_004", station_name: "Goa Shelf Station", latitude: 15.255, longitude: 73.751, depth_m: 200, region: "Arabian Sea", status: "Active", last_update: "2023-12-15T16:20:00Z", equipment: ["Multi-parameter Probe", "ADCP", "Nitrate Sensor"]}
            ],
            species: [
                {species_id: "FISH_0001", scientific_name: "Thunnus albacares", common_name: "Yellowfin Tuna", family: "Scombridae", habitat_depth: "Epipelagic (0-200m)", conservation_status: "Near Threatened", max_length_cm: 200, max_weight_kg: 176, trophic_level: 4.2, commercial_value: "High", image_emoji: "🐟", image_description: "Large yellowfin tuna with distinctive yellow fins"},
                {species_id: "FISH_0002", scientific_name: "Katsuwonus pelamis", common_name: "Skipjack Tuna", family: "Scombridae", habitat_depth: "Epipelagic (0-250m)", conservation_status: "Least Concern", max_length_cm: 108, max_weight_kg: 34, trophic_level: 4.1, commercial_value: "Very High", image_emoji: "🐠", image_description: "Skipjack tuna with dark blue stripes"},
                {species_id: "FISH_0003", scientific_name: "Lutjanus argentimaculatus", common_name: "Mangrove Red Snapper", family: "Lutjanidae", habitat_depth: "Coastal (0-100m)", conservation_status: "Vulnerable", max_length_cm: 150, max_weight_kg: 32, trophic_level: 3.8, commercial_value: "High", image_emoji: "🐡", image_description: "Red snapper with silver-spotted scales"},
                {species_id: "FISH_0004", scientific_name: "Epinephelus marginatus", common_name: "Dusky Grouper", family: "Serranidae", habitat_depth: "Benthic (50-200m)", conservation_status: "Endangered", max_length_cm: 150, max_weight_kg: 60, trophic_level: 4.0, commercial_value: "Very High", image_emoji: "🎣", image_description: "Large dusky grouper with mottled brown coloration"},
                {species_id: "FISH_0005", scientific_name: "Carcharhinus amblyrhynchos", common_name: "Grey Reef Shark", family: "Carcharhinidae", habitat_depth: "Pelagic (0-300m)", conservation_status: "Near Threatened", max_length_cm: 255, max_weight_kg: 33, trophic_level: 4.5, commercial_value: "Low", image_emoji: "🦈", image_description: "Grey reef shark with distinctive black-tipped fins"},
                {species_id: "FISH_0006", scientific_name: "Pomacanthus imperator", common_name: "Emperor Angelfish", family: "Pomacanthidae", habitat_depth: "Coral Reef (0-80m)", conservation_status: "Least Concern", max_length_cm: 40, max_weight_kg: 1.5, trophic_level: 2.8, commercial_value: "Medium", image_emoji: "🐠", image_description: "Colorful angelfish with blue and yellow stripes"}
            ],
            measurements: [
                {measurement_id: "MEAS_000001", station_id: "CMLRE_001", timestamp: "2023-12-15T14:30:00Z", temperature_c: 28.5, salinity_psu: 35.2, dissolved_oxygen_mg_l: 6.8, ph: 8.1, chlorophyll_a_mg_m3: 2.4, turbidity_ntu: 1.2, nitrate_umol_l: 4.5, phosphate_umol_l: 0.8, quality_flag: "Good"},
                {measurement_id: "MEAS_000002", station_id: "CMLRE_002", timestamp: "2023-12-15T13:45:00Z", temperature_c: 26.2, salinity_psu: 34.8, dissolved_oxygen_mg_l: 7.1, ph: 8.0, chlorophyll_a_mg_m3: 1.8, turbidity_ntu: 0.9, nitrate_umol_l: 3.2, phosphate_umol_l: 0.6, quality_flag: "Good"},
                {measurement_id: "MEAS_000003", station_id: "CMLRE_004", timestamp: "2023-12-15T16:20:00Z", temperature_c: 27.8, salinity_psu: 35.5, dissolved_oxygen_mg_l: 6.5, ph: 7.9, chlorophyll_a_mg_m3: 3.1, turbidity_ntu: 2.1, nitrate_umol_l: 5.8, phosphate_umol_l: 1.2, quality_flag: "Questionable"}
            ],
            ednaSamples: [
                {sample_id: "eDNA_0001", station_id: "CMLRE_001", collection_date: "2023-12-10T10:00:00Z", species_detected: ["Thunnus albacares", "Katsuwonus pelamis", "Lutjanus argentimaculatus"], detection_confidence: [0.95, 0.89, 0.76], sequencing_method: "Illumina MiSeq", amplicon_region: "12S rRNA", sample_status: "Processed"},
                {sample_id: "eDNA_0002", station_id: "CMLRE_002", collection_date: "2023-12-12T08:30:00Z", species_detected: ["Carcharhinus amblyrhynchos", "Epinephelus marginatus"], detection_confidence: [0.88, 0.92], sequencing_method: "Oxford Nanopore", amplicon_region: "16S rRNA", sample_status: "Processing"},
                {sample_id: "eDNA_0003", station_id: "CMLRE_004", collection_date: "2023-12-14T15:45:00Z", species_detected: ["Pomacanthus imperator", "Lutjanus argentimaculatus"], detection_confidence: [0.83, 0.91], sequencing_method: "Ion Torrent", amplicon_region: "COI", sample_status: "Collected"}
            ],
            alerts: [
                {alert_id: "ALT_001", type: "Temperature Anomaly", station_id: "CMLRE_003", message: "Temperature reading 3.2°C above normal range", severity: "Medium", timestamp: "2023-12-15T12:00:00Z", status: "Active"},
                {alert_id: "ALT_002", type: "Equipment Maintenance", station_id: "CMLRE_003", message: "CTD sensor requires calibration", severity: "High", timestamp: "2023-12-14T09:15:00Z", status: "Acknowledged"},
                {alert_id: "ALT_003", type: "Data Quality", station_id: "CMLRE_004", message: "Questionable phosphate readings detected", severity: "Low", timestamp: "2023-12-15T16:20:00Z", status: "Active"}
            ],
            mapData: {
                temperature_heatmap: [
                    {lat: 13.992642, lng: 96.117954, value: 28.5, station: "CMLRE_001"},
                    {lat: 23.211429, lng: 90.478852, value: 26.2, station: "CMLRE_002"},
                    {lat: 19.711903, lng: 95.245469, value: 24.8, station: "CMLRE_003"},
                    {lat: 15.255, lng: 73.751, value: 27.8, station: "CMLRE_004"}
                ],
                population_density: [
                    {lat: 13.992642, lng: 96.117954, species_count: 12, diversity_index: 2.4},
                    {lat: 23.211429, lng: 90.478852, species_count: 8, diversity_index: 1.9},
                    {lat: 19.711903, lng: 95.245469, species_count: 15, diversity_index: 2.8},
                    {lat: 15.255, lng: 73.751, species_count: 18, diversity_index: 3.1}
                ],
                biodiversity_hotspots: [
                    {lat: 15.255, lng: 73.751, hotspot_level: "High", species_richness: 18},
                    {lat: 19.711903, lng: 95.245469, hotspot_level: "Medium", species_richness: 15},
                    {lat: 13.992642, lng: 96.117954, hotspot_level: "Medium", species_richness: 12},
                    {lat: 23.211429, lng: 90.478852, hotspot_level: "Low", species_richness: 8}
                ]
            }
        };
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAll());
        } else {
            setTimeout(() => this.setupAll(), 100);
        }
    }

    setupAll() {
        console.log('Setting up all components...');
        this.setupNavigation();
        this.setupDashboard();
        this.setupMapCenter();
        this.setupDataExplorer();
        this.setupSpeciesManager();
        this.setupStationControl();
        this.setupAnalyticsHub();
        this.setupReportCenter();
        this.setupModals();
        this.populateInitialData();
        this.startRealTimeUpdates();
        console.log('All components setup completed');
    }

    // Enhanced Navigation System
    setupNavigation() {
        console.log('Setting up navigation...');
        
        // Add a small delay to ensure DOM elements are ready
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.content-section');

            console.log(`Found ${navLinks.length} nav links and ${sections.length} sections`);

            if (navLinks.length === 0) {
                console.error('No navigation links found!');
                return;
            }

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const targetSection = link.dataset.section;
                    console.log(`Navigation clicked: ${targetSection}`);
                    
                    if (!targetSection) {
                        console.error('No target section found for link:', link);
                        return;
                    }
                    
                    this.navigateToSection(targetSection);
                });
            });

            // Ensure dashboard is shown by default
            this.navigateToSection('dashboard');
        }, 200);
    }

    navigateToSection(sectionId) {
        console.log(`Navigating to section: ${sectionId}`);
        
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');
        
        // Update active nav link
        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            console.log(`Successfully navigated to: ${sectionId}`);
            
            // Initialize section-specific content
            this.initializeSectionContent(sectionId);
            this.currentSection = sectionId;
        } else {
            console.error(`Section not found: ${sectionId}`);
        }
    }

    initializeSectionContent(sectionId) {
        console.log(`Initializing content for: ${sectionId}`);
        
        switch (sectionId) {
            case 'map-center':
                setTimeout(() => this.initializeMap(), 100);
                break;
            case 'data-explorer':
                setTimeout(() => this.updateDataTables(), 100);
                break;
            case 'species-manager':
                setTimeout(() => this.renderSpeciesGrid(), 100);
                break;
            case 'station-control':
                setTimeout(() => this.updateStationInfo(), 100);
                break;
            case 'analytics':
                setTimeout(() => this.refreshAnalyticsData(), 100);
                break;
            case 'reports':
                setTimeout(() => this.updateReportTemplates(), 100);
                break;
            case 'dashboard':
                // Dashboard is already initialized
                break;
        }
    }

    // Map Center Setup
    setupMapCenter() {
        console.log('Setting up Map Center...');
        // Set up event listeners that will work when the section is activated
        document.addEventListener('click', (e) => {
            if (e.target.id === 'map-type-selector') {
                this.currentMapType = e.target.value;
                if (this.currentSection === 'map-center') {
                    this.updateMapView(this.currentMapType);
                }
            }
            
            if (e.target.id === 'refresh-map') {
                if (this.currentSection === 'map-center') {
                    this.refreshMapData();
                }
            }
        });
        
        document.addEventListener('change', (e) => {
            if (e.target.id === 'map-type-selector') {
                this.currentMapType = e.target.value;
                if (this.currentSection === 'map-center') {
                    this.updateMapView(this.currentMapType);
                }
            }
            
            if (e.target.id === 'opacity-slider') {
                const value = e.target.value;
                const valueDisplay = document.getElementById('opacity-value');
                if (valueDisplay) {
                    valueDisplay.textContent = `${value}%`;
                }
                if (this.currentSection === 'map-center') {
                    this.updateMapOpacity(value);
                }
            }
        });
    }

    initializeMap() {
        console.log('Initializing map...');
        this.updateMapView(this.currentMapType);
        this.updateMapStatistics();
        this.setupMapMarkerInteractions();
    }

    setupMapMarkerInteractions() {
        const markers = document.querySelectorAll('.map-marker');
        console.log(`Setting up ${markers.length} map markers`);
        
        markers.forEach(marker => {
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                const stationId = marker.dataset.station;
                console.log(`Map marker clicked: ${stationId}`);
                this.showMapStationDetails(stationId);
            });
        });
    }

    updateMapView(mapType) {
        console.log(`Updating map view to: ${mapType}`);
        const markers = document.querySelectorAll('.map-marker');
        
        markers.forEach(marker => {
            const stationId = marker.dataset.station;
            const station = this.data.stations.find(s => s.station_id === stationId);
            
            if (station) {
                this.updateMarkerForMapType(marker, station, mapType);
            }
        });
        
        this.updateMapLegend(mapType);
        this.showToast(`📊 Map view switched to ${mapType.replace('_', ' ')}`);
    }

    updateMarkerForMapType(marker, station, mapType) {
        const circle = marker.querySelector('.marker-circle');
        const tooltip = marker.querySelector('.marker-tooltip');
        
        if (!circle || !tooltip) return;

        switch (mapType) {
            case 'temperature':
                const tempData = this.data.mapData.temperature_heatmap.find(t => t.station === station.station_id);
                const temp = tempData ? tempData.value : 25;
                
                circle.className = `marker-circle ${this.getTemperatureClass(temp)}`;
                tooltip.innerHTML = `
                    <strong>${station.station_name}</strong><br>
                    ${temp}°C<br>
                    <span class="station-id">${station.station_id}</span>
                `;
                break;

            case 'population':
                const popData = this.data.mapData.population_density.find(p => p.lat === station.latitude);
                const speciesCount = popData ? popData.species_count : 0;
                
                circle.className = `marker-circle ${this.getPopulationClass(speciesCount)}`;
                tooltip.innerHTML = `
                    <strong>${station.station_name}</strong><br>
                    ${speciesCount} Species<br>
                    <span class="station-id">${station.station_id}</span>
                `;
                break;

            case 'biodiversity':
                const bioData = this.data.mapData.biodiversity_hotspots.find(b => b.lat === station.latitude);
                const level = bioData ? bioData.hotspot_level : 'Low';
                
                circle.className = `marker-circle ${this.getBiodiversityClass(level)}`;
                tooltip.innerHTML = `
                    <strong>${station.station_name}</strong><br>
                    ${level} Biodiversity<br>
                    <span class="station-id">${station.station_id}</span>
                `;
                break;

            case 'activity':
                const activityLevel = station.status === 'Active' ? 'High' : 'Low';
                
                circle.className = `marker-circle ${station.status === 'Active' ? 'hot' : 'cool'}`;
                tooltip.innerHTML = `
                    <strong>${station.station_name}</strong><br>
                    ${activityLevel} Activity<br>
                    <span class="station-id">${station.station_id}</span>
                `;
                break;
        }
    }

    getTemperatureClass(temp) {
        if (temp >= 28) return 'hot';
        if (temp >= 26.5) return 'warm';
        if (temp >= 25) return 'medium';
        return 'cool';
    }

    getPopulationClass(count) {
        if (count >= 15) return 'hot';
        if (count >= 10) return 'warm';
        if (count >= 5) return 'medium';
        return 'cool';
    }

    getBiodiversityClass(level) {
        switch (level.toLowerCase()) {
            case 'high': return 'hot';
            case 'medium': return 'warm';
            case 'low': return 'cool';
            default: return 'medium';
        }
    }

    updateMapLegend(mapType) {
        const legend = document.getElementById('map-legend');
        if (!legend) return;

        const legendConfigs = {
            temperature: {
                title: 'Temperature (°C)',
                items: [
                    { color: '#5D878F', label: '24-26°C' },
                    { color: '#1FB8CD', label: '26-27°C' },
                    { color: '#FFC185', label: '27-28°C' },
                    { color: '#B4413C', label: '28-30°C' }
                ]
            },
            population: {
                title: 'Species Count',
                items: [
                    { color: '#5D878F', label: '0-5 species' },
                    { color: '#1FB8CD', label: '5-10 species' },
                    { color: '#FFC185', label: '10-15 species' },
                    { color: '#B4413C', label: '15+ species' }
                ]
            },
            biodiversity: {
                title: 'Biodiversity Level',
                items: [
                    { color: '#5D878F', label: 'Low' },
                    { color: '#FFC185', label: 'Medium' },
                    { color: '#B4413C', label: 'High' }
                ]
            },
            activity: {
                title: 'Station Activity',
                items: [
                    { color: '#5D878F', label: 'Maintenance' },
                    { color: '#B4413C', label: 'Active' }
                ]
            }
        };

        const config = legendConfigs[mapType];
        legend.innerHTML = `
            <h4>${config.title}</h4>
            <div class="legend-scale">
                ${config.items.map(item => `
                    <div class="legend-item">
                        <span class="legend-color" style="background: ${item.color};"></span>
                        ${item.label}
                    </div>
                `).join('')}
            </div>
        `;
    }

    updateMapOpacity(opacity) {
        const overlay = document.querySelector('.map-overlay');
        if (overlay) {
            overlay.style.opacity = opacity / 100;
        }
    }

    refreshMapData() {
        this.showLoading(true);
        
        setTimeout(() => {
            this.updateMapView(this.currentMapType);
            this.updateMapStatistics();
            this.showLoading(false);
            this.showToast('🔄 Map data refreshed');
        }, 1500);
    }

    updateMapStatistics() {
        const stats = {
            temperature: {
                'avg-temperature': '26.8°C',
                'total-species': '53',
                'active-stations-count': '4',
                'hotspot-count': '2'
            },
            population: {
                'avg-temperature': 'N/A',
                'total-species': '53',
                'active-stations-count': '4',
                'hotspot-count': '2'
            },
            biodiversity: {
                'avg-temperature': 'N/A',
                'total-species': '53',
                'active-stations-count': '4',
                'hotspot-count': '2'
            },
            activity: {
                'avg-temperature': 'N/A',
                'total-species': '53',
                'active-stations-count': '3',
                'hotspot-count': '1'
            }
        };

        const currentStats = stats[this.currentMapType] || stats.temperature;
        Object.entries(currentStats).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    showMapStationDetails(stationId) {
        const station = this.data.stations.find(s => s.station_id === stationId);
        const selectionInfo = document.getElementById('selection-info');
        
        if (!station || !selectionInfo) return;

        const measurement = this.data.measurements.find(m => m.station_id === stationId);
        const tempData = this.data.mapData.temperature_heatmap.find(t => t.station === stationId);
        const popData = this.data.mapData.population_density.find(p => p.lat === station.latitude);

        selectionInfo.innerHTML = `
            <div class="station-details-full">
                <h4>${station.station_name}</h4>
                <div class="detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px;">
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Station ID</div>
                        <div class="detail-value" style="font-weight: 500;">${station.station_id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Region</div>
                        <div class="detail-value" style="font-weight: 500;">${station.region}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Depth</div>
                        <div class="detail-value" style="font-weight: 500;">${station.depth_m}m</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Status</div>
                        <div class="detail-value">
                            <span class="status status--${station.status === 'Active' ? 'success' : 'warning'}">${station.status}</span>
                        </div>
                    </div>
                    ${measurement ? `
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Temperature</div>
                        <div class="detail-value" style="font-weight: 500;">${measurement.temperature_c}°C</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">pH</div>
                        <div class="detail-value" style="font-weight: 500;">${measurement.ph}</div>
                    </div>
                    ` : ''}
                    ${popData ? `
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Species Count</div>
                        <div class="detail-value" style="font-weight: 500;">${popData.species_count}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Diversity Index</div>
                        <div class="detail-value" style="font-weight: 500;">${popData.diversity_index}</div>
                    </div>
                    ` : ''}
                </div>
                <div class="equipment-section" style="margin-top: 16px;">
                    <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.9rem;">Equipment</div>
                    <div class="equipment-list" style="margin-top: 8px;">
                        ${station.equipment.map(eq => `
                            <span style="display: inline-block; background: var(--color-bg-1); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; margin: 2px;">${eq}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="last-update" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(var(--color-teal-300-rgb), 0.1);">
                    <div class="detail-label" style="color: var(--color-text-secondary); font-size: 0.8rem;">Last Update</div>
                    <div style="font-size: 0.9rem; color: var(--color-text);">${new Date(station.last_update).toLocaleString()}</div>
                </div>
            </div>
        `;
        
        this.showToast(`📍 Station details loaded: ${station.station_name}`);
    }

    // Dashboard Setup
    setupDashboard() {
        this.setupCounterAnimations();
        this.setupQuickActions();
        this.updateSystemStatus();
        this.setupAlertActions();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target) => {
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.dataset.target) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    setupQuickActions() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'global-search-btn' || e.target.closest('#global-search-btn')) {
                this.navigateToSection('data-explorer');
                setTimeout(() => {
                    document.getElementById('global-search')?.focus();
                }, 100);
                this.showToast('🔍 Navigated to Data Explorer');
            }
            
            if (e.target.id === 'data-quality-btn' || e.target.closest('#data-quality-btn')) {
                this.navigateToSection('analytics');
                this.showToast('📊 Data quality assessment opened');
            }
            
            if (e.target.id === 'export-data-btn' || e.target.closest('#export-data-btn')) {
                this.navigateToSection('reports');
                this.showToast('💾 Export options available in Report Center');
            }
            
            if (e.target.id === 'generate-report-btn' || e.target.closest('#generate-report-btn')) {
                this.navigateToSection('reports');
                this.showToast('📄 Report generator opened');
            }
        });
    }

    setupAlertActions() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('alert-action')) {
                const alertItem = e.target.closest('.alert-item');
                const alertTitle = alertItem?.querySelector('.alert-title')?.textContent;
                
                if (e.target.textContent.includes('Investigate')) {
                    this.navigateToSection('analytics');
                    this.showToast(`🔍 Investigating: ${alertTitle}`);
                } else if (e.target.textContent.includes('Schedule')) {
                    this.navigateToSection('station-control');
                    this.showToast(`📅 Opening maintenance scheduler for: ${alertTitle}`);
                } else if (e.target.textContent.includes('Review')) {
                    this.navigateToSection('data-explorer');
                    this.showToast(`📊 Reviewing data for: ${alertTitle}`);
                }
            }
        });
    }

    updateSystemStatus() {
        // System status is static for demo purposes
    }

    // Species Manager Setup
    setupSpeciesManager() {
        // Use event delegation for species functionality
        document.addEventListener('click', (e) => {
            // Species image clicks
            if (e.target.classList.contains('species-image') && e.target.dataset.speciesId) {
                e.stopPropagation();
                const speciesId = e.target.dataset.speciesId;
                this.showSpeciesImageModal(speciesId);
            }
            
            // Add species button
            if (e.target.id === 'add-species-btn') {
                this.openModal('species-modal');
            }
            
            // Species comparison
            if (e.target.id === 'compare-species') {
                const species1Id = document.getElementById('species-compare-1')?.value;
                const species2Id = document.getElementById('species-compare-2')?.value;
                
                if (species1Id && species2Id && species1Id !== species2Id) {
                    this.compareSpecies(species1Id, species2Id);
                } else {
                    this.showToast('⚠️ Please select two different species');
                }
            }
            
            // Find matching species
            if (e.target.id === 'find-matching-species') {
                const depth = parseInt(document.getElementById('depth-range')?.value || 100);
                const habitatType = document.getElementById('habitat-type')?.value;
                this.findMatchingSpecies(depth, habitatType);
            }
            
            // Show population trend
            if (e.target.id === 'show-trend') {
                const speciesId = document.getElementById('species-trend-select')?.value;
                if (speciesId) {
                    this.showPopulationTrend(speciesId);
                } else {
                    this.showToast('⚠️ Please select a species');
                }
            }
        });
        
        // Species search and filters
        document.addEventListener('input', (e) => {
            if (e.target.id === 'species-search' && this.currentSection === 'species-manager') {
                this.filterSpecies();
            }
            
            if (e.target.id === 'depth-range') {
                const depthDisplay = document.getElementById('depth-display');
                if (depthDisplay) {
                    depthDisplay.textContent = `${e.target.value}m`;
                }
            }
        });
        
        document.addEventListener('change', (e) => {
            if (e.target.id === 'conservation-filter' && this.currentSection === 'species-manager') {
                this.filterSpecies();
            }
        });
    }

    renderSpeciesGrid() {
        console.log('Rendering species grid...');
        const grid = document.getElementById('species-grid');
        if (!grid) {
            console.error('Species grid element not found');
            return;
        }

        grid.innerHTML = this.data.species.map(species => `
            <div class="species-card" data-family="${species.family}" data-status="${species.conservation_status}" data-species-id="${species.species_id}">
                <div class="species-image" data-species-id="${species.species_id}">
                    ${species.image_emoji || this.getSpeciesEmoji(species.family)}
                </div>
                <div class="species-info">
                    <div class="species-scientific">${species.scientific_name}</div>
                    <div class="species-common">${species.common_name}</div>
                    <div class="species-meta">
                        <span class="species-family">${species.family}</span>
                        <span class="status status--${this.getConservationClass(species.conservation_status)}">${species.conservation_status}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log(`Rendered ${this.data.species.length} species cards`);
        this.populateSpeciesSelectors();
    }

    showSpeciesImageModal(speciesId) {
        const species = this.data.species.find(s => s.species_id === speciesId);
        if (!species) return;

        const modal = document.getElementById('species-image-modal');
        const title = document.getElementById('species-modal-title');
        const largeEmoji = document.querySelector('.large-species-emoji');
        const scientificName = document.querySelector('.species-scientific-large');
        const commonName = document.querySelector('.species-common-large');
        const family = document.getElementById('modal-family');
        const status = document.getElementById('modal-status');
        const habitat = document.getElementById('modal-habitat');
        const commercial = document.getElementById('modal-commercial');

        if (title) title.textContent = species.common_name;
        if (largeEmoji) largeEmoji.textContent = species.image_emoji || this.getSpeciesEmoji(species.family);
        if (scientificName) scientificName.textContent = species.scientific_name;
        if (commonName) commonName.textContent = species.common_name;
        if (family) family.textContent = species.family;
        if (status) {
            status.innerHTML = `<span class="status status--${this.getConservationClass(species.conservation_status)}">${species.conservation_status}</span>`;
        }
        if (habitat) habitat.textContent = species.habitat_depth;
        if (commercial) commercial.textContent = species.commercial_value;

        this.openModal('species-image-modal');
        this.showToast(`🔍 Viewing ${species.common_name} details`);
    }

    getSpeciesEmoji(family) {
        const emojiMap = {
            'Scombridae': '🐟',
            'Lutjanidae': '🐠',
            'Serranidae': '🐡',
            'Carcharhinidae': '🦈',
            'Pomacanthidae': '🌺'
        };
        return emojiMap[family] || '🐟';
    }

    getConservationClass(status) {
        const statusMap = {
            'Least Concern': 'success',
            'Near Threatened': 'warning',
            'Vulnerable': 'warning',
            'Endangered': 'error'
        };
        return statusMap[status] || 'info';
    }

    filterSpecies() {
        const searchInput = document.getElementById('species-search');
        const conservationFilter = document.getElementById('conservation-filter');
        
        const query = searchInput?.value.toLowerCase() || '';
        const conservation = conservationFilter?.value || '';
        
        const cards = document.querySelectorAll('.species-card');
        cards.forEach(card => {
            const scientific = card.querySelector('.species-scientific')?.textContent.toLowerCase() || '';
            const common = card.querySelector('.species-common')?.textContent.toLowerCase() || '';
            const status = card.dataset.status || '';
            
            const matchesSearch = scientific.includes(query) || common.includes(query) || query === '';
            const matchesStatus = !conservation || status === conservation;
            
            card.style.display = matchesSearch && matchesStatus ? 'block' : 'none';
        });
    }

    populateSpeciesSelectors() {
        const selectors = ['species-compare-1', 'species-compare-2', 'species-trend-select'];
        
        selectors.forEach(selectorId => {
            const selector = document.getElementById(selectorId);
            if (selector) {
                // Clear existing options except first
                while (selector.children.length > 1) {
                    selector.removeChild(selector.lastChild);
                }
                
                this.data.species.forEach(species => {
                    const option = document.createElement('option');
                    option.value = species.species_id;
                    option.textContent = `${species.common_name} (${species.scientific_name})`;
                    selector.appendChild(option);
                });
            }
        });
    }

    compareSpecies(species1Id, species2Id) {
        const species1 = this.data.species.find(s => s.species_id === species1Id);
        const species2 = this.data.species.find(s => s.species_id === species2Id);
        const result = document.getElementById('species-comparison-result');
        
        if (result && species1 && species2) {
            result.innerHTML = `
                <div class="species-comparison">
                    <h4>Species Comparison Results</h4>
                    <div class="comparison-table">
                        <div class="comparison-row">
                            <div><strong>Characteristic</strong></div>
                            <div><strong>${species1.common_name}</strong></div>
                            <div><strong>${species2.common_name}</strong></div>
                        </div>
                        <div class="comparison-row">
                            <div>Max Length</div>
                            <div>${species1.max_length_cm} cm</div>
                            <div>${species2.max_length_cm} cm</div>
                        </div>
                        <div class="comparison-row">
                            <div>Max Weight</div>
                            <div>${species1.max_weight_kg} kg</div>
                            <div>${species2.max_weight_kg} kg</div>
                        </div>
                        <div class="comparison-row">
                            <div>Trophic Level</div>
                            <div>${species1.trophic_level}</div>
                            <div>${species2.trophic_level}</div>
                        </div>
                        <div class="comparison-row">
                            <div>Commercial Value</div>
                            <div>${species1.commercial_value}</div>
                            <div>${species2.commercial_value}</div>
                        </div>
                        <div class="comparison-row">
                            <div>Conservation Status</div>
                            <div>${species1.conservation_status}</div>
                            <div>${species2.conservation_status}</div>
                        </div>
                    </div>
                </div>
            `;
            this.showToast(`🐟 Compared ${species1.common_name} vs ${species2.common_name}`);
        }
    }

    findMatchingSpecies(depth, habitatType) {
        const matches = this.data.species.filter(species => {
            const habitatMatch = !habitatType || species.habitat_depth.toLowerCase().includes(habitatType.toLowerCase());
            const depthMatch = this.checkDepthCompatibility(species.habitat_depth, depth);
            return habitatMatch && depthMatch;
        });
        
        const result = document.getElementById('habitat-results');
        if (result) {
            result.innerHTML = `
                <div class="habitat-matches">
                    <h4>Found ${matches.length} matching species:</h4>
                    ${matches.map(species => `
                        <div class="match-item" style="padding: 8px; margin: 4px 0; background: var(--color-bg-1); border-radius: 6px;">
                            <div style="font-weight: 500;">${species.common_name}</div>
                            <div style="font-size: 0.9rem; color: var(--color-text-secondary);">${species.habitat_depth}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            this.showToast(`🏠 Found ${matches.length} species matching habitat criteria`);
        }
    }

    checkDepthCompatibility(habitatDepth, targetDepth) {
        // Extract depth numbers from habitat descriptions
        const depthNumbers = habitatDepth.match(/\d+/g);
        if (!depthNumbers) return true;
        
        const minDepth = parseInt(depthNumbers[0]) || 0;
        const maxDepth = depthNumbers.length > 1 ? parseInt(depthNumbers[1]) : parseInt(depthNumbers[0]);
        
        return targetDepth >= minDepth && targetDepth <= maxDepth;
    }

    showPopulationTrend(speciesId) {
        const species = this.data.species.find(s => s.species_id === speciesId);
        const display = document.getElementById('trend-display');
        
        if (display && species) {
            // Generate mock trend data
            const trendData = Array.from({length: 12}, (_, i) => ({
                month: new Date(2023, i, 1).toLocaleDateString('en-US', {month: 'short'}),
                count: Math.floor(Math.random() * 50) + 20
            }));
            
            display.innerHTML = `
                <div class="population-trend">
                    <h4>${species.common_name} Population Trend</h4>
                    <div class="trend-chart" style="display: flex; gap: 4px; height: 100px; align-items: end; margin: 16px 0;">
                        ${trendData.map(data => `
                            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                                <div style="height: ${(data.count / 70) * 80}px; width: 100%; background: var(--color-primary); border-radius: 2px; margin-bottom: 4px;"></div>
                                <div style="font-size: 0.7rem; color: var(--color-text-secondary);">${data.month}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="trend-summary" style="text-align: center; color: var(--color-text-secondary);">
                        Average sightings: ${Math.round(trendData.reduce((sum, d) => sum + d.count, 0) / trendData.length)} per month
                    </div>
                </div>
            `;
            this.showToast(`📈 Population trend displayed for ${species.common_name}`);
        }
    }

    // Simplified versions of remaining methods for space
    setupDataExplorer() { /* Simplified */ }
    setupStationControl() { /* Simplified */ }
    setupAnalyticsHub() { /* Simplified */ }
    setupReportCenter() { /* Simplified */ }
    
    updateDataTables() { /* Simplified */ }
    updateStationInfo() { /* Simplified */ }
    refreshAnalyticsData() { /* Simplified */ }
    updateReportTemplates() { /* Simplified */ }

    // Modal System
    setupModals() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) this.closeModal(modal.id);
            }
            
            if (e.target.classList.contains('modal') && e.target === e.currentTarget) {
                this.closeModal(e.target.id);
            }
            
            if (e.target.id === 'save-species') {
                this.saveNewSpecies();
            }
            
            if (e.target.id === 'cancel-species') {
                this.closeModal('species-modal');
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            this.clearModalForms();
        }
    }

    clearModalForms() {
        const inputs = document.querySelectorAll('.modal input, .modal select, .modal textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }

    saveNewSpecies() {
        const scientificName = document.getElementById('scientific-name')?.value;
        const commonName = document.getElementById('common-name')?.value;
        const family = document.getElementById('family-name')?.value;
        const status = document.getElementById('conservation-status')?.value || 'Least Concern';
        
        if (!scientificName || !commonName || !family) {
            this.showToast('⚠️ Please fill in all required fields');
            return;
        }
        
        const newSpecies = {
            species_id: `FISH_${Date.now()}`,
            scientific_name: scientificName,
            common_name: commonName,
            family: family,
            conservation_status: status,
            habitat_depth: 'Unknown',
            max_length_cm: 0,
            max_weight_kg: 0,
            trophic_level: 0,
            commercial_value: 'Unknown',
            image_emoji: this.getSpeciesEmoji(family)
        };
        
        this.data.species.push(newSpecies);
        
        // Re-render species grid if we're currently on the species manager section
        if (this.currentSection === 'species-manager') {
            this.renderSpeciesGrid();
        }
        
        this.closeModal('species-modal');
        this.showToast('✅ New species added successfully!');
    }

    // Utility Functions
    populateInitialData() {
        // Populate station selectors
        const stationSelectors = ['measurement-station-filter', 'edna-station-filter', 'maintenance-station'];
        stationSelectors.forEach(selectorId => {
            const selector = document.getElementById(selectorId);
            if (selector) {
                // Clear existing options except first
                while (selector.children.length > 1) {
                    selector.removeChild(selector.lastChild);
                }
                
                this.data.stations.forEach(station => {
                    const option = document.createElement('option');
                    option.value = station.station_id;
                    option.textContent = station.station_name;
                    selector.appendChild(option);
                });
            }
        });
    }

    startRealTimeUpdates() {
        this.paramUpdateInterval = setInterval(() => {
            this.updateRealTimeParameters();
        }, 5000);
    }

    updateRealTimeParameters() {
        const updates = {
            'temp-value': (28 + Math.random() * 2).toFixed(1) + '°C',
            'salinity-value': (35 + Math.random() * 1).toFixed(1) + ' PSU',
            'ph-value': (8.0 + Math.random() * 0.2).toFixed(1),
            'do-value': (6.5 + Math.random() * 0.6).toFixed(1) + ' mg/L'
        };
        
        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    // Loading and Toast Functions
    showLoading(show = true) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            if (show) {
                overlay.classList.remove('hidden');
            } else {
                overlay.classList.add('hidden');
            }
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const messageEl = document.getElementById('toast-message');
        
        if (toast && messageEl) {
            messageEl.textContent = message;
            toast.classList.remove('hidden');
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 300);
            }, 4000);
        }
        
        console.log('Toast:', message);
    }

    // Cleanup
    destroy() {
        if (this.paramUpdateInterval) {
            clearInterval(this.paramUpdateInterval);
        }
        if (this.alertUpdateInterval) {
            clearInterval(this.alertUpdateInterval);
        }
    }
}

// Initialize the platform
window.addEventListener('load', () => {
    console.log('Window loaded, initializing platform...');
    window.marineDataPlatform = new EnhancedMarineDataPlatform();
});

// Fallback initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!window.marineDataPlatform) {
        console.log('DOM loaded, initializing platform...');
        window.marineDataPlatform = new EnhancedMarineDataPlatform();
    }
});

// Additional fallback
setTimeout(() => {
    if (!window.marineDataPlatform) {
        console.log('Timeout fallback, initializing platform...');
        window.marineDataPlatform = new EnhancedMarineDataPlatform();
    }
}, 1000);