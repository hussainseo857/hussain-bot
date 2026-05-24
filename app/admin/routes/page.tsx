'use client';
import CrudPage from '@/components/admin/CrudPage';

export default function RoutesPage() {
  return (
    <CrudPage
      table="trekking_routes"
      title="Trekking Routes"
      description="Trails and treks used by the chatbot for route guidance."
      searchFields={['route_name', 'destination', 'route_summary']}
      fields={[
        { key: 'route_name', label: 'Route name', type: 'text', required: true, showInList: true },
        { key: 'destination', label: 'Destination', type: 'text', showInList: true },
        { key: 'duration', label: 'Duration', type: 'text', showInList: true },
        { key: 'difficulty_level', label: 'Difficulty', type: 'select', options: ['Easy', 'Easy to Moderate', 'Moderate', 'Moderate to Challenging', 'Challenging'], showInList: true },
        { key: 'altitude', label: 'Altitude', type: 'text' },
        { key: 'best_season', label: 'Best season', type: 'text' },
        { key: 'route_summary', label: 'Route summary', type: 'textarea', rows: 4 },
        { key: 'required_gear', label: 'Required gear', type: 'textarea', rows: 4 },
        { key: 'safety_notes', label: 'Safety notes', type: 'textarea', rows: 3 },
        { key: 'is_active', label: 'Active', type: 'checkbox' },
      ]}
    />
  );
}
