import React, { useState, useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import geoData from '../data/geo/northeast-india.json';
import articlesData from '../data/articles.json';
import { getStateStoryCounts } from '../utils/computedMetrics';
import { Article, NortheastState } from '../types/article';
import { MapPin, Info, Layers, CheckCircle } from 'lucide-react';

interface NortheastMapProps {
  selectedState?: NortheastState | null;
  onSelectState?: (state: NortheastState | null) => void;
  onSelectStory?: (article: Article) => void;
}

const articles = articlesData as Article[];

export const NortheastMap: React.FC<NortheastMapProps> = ({
  selectedState = null,
  onSelectState,
  onSelectStory
}) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<Article | null>(null);

  const stateCounts = useMemo(() => getStateStoryCounts(articles), []);

  const width = 800;
  const height = 540;

  // d3-geo projection fitted to the Northeast India bounding box
  const { pathGenerator, projection } = useMemo(() => {
    // Mercator projection fitted strictly to the GeoJSON features
    const proj = geoMercator().fitExtent(
      [
        [30, 30],
        [width - 30, height - 30]
      ],
      geoData as any
    );
    const path = geoPath().projection(proj);
    return { pathGenerator: path, projection: proj };
  }, [width, height]);

  // Extract sourced location markers from articles
  const locationMarkers = useMemo(() => {
    return articles
      .filter((a) => a.location && a.location.lat && a.location.lng)
      .map((a) => {
        const coords = projection([a.location!.lng, a.location!.lat]);
        return {
          article: a,
          x: coords ? coords[0] : 0,
          y: coords ? coords[1] : 0
        };
      })
      .filter((m) => m.x > 0 && m.y > 0);
  }, [projection]);

  return (
    <div className="bg-white rounded-xl border border-sand-300 shadow-xs p-4 sm:p-6 relative">
      {/* Map Header & Citation Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-sand-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-sand-200 text-navy-900 border border-sand-300">
              <Layers className="w-3 h-3 text-forest-700" />
              NORTHEAST CARTOGRAPHIC RECORD
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-saffron-100 text-saffron-800 border border-saffron-300">
              [FLAGGED FOR MANUAL CHECK]
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-900 mt-1">
            Territorial Frontiers & Sourced Incident Geography
          </h2>
          <p className="text-xs font-mono text-sand-500 mt-0.5">
            Boundary Source: DataMeet Maps Open Data Repository · Official Survey of India Depiction
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-forest-700 inline-block" />
            <span>State Boundary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron-600 inline-block" />
            <span>Sourced Neutral Marker</span>
          </div>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-ivory-50 rounded-lg border border-sand-300 mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full select-none"
          role="img"
          aria-label="Map of Northeast India showing 8 states with official boundaries"
        >
          {/* Background Topographic Graticule */}
          <rect width={width} height={height} fill="#FDFBF7" />
          <g stroke="#EFE9DC" strokeWidth="0.75" strokeDasharray="3 3">
            {[...Array(12)].map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2={width} y2={i * 50} />
            ))}
            {[...Array(16)].map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2={height} />
            ))}
          </g>

          {/* Render State Polygons */}
          <g className="states-layer">
            {(geoData as any).features.map((feature: any, idx: number) => {
              const stateName = feature.properties.name as NortheastState;
              const isSelected = selectedState === stateName;
              const isHovered = hoveredState === stateName;
              const count = stateCounts[stateName] || 0;

              return (
                <path
                  key={`state-${idx}-${stateName}`}
                  d={pathGenerator(feature) || ''}
                  fill={
                    isSelected
                      ? '#1B365D'
                      : isHovered
                      ? '#2D5A27'
                      : '#F4F0E6'
                  }
                  stroke={isSelected ? '#FFA043' : isHovered ? '#FFA043' : '#B8B09D'}
                  strokeWidth={isSelected || isHovered ? 2 : 1}
                  className="cursor-pointer transition-colors duration-200"
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => onSelectState && onSelectState(isSelected ? null : stateName)}
                  aria-label={`${stateName}: ${count} verified stories`}
                />
              );
            })}
          </g>

          {/* State Name Labels & Dynamic Counts */}
          <g className="labels-layer pointer-events-none">
            {(geoData as any).features.map((feature: any, idx: number) => {
              const stateName = feature.properties.name as NortheastState;
              const count = stateCounts[stateName] || 0;
              const centroid = pathGenerator.centroid(feature);
              if (!centroid || isNaN(centroid[0])) return null;

              return (
                <g key={`lbl-${idx}`} transform={`translate(${centroid[0]}, ${centroid[1]})`}>
                  <text
                    textAnchor="middle"
                    y="-4"
                    fill={selectedState === stateName ? '#FDFBF7' : '#0C2340'}
                    fontSize="11"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="700"
                    className="drop-shadow-xs"
                  >
                    {stateName}
                  </text>
                  <text
                    textAnchor="middle"
                    y="10"
                    fill={selectedState === stateName ? '#FFA043' : '#C85A00'}
                    fontSize="9.5"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                  >
                    {count} {count === 1 ? 'Story' : 'Stories'}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Sourced Neutral Location Markers */}
          <g className="markers-layer">
            {locationMarkers.map(({ article, x, y }) => {
              const isHovered = hoveredMarker?.id === article.id;
              return (
                <g
                  key={`marker-${article.id}`}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMarker(article)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  onClick={() => onSelectStory && onSelectStory(article)}
                >
                  <circle
                    r={isHovered ? 7 : 4.5}
                    fill="#E06D14"
                    stroke="#FDFBF7"
                    strokeWidth={1.5}
                    className="transition-all duration-150"
                  />
                  {isHovered && (
                    <circle
                      r="12"
                      fill="none"
                      stroke="#E06D14"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hovered Marker Tooltip */}
        {hoveredMarker && (
          <div className="absolute top-4 left-4 max-w-xs bg-navy-950/90 text-ivory-100 p-3 rounded-md shadow-xl border border-saffron-500 backdrop-blur-xs pointer-events-none z-20">
            <span className="text-[10px] font-mono text-saffron-400 uppercase tracking-wider block">
              Sourced Location Point
            </span>
            <p className="text-xs font-serif font-bold mt-1 text-white leading-tight">
              {hoveredMarker.headline}
            </p>
            <p className="text-[11px] font-mono text-sand-300 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-saffron-400" />
              {hoveredMarker.location?.name} ({hoveredMarker.states.join(', ')})
            </p>
            <p className="text-[10px] text-sand-400 font-mono mt-1">
              Source: {hoveredMarker.sourceName} · Click to review
            </p>
          </div>
        )}
      </div>

      {/* Sourced Location Citation Note */}
      <div className="mt-3 flex items-start gap-2 bg-ivory-200 p-3 rounded-lg border border-sand-300 text-xs text-navy-900">
        <Info className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-sans leading-relaxed">
            <strong>Official Cartographic Basis:</strong> The administrative borders of all eight states (Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura) are rendered strictly according to the Survey of India depiction via open geospatial repositories. Point coordinates represent neutral, factual locations cited in verified press reports.
          </p>
          <p className="text-[11px] font-mono text-sand-500 mt-1">
            Dataset flagged for manual editorial review at <code className="bg-sand-100 px-1 py-0.5 rounded">/src/data/geo/northeast-india.json</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
