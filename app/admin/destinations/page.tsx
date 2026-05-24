'use client';
import CrudPage from '@/components/admin/CrudPage';

export default function DestinationsPage() {
  return (
    <CrudPage
      table="destinations"
      title="Destinations"
      description="Travel destinations shown on the website and used by the chatbot."
      searchFields={['name', 'region', 'description']}
      fields={[
        { key: 'name', label: 'Name', type: 'text', required: true, showInList: true },
        { key: 'region', label: 'Region', type: 'text', showInList: true },
        { key: 'country', label: 'Country', type: 'text', showInList: false },
        { key: 'best_season', label: 'Best season', type: 'text', showInList: true },
        { key: 'difficulty_level', label: 'Difficulty', type: 'select', options: ['Easy', 'Easy to Moderate', 'Moderate', 'Moderate to Challenging', 'Challenging'], showInList: true },
        { key: 'estimated_budget', label: 'Estimated budget', type: 'text', showInList: false },
        { key: 'highlights', label: 'Highlights', type: 'textarea', rows: 3, showInList: false },
        { key: 'description', label: 'Description', type: 'textarea', rows: 4, showInList: false },
        { key: 'safety_notes', label: 'Safety notes', type: 'textarea', rows: 3, showInList: false },
        { key: 'is_active', label: 'Active', type: 'checkbox', showInList: false },
      ]}
    />
  );
}
